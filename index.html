<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HYDR8 - Smart Hydration & Thermal Patch</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        darkBg: '#0A0D14',
                        cardBg: '#131A26',
                        cardBorder: '#1E293B',
                        accentBlue: '#2563EB',
                        accentGreen: '#10B981',
                        accentYellow: '#F59E0B',
                        accentRed: '#EF4444',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0A0D14;
            color: #E2E8F0;
            overflow-x: hidden;
        }

        /* Custom Scrollbars */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0A0D14;
        }
        ::-webkit-scrollbar-thumb {
            background: #1E293B;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #334155;
        }

        /* Arc Gauge Styling */
        .gauge-circle {
            transition: stroke-dashoffset 0.8s ease-in-out;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }

        /* Pulsing LED for Patch */
        .patch-led {
            animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        /* Phone Frame Styling */
        .phone-frame {
            border: 12px solid #1E293B;
            border-radius: 44px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(37, 99, 235, 0.15);
        }

        /* Custom Switch */
        .toggle-checkbox:checked {
            right: 0;
            border-color: #10B981;
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #10B981;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between antialiased selection:bg-blue-600 selection:text-white">

    <!-- Top Control Bar -->
    <header class="bg-[#131A26]/90 backdrop-blur-md border-b border-[#1E293B] sticky top-0 z-50 px-4 py-3">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
                <div class="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <i data-lucide="droplet" class="w-5 h-5"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        HYDR8 <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium border border-blue-500/30">PRO</span>
                    </h1>
                    <p class="text-xs text-slate-400">Perform Better. Stay Safe. Hydrate Smarter.</p>
                </div>
            </div>

            <!-- View Switcher & Hardware Controls -->
            <div class="flex items-center space-x-4">
                <div class="flex items-center bg-[#0A0D14] p-1 rounded-xl border border-[#1E293B]">
                    <button id="btnMobileView" onclick="switchView('mobile')" class="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-blue-600 text-white shadow-md">
                        <i data-lucide="smartphone" class="w-4 h-4"></i>
                        <span class="hidden sm:inline">Mobile Mockup</span>
                    </button>
                    <button id="btnDesktopView" onclick="switchView('desktop')" class="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all">
                        <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                        <span class="hidden sm:inline">Desktop Dashboard</span>
                    </button>
                </div>

                <!-- NEW: Pair Bluetooth Patch Button -->
                <button id="btnPairBLE" onclick="connectBLEPatch()" class="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 border border-emerald-500">
                    <i data-lucide="bluetooth" class="w-4 h-4"></i>
                    <span id="bleStatusText">Pair Physical Patch</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Toast Notification Container -->
    <div id="toastContainer" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"></div>

    <main class="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex items-center justify-center">

        <!-- ==================== MOBILE MOCKUP CONTAINER ==================== -->
        <div id="mobileFrameView" class="w-full max-w-[410px] mx-auto transition-all duration-300">
            <div class="phone-frame bg-[#0A0D14] overflow-hidden relative flex flex-col h-[820px] shadow-2xl">
                
                <!-- Phone Top Bar Notch -->
                <div class="bg-[#0A0D14] px-6 pt-3 pb-2 flex justify-between items-center text-xs text-slate-400 select-none border-b border-slate-900">
                    <span class="font-bold text-slate-200">9:41</span>
                    <div class="w-20 h-4 bg-slate-900 rounded-full flex justify-center items-center">
                        <div class="w-3 h-3 rounded-full bg-slate-950"></div>
                    </div>
                    <div class="flex items-center space-x-1.5">
                        <i data-lucide="signal" class="w-3 h-3"></i>
                        <i id="bleIconMobile" data-lucide="bluetooth" class="w-3 h-3 text-slate-600"></i>
                        <i data-lucide="battery" class="w-4 h-4 text-emerald-400"></i>
                    </div>
                </div>

                <!-- Phone Dynamic Screen Scrollable Body -->
                <div class="flex-1 overflow-y-auto p-4 space-y-4 text-slate-200 scrollbar-none" id="mobileScreenBody">
                    
                    <!-- TAB 1: HOME SCREEN -->
                    <div id="tab-home" class="space-y-4">
                        <!-- Hero Banner / Greeting -->
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Dashboard</p>
                                <h2 class="text-xl font-bold text-white">Good morning, Alex</h2>
                            </div>
                            <button class="w-9 h-9 rounded-full bg-[#131A26] border border-[#1E293B] flex items-center justify-center text-slate-300 hover:text-white">
                                <i data-lucide="bell" class="w-4 h-4"></i>
                            </button>
                        </div>

                        <!-- Main Hydration Score Card with Arc Gauge -->
                        <div class="bg-[#131A26] p-5 rounded-2xl border border-[#1E293B] text-center relative overflow-hidden">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-xs font-semibold text-slate-400">Today's Hydration Score</span>
                                <i data-lucide="info" class="w-4 h-4 text-slate-500 cursor-pointer" title="Calculated from real-time sweat sodium, loss rate, and thermal sensor metrics."></i>
                            </div>

                            <!-- SVG Arc Gauge -->
                            <div class="relative w-48 h-36 mx-auto my-2 flex items-center justify-center">
                                <svg class="w-full h-full" viewBox="0 0 100 70">
                                    <path d="M 10 60 A 40 40 0 0 1 90 60" fill="none" stroke="#1E293B" stroke-width="8" stroke-linecap="round"/>
                                    <path id="hydrationArc" d="M 10 60 A 40 40 0 0 1 90 60" fill="none" stroke="url(#blueGreenGradient)" stroke-width="8" stroke-linecap="round" stroke-dasharray="126" stroke-dashoffset="18"/>
                                    <defs>
                                        <linearGradient id="blueGreenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stop-color="#2563EB" />
                                            <stop offset="100%" stop-color="#10B981" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="absolute top-12 left-0 right-0 flex flex-col items-center">
                                    <span id="hydrationScoreText" class="text-4xl font-extrabold text-white tracking-tight">86</span>
                                    <span id="hydrationScoreLabel" class="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                                        <i data-lucide="droplet" class="w-3 h-3 fill-emerald-400"></i> Good
                                    </span>
                                </div>
                            </div>
                            <p class="text-xs text-slate-400 px-4">You're in a good range. Keep it up and stay consistent.</p>

                            <!-- Mini Scale Bar -->
                            <div class="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-[10px] text-slate-400">
                                <span class="text-red-400">0 Critical</span>
                                <span class="text-amber-400">50 Moderate</span>
                                <span class="text-emerald-400 font-bold">86 Optimal</span>
                                <span class="text-blue-400">100 Peak</span>
                            </div>
                        </div>

                        <!-- Quick Metrics 2x2 Grid -->
                        <div class="grid grid-cols-2 gap-3">
                            <!-- Hydration Level -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center space-x-3">
                                <div class="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <i data-lucide="droplet" class="w-4 h-4"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[11px] text-slate-400 truncate">Hydration</p>
                                    <p class="text-sm font-bold text-white"><span id="valHydration">86</span>%</p>
                                    <p class="text-[10px] text-emerald-400 font-medium">Good</p>
                                </div>
                            </div>

                            <!-- Sweat Rate -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center space-x-3">
                                <div class="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                    <i data-lucide="flame" class="w-4 h-4"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[11px] text-slate-400 truncate">Sweat Rate</p>
                                    <p class="text-sm font-bold text-white"><span id="valSweatRate">0.8</span> <span class="text-[10px] text-slate-400 font-normal">L/hr</span></p>
                                    <p class="text-[10px] text-amber-400 font-medium">Moderate</p>
                                </div>
                            </div>

                            <!-- Electrolytes -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center space-x-3">
                                <div class="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                    <i data-lucide="zap" class="w-4 h-4"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[11px] text-slate-400 truncate">Electrolytes</p>
                                    <p class="text-sm font-bold text-white">Balanced</p>
                                    <p class="text-[10px] text-emerald-400 font-medium">Good</p>
                                </div>
                            </div>

                            <!-- Heat Stress -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center space-x-3">
                                <div class="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                                    <i data-lucide="thermometer" class="w-4 h-4"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[11px] text-slate-400 truncate">Heat Temp</p>
                                    <p class="text-sm font-bold text-white"><span id="valTemp">99.1</span> °F</p>
                                    <p class="text-[10px] text-emerald-400 font-medium">Safe</p>
                                </div>
                            </div>
                        </div>

                        <!-- Action Card "What to do?" -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-3">
                            <div class="flex items-center justify-between">
                                <h3 class="text-xs font-bold text-white flex items-center gap-1.5">
                                    <i data-lucide="sparkles" class="w-4 h-4 text-blue-400"></i> What to do?
                                </h3>
                                <span class="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">AI Recommendation</span>
                            </div>
                            <div class="flex items-center space-x-3 bg-[#0A0D14] p-3 rounded-lg border border-[#1E293B]">
                                <div class="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <i data-lucide="cup-soda" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold text-slate-200">Drink 16–24 oz of water with electrolytes.</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">Suggested: 16–24 oz within next 20 mins</p>
                                </div>
                            </div>
                            <button onclick="drinkWaterAction()" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2">
                                <i data-lucide="check-circle" class="w-4 h-4"></i>
                                <span>I DRANK THIS</span>
                            </button>
                        </div>

                        <!-- Hero Session Trigger CTA -->
                        <button id="mobileSessionBtn" onclick="toggleSession()" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center space-x-2">
                            <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                            <span id="mobileSessionBtnText">START SESSION</span>
                        </button>
                    </div>

                    <!-- TAB 2: LIVE SESSION SCREEN -->
                    <div id="tab-live" class="hidden space-y-4">
                        <div class="flex justify-between items-center bg-[#131A26] p-3 rounded-xl border border-[#1E293B]">
                            <div class="flex items-center space-x-2">
                                <span class="relative flex h-3 w-3">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Session</span>
                            </div>
                            <div class="font-mono text-lg font-extrabold text-white" id="sessionTimer">00:00:00</div>
                        </div>

                        <!-- Live Hydration Level Chart -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-300">Hydration Level</span>
                                <span class="text-xs font-bold text-emerald-400" id="liveHydrationVal">86% Good</span>
                            </div>
                            <div class="h-28">
                                <canvas id="chartHydrationLive"></canvas>
                            </div>
                        </div>

                        <!-- Live Sweat Rate Chart -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-300">Sweat Rate</span>
                                <span class="text-xs font-bold text-amber-400" id="liveSweatVal">0.8 L/hr</span>
                            </div>
                            <div class="h-28">
                                <canvas id="chartSweatLive"></canvas>
                            </div>
                        </div>

                        <!-- Live Core Temp Chart -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-300">Core Temp</span>
                                <span class="text-xs font-bold text-emerald-400" id="liveTempVal">99.1 °F</span>
                            </div>
                            <div class="h-28">
                                <canvas id="chartTempLive"></canvas>
                            </div>
                        </div>

                        <button onclick="toggleSession()" class="w-full py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 font-bold text-xs transition-all flex items-center justify-center space-x-2">
                            <i data-lucide="square" class="w-4 h-4 fill-red-400"></i>
                            <span>END SESSION</span>
                        </button>
                    </div>

                    <!-- TAB 3: INSIGHTS SCREEN -->
                    <div id="tab-insights" class="hidden space-y-4">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-bold text-white">Insights & Trends</h2>
                            <div class="flex bg-[#131A26] p-1 rounded-lg border border-[#1E293B] text-[10px]">
                                <button class="px-2 py-1 rounded bg-blue-600 text-white font-medium">Week</button>
                                <button class="px-2 py-1 rounded text-slate-400 hover:text-white">Month</button>
                                <button class="px-2 py-1 rounded text-slate-400 hover:text-white">Year</button>
                            </div>
                        </div>

                        <!-- Bar Chart Card -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-3">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="text-[11px] text-slate-400">Weekly Average</p>
                                    <p class="text-xl font-bold text-white">82 <span class="text-xs text-emerald-400 font-normal">Good</span></p>
                                </div>
                                <i data-lucide="trending-up" class="w-5 h-5 text-emerald-400"></i>
                            </div>
                            <div class="h-44">
                                <canvas id="chartWeeklyInsights"></canvas>
                            </div>
                        </div>

                        <!-- Top AI Insights -->
                        <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] space-y-3">
                            <h3 class="text-xs font-bold text-white uppercase tracking-wider">Top AI Insights</h3>
                            
                            <div class="space-y-2 text-xs">
                                <div class="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#0A0D14] border border-[#1E293B]">
                                    <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"></i>
                                    <p class="text-slate-300">You maintained optimal hydration <strong>5 of 7 days</strong> this week.</p>
                                </div>

                                <div class="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#0A0D14] border border-[#1E293B]">
                                    <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 shrink-0"></i>
                                    <p class="text-slate-300">Your sweat rate is <strong>24% higher</strong> on outdoor runs above 85°F.</p>
                                </div>

                                <div class="flex items-start space-x-2.5 p-2.5 rounded-lg bg-[#0A0D14] border border-[#1E293B]">
                                    <i data-lucide="plus-circle" class="w-4 h-4 text-blue-400 mt-0.5 shrink-0"></i>
                                    <p class="text-slate-300">Consider taking electrolytes <strong>15 mins prior</strong> to high-intensity training.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 4: HISTORY SCREEN -->
                    <div id="tab-history" class="hidden space-y-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-lg font-bold text-white">Activity Log</h2>
                            <span class="text-xs text-slate-400">May 18 – May 24, 2026</span>
                        </div>

                        <!-- History Log Items -->
                        <div class="space-y-2" id="historyList">
                            <!-- Entry 1 -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <i data-lucide="footprints" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-xs font-bold text-white">Outdoor Run</h4>
                                        <p class="text-[10px] text-slate-400">Sun, May 24 • 45:32</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-xs font-bold text-white">Score: 86</span>
                                    <p class="text-[10px] text-emerald-400">Good</p>
                                </div>
                            </div>

                            <!-- Entry 2 -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                        <i data-lucide="dribbble" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-xs font-bold text-white">Basketball</h4>
                                        <p class="text-[10px] text-slate-400">Sat, May 23 • 1:12:08</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-xs font-bold text-white">Score: 78</span>
                                    <p class="text-[10px] text-amber-400">Moderate</p>
                                </div>
                            </div>

                            <!-- Entry 3 -->
                            <div class="bg-[#131A26] p-3.5 rounded-xl border border-[#1E293B] flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <i data-lucide="dumbbell" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-xs font-bold text-white">Strength Training</h4>
                                        <p class="text-[10px] text-slate-400">Fri, May 22 • 1:03:15</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-xs font-bold text-white">Score: 90</span>
                                    <p class="text-[10px] text-emerald-400">Excellent</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 5: ALERTS & SETTINGS SCREEN -->
                    <div id="tab-settings" class="hidden space-y-4">
                        <h2 class="text-lg font-bold text-white">Alert Sensitivity & Settings</h2>

                        <!-- Alert Toggles List -->
                        <div class="bg-[#131A26] rounded-xl border border-[#1E293B] divide-y divide-[#1E293B]">
                            <div class="p-3.5 flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <i data-lucide="droplet" class="w-4 h-4 text-blue-400"></i>
                                    <div>
                                        <p class="text-xs font-bold text-white">Hydration Alert</p>
                                        <p class="text-[10px] text-slate-400">Triggers when fluid loss exceeds 2% mass</p>
                                    </div>
                                </div>
                                <input type="checkbox" checked class="w-4 h-4 accent-blue-600 rounded cursor-pointer">
                            </div>

                            <div class="p-3.5 flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
                                    <div>
                                        <p class="text-xs font-bold text-white">Electrolyte Alert</p>
                                        <p class="text-[10px] text-slate-400">Low sodium concentration detected</p>
                                    </div>
                                </div>
                                <input type="checkbox" checked class="w-4 h-4 accent-blue-600 rounded cursor-pointer">
                            </div>
                        </div>
                    </div>

                    <!-- TAB 6: PATCH STATUS & HARDWARE -->
                    <div id="tab-patch" class="hidden space-y-4">
                        <h2 class="text-lg font-bold text-white">HYDR8 Hardware Diagnostics</h2>

                        <!-- Interactive Patch Visualizer -->
                        <div class="bg-[#131A26] p-6 rounded-2xl border border-[#1E293B] text-center space-y-4">
                            <div class="relative w-36 h-36 mx-auto flex items-center justify-center">
                                <!-- Concentric Patch Rings -->
                                <div class="w-36 h-36 rounded-full bg-slate-200 shadow-xl flex items-center justify-center relative">
                                    <div class="w-28 h-28 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
                                        <div class="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center">
                                            <!-- Green Glowing LED Center -->
                                            <div id="patchStatusLED" class="w-3.5 h-3.5 rounded-full bg-slate-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white">Physical Proto-Patch</h3>
                                <p id="patchStatusText" class="text-xs text-slate-400">Disconnected</p>
                            </div>

                            <div class="grid grid-cols-2 gap-2 text-left pt-2 border-t border-[#1E293B]">
                                <div class="bg-[#0A0D14] p-2.5 rounded-lg border border-[#1E293B]">
                                    <span class="text-[10px] text-slate-400 block">Capillary Flow</span>
                                    <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                        <i data-lucide="waves" class="w-3.5 h-3.5"></i> Active
                                    </span>
                                </div>
                                <div class="bg-[#0A0D14] p-2.5 rounded-lg border border-[#1E293B]">
                                    <span class="text-[10px] text-slate-400 block">BLE Signal</span>
                                    <span id="bleSignalText" class="text-xs font-bold text-slate-500 flex items-center gap-1">
                                        <i data-lucide="wifi" class="w-3.5 h-3.5"></i> -- dBm
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Phone Bottom Fixed Tab Navigation Bar -->
                <nav class="bg-[#131A26] border-t border-[#1E293B] px-3 py-2 flex justify-around items-center select-none">
                    <button onclick="switchTab('home')" id="tabBtn-home" class="flex flex-col items-center space-y-1 text-blue-500">
                        <i data-lucide="home" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">Home</span>
                    </button>
                    <button onclick="switchTab('live')" id="tabBtn-live" class="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200">
                        <i data-lucide="activity" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">Live</span>
                    </button>
                    <button onclick="switchTab('insights')" id="tabBtn-insights" class="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200">
                        <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">Insights</span>
                    </button>
                    <button onclick="switchTab('history')" id="tabBtn-history" class="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200">
                        <i data-lucide="clock" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">History</span>
                    </button>
                    <button onclick="switchTab('settings')" id="tabBtn-settings" class="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200">
                        <i data-lucide="sliders" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">Settings</span>
                    </button>
                    <button onclick="switchTab('patch')" id="tabBtn-patch" class="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200">
                        <i data-lucide="cpu" class="w-5 h-5"></i>
                        <span class="text-[9px] font-medium">Patch</span>
                    </button>
                </nav>

                <!-- Phone Home Bar Indicator -->
                <div class="bg-[#131A26] pb-1.5 flex justify-center">
                    <div class="w-28 h-1 bg-slate-700 rounded-full"></div>
                </div>

            </div>
        </div>

        <!-- ==================== DESKTOP DASHBOARD CONTAINER ==================== -->
        <div id="desktopFrameView" class="hidden w-full max-w-6xl mx-auto space-y-6 transition-all duration-300">
            
            <!-- Top Summary Stats Row -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                    <div>
                        <p class="text-xs text-slate-400 font-medium">Hydration Score</p>
                        <p class="text-2xl font-bold text-white mt-1" id="deskHydrationVal">86 / 100</p>
                        <span class="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                            <i data-lucide="arrow-up-right" class="w-3 h-3"></i> Optimal Range
                        </span>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <i data-lucide="droplet" class="w-6 h-6"></i>
                    </div>
                </div>

                <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                    <div>
                        <p class="text-xs text-slate-400 font-medium">Sweat Loss Rate</p>
                        <p class="text-2xl font-bold text-white mt-1" id="deskSweatVal">0.8 L/hr</p>
                        <span class="text-xs text-amber-400 font-medium flex items-center gap-1 mt-0.5">
                            <i data-lucide="minus" class="w-3 h-3"></i> Moderate
                        </span>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <i data-lucide="flame" class="w-6 h-6"></i>
                    </div>
                </div>

                <div class="bg-[#131A26] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                    <div>
                        <p class="text-xs text-slate-400 font-medium">Core Skin Temp</p>
                        <p class="text-2xl font-bold text-white mt-1" id="deskTempVal">99.1 °F</p>
                        <span class="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                            <i data-lucide="check" class="w-3 h-3"></i> Normal Thermo
                        </span>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <i data-lucide="thermometer" class="w-6 h-6"></i>
                    </div>
                </div>
            </div>

            <!-- Desktop Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Main Charts Column -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Session Streaming Control Bar -->
                    <div class="bg-[#131A26] p-5 rounded-xl border border-[#1E293B] flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-bold text-white">Live Monitoring Stream</h3>
                            <p class="text-xs text-slate-400">Continuous telemetry broadcast from microfluidic bio-patch.</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button id="desktopSessionBtn" onclick="toggleSession()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2">
                                <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                                <span id="desktopSessionBtnText">START SESSION</span>
                            </button>
                        </div>
                    </div>

                    <!-- Live Desktop Multi Chart Panel -->
                    <div class="bg-[#131A26] p-5 rounded-xl border border-[#1E293B] space-y-4">
                        <div class="flex justify-between items-center border-b border-[#1E293B] pb-3">
                            <h4 class="text-sm font-bold text-white">Biomarker Real-Time Telemetry</h4>
                            <span class="text-xs font-mono text-emerald-400 font-bold" id="desktopTimerText">00:00:00</span>
                        </div>
                        <div class="h-64">
                            <canvas id="chartDesktopMulti"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar Column -->
                <div class="space-y-6">
                    <!-- Patch Hardware Status Panel -->
                    <div class="bg-[#131A26] p-5 rounded-xl border border-[#1E293B] space-y-4">
                        <h3 class="text-sm font-bold text-white flex items-center gap-2">
                            <i data-lucide="cpu" class="w-4 h-4 text-emerald-400"></i> Hardware Status
                        </h3>
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center relative shrink-0">
                                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <div id="desktopPatchLED" class="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                                </div>
                            </div>
                            <div class="space-y-1">
                                <p class="text-xs font-bold text-white">HYDR8 Proto-Patch</p>
                                <p id="desktopPatchStatusText" class="text-[10px] text-slate-400 font-medium">Disconnected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </main>

    <script>
        // State variables
        let currentView = 'mobile';
        let currentTab = 'home';
        let isSessionActive = false;
        let sessionSeconds = 0;
        let sessionInterval = null;
        let hydrationScore = 86;
        
        // BLE Variables
        let bleDevice = null;
        let bleCharacteristic = null;
        const BLE_SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214"; // Must match Arduino code
        const BLE_CHAR_UUID = "19b10001-e8f2-537e-4f6c-d104768a1214";

        // Chart instances
        let chartHydrationLive, chartSweatLive, chartTempLive, chartWeeklyInsights, chartDesktopMulti;

        // View Switching (Mobile Frame vs Desktop)
        function switchView(view) {
            currentView = view;
            const mobileFrame = document.getElementById('mobileFrameView');
            const desktopFrame = document.getElementById('desktopFrameView');
            const btnMobile = document.getElementById('btnMobileView');
            const btnDesktop = document.getElementById('btnDesktopView');

            if (view === 'mobile') {
                mobileFrame.classList.remove('hidden');
                desktopFrame.classList.add('hidden');
                btnMobile.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-blue-600 text-white shadow-md";
                btnDesktop.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all";
            } else {
                mobileFrame.classList.add('hidden');
                desktopFrame.classList.remove('hidden');
                btnDesktop.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-blue-600 text-white shadow-md";
                btnMobile.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all";
            }
        }

        // Mobile Screen Tab Switching
        function switchTab(tabId) {
            currentTab = tabId;
            const tabs = ['home', 'live', 'insights', 'history', 'settings', 'patch'];
            
            tabs.forEach(tab => {
                const content = document.getElementById(`tab-${tab}`);
                const btn = document.getElementById(`tabBtn-${tab}`);
                
                if (tab === tabId) {
                    content.classList.remove('hidden');
                    if (btn) btn.className = "flex flex-col items-center space-y-1 text-blue-500 font-semibold";
                } else {
                    content.classList.add('hidden');
                    if (btn) btn.className = "flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-200 font-normal";
                }
            });
        }

        // --- WEB BLUETOOTH INTEGRATION ---
        async function connectBLEPatch() {
            try {
                if (!navigator.bluetooth) {
                    triggerToast("❌ Web Bluetooth is not supported in this browser.");
                    return;
                }

                triggerToast("🔍 Searching for HYDR8 Patch...");
                
                bleDevice = await navigator.bluetooth.requestDevice({
                    filters: [{ name: 'HYDR8_Patch' }],
                    optionalServices: [BLE_SERVICE_UUID]
                });

                bleDevice.addEventListener('gattserverdisconnected', onDisconnected);
                
                const server = await bleDevice.gatt.connect();
                const service = await server.getPrimaryService(BLE_SERVICE_UUID);
                bleCharacteristic = await service.getCharacteristic(BLE_CHAR_UUID);
                
                await bleCharacteristic.startNotifications();
                bleCharacteristic.addEventListener('characteristicvaluechanged', handleBLEData);

                // Update UI for Connection Success
                document.getElementById('btnPairBLE').classList.replace('bg-emerald-600', 'bg-blue-600');
                document.getElementById('bleStatusText').innerText = "Patch Connected";
                document.getElementById('bleIconMobile').classList.replace('text-slate-600', 'text-blue-500');
                
                // Hardware Tab UI Updates
                document.getElementById('patchStatusLED').classList.replace('bg-slate-400', 'bg-emerald-500');
                document.getElementById('patchStatusLED').classList.add('patch-led');
                document.getElementById('patchStatusText').innerText = "Connected via BLE";
                document.getElementById('desktopPatchLED').classList.replace('bg-slate-400', 'bg-emerald-500');
                document.getElementById('desktopPatchLED').classList.add('patch-led');
                document.getElementById('desktopPatchStatusText').innerText = "Streaming Data via BLE";
                document.getElementById('bleSignalText').innerHTML = `<i data-lucide="wifi" class="w-3.5 h-3.5"></i> -54 dBm (Good)`;
                
                triggerToast("✅ Physical Patch Successfully Paired!");
                if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();

            } catch (error) {
                console.error("BLE Error:", error);
                triggerToast("⚠️ Could not connect to patch. Is it powered on?");
            }
        }

        function onDisconnected() {
            triggerToast("❌ Patch Disconnected.");
            document.getElementById('btnPairBLE').classList.replace('bg-blue-600', 'bg-emerald-600');
            document.getElementById('bleStatusText').innerText = "Pair Physical Patch";
            document.getElementById('bleIconMobile').classList.replace('text-blue-500', 'text-slate-600');
            
            document.getElementById('patchStatusLED').classList.replace('bg-emerald-500', 'bg-slate-400');
            document.getElementById('patchStatusLED').classList.remove('patch-led');
            document.getElementById('patchStatusText').innerText = "Disconnected";
            document.getElementById('desktopPatchLED').classList.replace('bg-emerald-500', 'bg-slate-400');
            document.getElementById('desktopPatchLED').classList.remove('patch-led');
            document.getElementById('desktopPatchStatusText').innerText = "Disconnected";
        }

        function handleBLEData(event) {
            // Read string from characteristic (e.g. "99.1,450")
            const value = event.target.value;
            const decoder = new TextDecoder('utf-8');
            const dataString = decoder.decode(value);
            
            const parts = dataString.split(',');
            if(parts.length === 2) {
                let temp = parseFloat(parts[0]);
                let sweatRaw = parseInt(parts[1]);

                // Map raw analog sweat (0-1023) to L/hr estimate (just an example algorithm)
                let sweatRate = (sweatRaw / 1023) * 2.0; 

                // Update charts if session is active
                if(isSessionActive) {
                    pushLiveChartData(temp, sweatRate);
                }

                // Always update static Dashboard text values
                updateDashboardValues(temp, sweatRate);
            }
        }

        function updateDashboardValues(temp, sweatRate) {
            // Mobile Home Tab
            document.getElementById('valTemp').innerText = temp.toFixed(1);
            document.getElementById('valSweatRate').innerText = sweatRate.toFixed(1);
            // Desktop
            document.getElementById('deskTempVal').innerText = temp.toFixed(1) + " °F";
            document.getElementById('deskSweatVal').innerText = sweatRate.toFixed(1) + " L/hr";
        }

        // Toggle Live Workout Session
        function toggleSession() {
            isSessionActive = !isSessionActive;
            const mobileBtnText = document.getElementById('mobileSessionBtnText');
            const desktopBtnText = document.getElementById('desktopSessionBtnText');

            if (isSessionActive) {
                if (mobileBtnText) mobileBtnText.innerText = "END SESSION";
                if (desktopBtnText) desktopBtnText.innerText = "END SESSION";
                
                switchTab('live');
                triggerToast('🚀 Workout Session Started!');

                sessionInterval = setInterval(() => {
                    sessionSeconds++;
                    const hrs = String(Math.floor(sessionSeconds / 3600)).padStart(2, '0');
                    const mins = String(Math.floor((sessionSeconds % 3600) / 60)).padStart(2, '0');
                    const secs = String(sessionSeconds % 60).padStart(2, '0');
                    const timeStr = `${hrs}:${mins}:${secs}`;
                    
                    document.getElementById('sessionTimer').innerText = timeStr;
                    document.getElementById('desktopTimerText').innerText = timeStr;

                    // If patch is NOT connected, use mock data. If it is, handleBLEData handles it.
                    if (!bleDevice && sessionSeconds % 3 === 0) {
                        let mockTemp = 99.1 + (Math.random() * 0.4 - 0.2);
                        let mockSweat = 0.8 + (Math.random() * 0.2 - 0.1);
                        pushLiveChartData(mockTemp, mockSweat);
                        updateDashboardValues(mockTemp, mockSweat);
                    }
                }, 1000);
            } else {
                clearInterval(sessionInterval);
                sessionSeconds = 0;
                document.getElementById('sessionTimer').innerText = "00:00:00";
                document.getElementById('desktopTimerText').innerText = "00:00:00";
                if (mobileBtnText) mobileBtnText.innerText = "START SESSION";
                if (desktopBtnText) desktopBtnText.innerText = "START SESSION";
                
                triggerToast('🏁 Session Ended & Saved to History.');
                switchTab('home');
            }
        }

        // Push data ticks into charts
        function pushLiveChartData(newTemp, newSweat) {
            if (!chartHydrationLive) return;
            
            // Calculate a synthetic hydration score based on sweat loss over time for chart
            hydrationScore = Math.max(70, Math.min(100, hydrationScore - (newSweat * 0.05)));
            
            document.getElementById('liveHydrationVal').innerText = `${Math.round(hydrationScore)}% Good`;
            document.getElementById('liveSweatVal').innerText = `${newSweat.toFixed(1)} L/hr`;
            document.getElementById('liveTempVal').innerText = `${newTemp.toFixed(1)} °F`;

            // Mobile Charts Update
            chartHydrationLive.data.datasets[0].data.shift();
            chartHydrationLive.data.datasets[0].data.push(hydrationScore);
            chartHydrationLive.update();

            chartSweatLive.data.datasets[0].data.shift();
            chartSweatLive.data.datasets[0].data.push(newSweat);
            chartSweatLive.update();

            chartTempLive.data.datasets[0].data.shift();
            chartTempLive.data.datasets[0].data.push(newTemp);
            chartTempLive.update();

            // Desktop Multi-Chart Update
            chartDesktopMulti.data.datasets[0].data.shift();
            chartDesktopMulti.data.datasets[0].data.push(hydrationScore);
            chartDesktopMulti.data.datasets[1].data.shift();
            chartDesktopMulti.data.datasets[1].data.push(newTemp);
            chartDesktopMulti.update();
        }

        // Action: Drink Water
        function drinkWaterAction() {
            if (hydrationScore < 98) {
                hydrationScore += 4;
            } else {
                hydrationScore = 100;
            }
            updateHydrationScoreUI(hydrationScore);
            triggerToast('💧 Added fluid intake. Hydration score increased!');
        }

        // Update Arc Gauge UI
        function updateHydrationScoreUI(score) {
            const roundedScore = Math.round(score);
            document.getElementById('hydrationScoreText').innerText = roundedScore;
            document.getElementById('valHydration').innerText = roundedScore;
            document.getElementById('deskHydrationVal').innerText = `${roundedScore} / 100`;
            
            const offset = 126 - (126 * (score / 100));
            const arc = document.getElementById('hydrationArc');
            if (arc) arc.style.strokeDashoffset = offset;
        }

        // Toast Notification Function
        function triggerToast(message) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = "bg-[#131A26] border border-blue-500/40 text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center space-x-2 pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0";
            toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-blue-400 shrink-0"></i> <span>${message}</span>`;
            
            container.appendChild(toast);
            if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();

            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 50);

            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 3500);
        }

        function initCharts() {
            const commonChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    line: { tension: 0.4, borderWidth: 2 },
                    point: { radius: 0 }
                }
            };

            const ctxHydration = document.getElementById('chartHydrationLive').getContext('2d');
            chartHydrationLive = new Chart(ctxHydration, {
                type: 'line',
                data: {
                    labels: ['0m', '5m', '10m', '15m', '20m', '25m', '30m'],
                    datasets: [{
                        data: [88, 87, 86, 85, 87, 86, 86],
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true
                    }]
                },
                options: commonChartOptions
            });

            const ctxSweat = document.getElementById('chartSweatLive').getContext('2d');
            chartSweatLive = new Chart(ctxSweat, {
                type: 'line',
                data: {
                    labels: ['0m', '5m', '10m', '15m', '20m', '25m', '30m'],
                    datasets: [{
                        data: [0.4, 0.6, 0.9, 1.2, 0.8, 0.7, 0.8],
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        fill: true
                    }]
                },
                options: commonChartOptions
            });

            const ctxTemp = document.getElementById('chartTempLive').getContext('2d');
            chartTempLive = new Chart(ctxTemp, {
                type: 'line',
                data: {
                    labels: ['0m', '5m', '10m', '15m', '20m', '25m', '30m'],
                    datasets: [{
                        data: [98.6, 98.8, 99.0, 99.2, 99.1, 99.1, 99.1],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true
                    }]
                },
                options: commonChartOptions
            });

            const ctxWeekly = document.getElementById('chartWeeklyInsights').getContext('2d');
            chartWeeklyInsights = new Chart(ctxWeekly, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        data: [80, 85, 78, 92, 88, 82, 86],
                        backgroundColor: '#2563EB',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                        y: { grid: { color: '#1E293B' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 50, max: 100 }
                    }
                }
            });

            const ctxDesktop = document.getElementById('chartDesktopMulti').getContext('2d');
            chartDesktopMulti = new Chart(ctxDesktop, {
                type: 'line',
                data: {
                    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
                    datasets: [
                        { label: 'Hydration %', data: [88, 87, 86, 85, 87, 86, 86], borderColor: '#2563EB', tension: 0.4 },
                        { label: 'Core Temp (°F)', data: [98.6, 98.8, 99.0, 99.2, 99.1, 99.1, 99.1], borderColor: '#10B981', tension: 0.4 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#E2E8F0', font: { size: 11 } } } },
                    scales: {
                        x: { grid: { color: '#1E293B' }, ticks: { color: '#94A3B8' } },
                        y: { grid: { color: '#1E293B' }, ticks: { color: '#94A3B8' } }
                    }
                }
            });
        }

        window.onload = function() {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
            initCharts();
            updateHydrationScoreUI(86);
        };
    </script>
</body>
</html>
