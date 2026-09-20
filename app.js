/* HYDR8 application controller. No passwords or secrets are stored here. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const config = window.HYDR8_CONFIG || {};
  const configured = Boolean(config.supabaseUrl?.startsWith('https://') && !config.supabaseUrl.includes('YOUR_') && config.supabaseAnonKey && !config.supabaseAnonKey.includes('YOUR_'));
  const supa = configured && window.supabase ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey) : null;
  const SESSION_KEY = 'hydr8.local.sessions.v2';
  const PROFILE_KEY = 'hydr8.local.profile.v2';
  const SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
  const CHARACTERISTIC_UUID = '19b10001-e8f2-537e-4f6c-d104768a1214';
  let user = null, profile = {}, sessions = [], period = 'week', active = null, timer = null, chart = null, authMode = 'signin';
  let bleDevice = null, bleCharacteristic = null;

  function notice(message, type = 'info') {
    const node = $('appNotice'); if (!node) return;
    node.textContent = message;
    node.className = 'card mb-5 p-4 text-sm ' + (type === 'error' ? 'text-red-300 border-red-500/50' : type === 'ok' ? 'text-emerald-300 border-emerald-500/50' : 'text-slate-300');
    node.classList.remove('hidden');
    window.clearTimeout(node._timer); node._timer = window.setTimeout(() => node.classList.add('hidden'), 6000);
  }
  function toast(message) { const node = $('toast'); if (!node) return; node.innerHTML = '<div class="card px-4 py-3 text-sm shadow-xl" role="status">' + esc(message) + '</div>'; window.setTimeout(() => { node.innerHTML = ''; }, 3500); }
  function readLocal(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } }
  function writeLocal(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { notice('This browser blocked local storage. Your data could not be saved.', 'error'); return false; } }
  function formatDuration(seconds) { const s = Math.max(0, Number(seconds) || 0); return [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':'); }
  function scoreFor(session) {
    const intake = Number(session.fluid_intake_ml) || 0;
    const loss = session.sweat_rate_lph && session.duration_seconds ? Number(session.sweat_rate_lph) * Number(session.duration_seconds) / 3600 * 1000 : null;
    if (!intake && !loss) return null;
    const ratio = loss ? Math.min(1.2, intake / loss) : Math.min(1.2, intake / 500);
    return Math.round(Math.max(0, Math.min(100, 55 + ratio * 35 - (loss && intake < loss ? 10 : 0))));
  }
  function periodStart() { const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (period === 'week' ? 6 : period === 'month' ? 29 : 364)); return date; }
  function filteredSessions() { return sessions.filter((s) => new Date(s.started_at) >= periodStart()); }
  function setTab(tab) {
    document.querySelectorAll('.tab').forEach((node) => node.classList.toggle('active', node.id === tab));
    document.querySelectorAll('.navbtn').forEach((node) => node.setAttribute('aria-current', String(node.dataset.tab === tab)));
    if (tab === 'history') renderHistory(); if (tab === 'insights') renderInsights();
  }
  function updateAuthUi() { $('authLabel').textContent = user ? (profile.first_name || user.email) : 'Guest mode'; $('authBtn').textContent = user ? 'Profile' : 'Sign in'; $('signOut').classList.toggle('hidden', !user); $('greeting').textContent = user ? 'Welcome, ' + (profile.first_name || 'athlete') : 'Welcome to HYDR8'; }
  function fillProfile() { const map = { first_name: 'firstName', age_range: 'ageRange', sport: 'sport', units: 'units' }; Object.keys(map).forEach((key) => { if ($(map[key])) $(map[key]).value = profile[key] || ''; }); if ($('notifications')) $('notifications').checked = profile.notification_preferences?.enabled !== false; }
  function render() {
    updateAuthUi(); const list = filteredSessions(); const latest = list[0]; const score = latest?.hydration_score ?? (latest ? scoreFor(latest) : null);
    $('score').textContent = score ?? '—'; $('scoreLabel').textContent = score === null ? 'No estimate yet' : score >= 75 ? 'Good hydration estimate' : score >= 50 ? 'Moderate estimate' : 'Lower estimate';
    $('fluid').textContent = (latest?.fluid_intake_ml || 0) + ' ml'; $('sweat').textContent = latest?.sweat_rate_lph ? Number(latest.sweat_rate_lph).toFixed(2) + ' L/hr' : 'Unavailable'; $('temp').textContent = latest?.temperature == null ? 'Unavailable' : latest.temperature + '°' + (profile.units || 'F'); $('patch').textContent = bleDevice ? 'Connected' : 'Not connected';
    const today = list.filter((s) => new Date(s.started_at).toDateString() === new Date().toDateString()); $('todaySummary').textContent = today.length ? today.length + ' workout' + (today.length === 1 ? '' : 's') + ' recorded today.' : 'No workout recorded today.';
    renderHistory(); renderInsights();
  }
  function renderHistory() {
    const node = $('historyList'); if (!node) return;
    if (!sessions.length) { node.innerHTML = '<div class="card p-6 text-center"><p class="text-lg font-bold">No workouts yet</p><p class="muted text-sm mt-1">Start your first workout to begin building your hydration history.</p></div>'; return; }
    node.innerHTML = sessions.slice().sort((a,b) => new Date(b.started_at) - new Date(a.started_at)).map((s) => '<article class="card p-4"><div class="flex justify-between gap-3"><div><h3 class="font-bold">' + esc(s.sport) + ' · ' + esc(s.workout_type) + '</h3><p class="muted text-xs mt-1">' + new Date(s.started_at).toLocaleString() + ' · ' + formatDuration(s.duration_seconds) + '</p><p class="muted text-xs mt-2">' + esc(s.environment || 'Condition not recorded') + ' · ' + Number(s.fluid_intake_ml || 0) + ' ml · ' + (s.sweat_rate_lph ? Number(s.sweat_rate_lph).toFixed(2) + ' L/hr sweat estimate' : 'sweat unavailable') + '</p></div><strong class="text-blue-300">' + (s.hydration_score ?? scoreFor(s) ?? '—') + '</strong></div></article>').join('');
  }
  function renderInsights() {
    const list = filteredSessions(); const average = (key) => list.length ? list.reduce((sum, s) => sum + Number(s[key] || 0), 0) / list.length : 0;
    $('statCount').textContent = list.length; $('statScore').textContent = list.length ? Math.round(list.reduce((sum, s) => sum + Number(s.hydration_score ?? scoreFor(s) ?? 0), 0) / list.length) : '—'; $('statFluid').textContent = Math.round(average('fluid_intake_ml')) + ' ml'; $('statDuration').textContent = formatDuration(Math.round(average('duration_seconds'))); $('insightText').textContent = list.length ? `${list.length} workout${list.length === 1 ? '' : 's'} in this period. Average fluid intake was ${Math.round(average('fluid_intake_ml'))} ml.` : 'Not enough data yet. Complete more workouts to generate personalized insights.';
    if (!window.Chart || !$('historyChart')) return; chart?.destroy(); const labels = list.slice().reverse().map((s) => new Date(s.started_at).toLocaleDateString()); const data = list.slice().reverse().map((s) => s.hydration_score ?? scoreFor(s));
    chart = new Chart($('historyChart'), { type: 'line', data: { labels, datasets: [{ label: 'Estimate', data, borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,.2)', fill: true, tension: .3 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } } });
  }
  async function load() {
    if (supa) { const sessionResult = await supa.auth.getSession(); user = sessionResult.data.session?.user || null; if (user) await loadCloudData(); supa.auth.onAuthStateChange(async (_, session) => { user = session?.user || null; if (user) await loadCloudData(); else { profile = {}; sessions = []; render(); } }); }
    else { sessions = readLocal(SESSION_KEY, []); profile = readLocal(PROFILE_KEY, {}); fillProfile(); }
    render();
  }
  async function loadCloudData() { const [profileResult, sessionResult] = await Promise.all([supa.from('profiles').select('*').eq('id', user.id).maybeSingle(), supa.from('sessions').select('*').eq('user_id', user.id).order('started_at', { ascending: false })]); if (profileResult.error || sessionResult.error) notice('Some account data could not be loaded. Please refresh and try again.', 'error'); profile = profileResult.data || {}; sessions = sessionResult.data || []; fillProfile(); }
  function openAuth() { $('modal').classList.remove('hidden'); $('email').focus(); } function closeAuth() { $('modal').classList.add('hidden'); }
  async function submitAuth(event) { event.preventDefault(); if (!supa) { notice('Accounts are not configured yet. Add Supabase URL and anon key in supabase-config.js.', 'error'); return; } $('authSubmit').disabled = true; try { const email = $('email').value.trim(), password = $('password').value; const result = authMode === 'signin' ? await supa.auth.signInWithPassword({ email, password }) : await supa.auth.signUp({ email, password, options: { data: { first_name: $('authName').value.trim() } } }); if (result.error) throw result.error; if (!result.data.session) notice('Check your email to confirm your account.', 'ok'); else toast('Signed in successfully.'); closeAuth(); } catch { notice('We could not sign you in. Check your email and password.', 'error'); } finally { $('authSubmit').disabled = false; } }
  async function saveProfile(event) { event.preventDefault(); const data = { first_name: $('firstName').value.trim(), age_range: $('ageRange').value, sport: $('sport').value.trim(), units: $('units').value, notification_preferences: { enabled: $('notifications').checked } }; if (supa && user) { const result = await supa.from('profiles').upsert({ id: user.id, ...data, updated_at: new Date().toISOString() }); if (result.error) return notice('Settings could not be saved. Please try again.', 'error'); } profile = data; if (!supa) writeLocal(PROFILE_KEY, profile); render(); toast('Settings saved.'); }
  function openWorkout() { if (!user && supa) return openAuth(); $('workoutModal').classList.remove('hidden'); $('wSport').focus(); }
  function startWorkout(event) { event.preventDefault(); active = { started: new Date(), sport: $('wSport').value.trim(), workout_type: $('wType').value, environment: $('wEnvironment').value, temperature: $('wTemp').value ? Number($('wTemp').value) : null, fluid: 0, sweat: null, sensor_data: {} }; $('workoutModal').classList.add('hidden'); setTab('workout'); const started = Date.now(); timer = window.setInterval(() => { $('timer').textContent = formatDuration((Date.now() - started) / 1000); }, 1000); toast('Workout started.'); }
  function addFluid() { if (!active) return; const amount = Number(window.prompt('How much fluid did you drink (ml)?')); if (!Number.isFinite(amount) || amount <= 0) return notice('Enter a positive amount in millilitres.', 'error'); active.fluid += amount; $('liveFluid').textContent = active.fluid + ' ml'; toast('Fluid intake recorded.'); }
  async function endWorkout() { if (!active) return; window.clearInterval(timer); const ended = new Date(); const record = { user_id: user?.id, started_at: active.started.toISOString(), ended_at: ended.toISOString(), sport: active.sport, workout_type: active.workout_type, environment: active.environment, temperature: active.temperature, duration_seconds: Math.round((ended - active.started) / 1000), fluid_intake_ml: active.fluid, sweat_rate_lph: active.sweat, hydration_score: null, sensor_data: active.sensor_data, warnings: [] }; record.hydration_score = scoreFor(record); try { if (supa && user) { const result = await supa.from('sessions').insert(record); if (result.error) throw result.error; await loadCloudData(); } else { delete record.user_id; sessions.push(record); writeLocal(SESSION_KEY, sessions); } active = null; render(); setTab('history'); toast('Workout saved.'); } catch { notice('Your workout could not be saved. Please try again.', 'error'); } }
  async function signOut() { if (supa) await supa.auth.signOut(); else { user = null; sessions = readLocal(SESSION_KEY, []); } render(); toast('Signed out.'); }
  function setBleStatus(state, message) { const node = $('bleStatus'); if (!node) return; const dot = state === 'connected' ? 'ok' : state === 'connecting' ? 'warn' : ''; node.innerHTML = `<i class="dot ${dot}"></i>${message}`; }
  async function connectPatch() { if (!navigator.bluetooth) return notice('Bluetooth is unavailable here. Use HTTPS in Chrome or Edge on a supported device.', 'error'); setBleStatus('connecting', 'CONNECTING'); try { bleDevice = await navigator.bluetooth.requestDevice({ filters: [{ name: 'HYDR8_Patch' }, { namePrefix: 'HYDR8' }], optionalServices: [SERVICE_UUID] }); bleDevice.addEventListener('gattserverdisconnected', disconnectPatch); const server = await bleDevice.gatt.connect(); const service = await server.getPrimaryService(SERVICE_UUID); bleCharacteristic = await service.getCharacteristic(CHARACTERISTIC_UUID); await bleCharacteristic.startNotifications(); bleCharacteristic.addEventListener('characteristicvaluechanged', handlePatchData); setBleStatus('connected', 'CONNECTED · waiting for patch data'); render(); toast('Patch connected.'); } catch (error) { bleDevice = null; bleCharacteristic = null; setBleStatus('disconnected', 'NOT CONNECTED'); notice(error?.name === 'NotFoundError' ? 'Patch selection cancelled.' : 'Unable to connect to HYDR8 Patch. Make sure it is powered on and nearby.', 'error'); } }
  function disconnectPatch() { bleDevice = null; bleCharacteristic = null; setBleStatus('disconnected', 'NOT CONNECTED'); render(); toast('Patch disconnected.'); }
  function handlePatchData(event) { const raw = new TextDecoder().decode(event.target.value).trim(); let parsed; try { parsed = JSON.parse(raw); } catch { const parts = raw.split(','); parsed = { temperature: Number(parts[0]), sweat_raw: Number(parts[1]) }; } const temperature = Number(parsed.temperature ?? parsed.temp); const rawSweat = Number(parsed.sweat_raw ?? parsed.sweatRaw); if (!Number.isFinite(temperature) || !Number.isFinite(rawSweat)) return; const sweat = (rawSweat / 1023) * 2; if (active) { active.sweat = sweat; active.sensor_data = { source: 'ble', temperature, sweat_raw: rawSweat }; } if ($('liveSweat')) $('liveSweat').textContent = sweat.toFixed(2) + ' L/hr'; if ($('temp')) $('temp').textContent = temperature + '°' + (profile.units || 'F'); }
  $('authBtn').onclick = () => user ? setTab('settings') : openAuth(); $('scoreHelp').onclick = () => notice('This estimate uses recorded fluid intake, workout duration, and sweat-rate data when available. Temperature and patch readings add context. It is informational, not medically validated, and should not guide medical decisions.'); $('startBtn').onclick = openWorkout; $('endBtn').onclick = endWorkout; $('addFluid').onclick = addFluid; $('bleBtn').onclick = connectPatch; $('signOut').onclick = signOut; $('profileForm').onsubmit = saveProfile; $('workoutForm').onsubmit = startWorkout; $('authForm').onsubmit = submitAuth; $('modalClose').onclick = closeAuth;
  document.querySelectorAll('.navbtn').forEach((button) => button.onclick = () => setTab(button.dataset.tab)); document.querySelectorAll('.period').forEach((button) => button.onclick = () => { period = button.dataset.period; document.querySelectorAll('.period').forEach((b) => b.classList.toggle('bg-blue-600', b === button)); renderInsights(); });
  $('authToggle').onclick = () => { authMode = authMode === 'signin' ? 'signup' : 'signin'; $('modalTitle').textContent = authMode === 'signin' ? 'Sign in' : 'Create account'; $('authSubmit').textContent = authMode === 'signin' ? 'Sign in' : 'Create account'; $('nameWrap').classList.toggle('hidden', authMode === 'signin'); };
  $('resetBtn').onclick = async () => { if (!supa) return notice('Configure Supabase before requesting a password reset.', 'error'); const email = $('email').value.trim(); if (!email) return notice('Enter your email first.', 'error'); const result = await supa.auth.resetPasswordForEmail(email, { redirectTo: location.href }); notice(result.error ? 'Password reset could not be requested.' : 'Password reset email requested.', result.error ? 'error' : 'ok'); };
  $('clearBtn').onclick = () => { if (supa && user) return notice('Cloud history is managed by your account and cannot be cleared from this device.', 'info'); if (window.confirm('Delete all locally saved HYDR8 workout history? This cannot be undone.')) { sessions = []; writeLocal(SESSION_KEY, sessions); render(); toast('Local history cleared.'); } };
  $('workoutModal').addEventListener('click', (event) => { if (event.target === $('workoutModal')) $('workoutModal').classList.add('hidden'); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeAuth(); $('workoutModal').classList.add('hidden'); } });
  load();
})();
