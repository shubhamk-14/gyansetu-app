import React from 'react';
import { 
  Sun, 
  Moon, 
  Flame, 
  LogOut, 
  LogIn, 
  Trophy, 
  BarChart3, 
  CalendarDays, 
  ShieldCheck, 
  Sparkles,
  User
} from 'lucide-react';

export default function AppSettingsMenu({ 
  user, 
  onOpenAuthModal, 
  onLogout, 
  theme, 
  setTheme, 
  setActiveTab,
  streakDays = 14
}) {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 pb-8 animate-fadeIn max-w-2xl mx-auto">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border flex items-center justify-between shadow-xl ${
        isDark ? 'bg-slate-900 border-indigo-500/30 text-white' : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white'
      }`}>
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase border border-white/30">
            Account & Settings
          </span>
          <h2 className="text-2xl font-black text-white mt-1">App Settings & Profile</h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300">
          <User className="w-6 h-6" />
        </div>
      </div>

      {/* User Profile / Auth Action Card */}
      <div className={`p-6 rounded-3xl border space-y-4 shadow-md ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
      }`}>
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                {user.avatar || 'SK'}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black">{user.name}</h3>
                  <span className="px-2 py-0.5 text-[9px] font-black bg-amber-400 text-slate-950 rounded-md uppercase">PRO Aspirant</span>
                </div>
                <p className="text-xs text-slate-500 font-bold">{user.email}</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-extrabold">AIR Rank #142 • Readiness: 78%</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout of GyanSetu</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <h3 className="text-base font-black">Guest Demo Mode</h3>
            <p className="text-xs text-slate-500 font-bold max-w-sm mx-auto">
              Sign in or register to sync your notes, attempt live mock tests, and ask the 24/7 AI Tutor.
            </p>
            <button
              onClick={onOpenAuthModal}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          </div>
        )}
      </div>

      {/* Theme Switcher & Streak Controls Card */}
      <div className={`p-6 rounded-3xl border space-y-5 shadow-md ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
      }`}>
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
          Preferences & Streak
        </h3>

        {/* Dark Mode Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800 text-amber-400' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-black">Appearance Mode</div>
              <div className="text-xs text-slate-500 font-bold">{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</div>
            </div>
          </div>

          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`px-4 py-2 rounded-2xl text-xs font-black border transition-all ${
              isDark 
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md' 
                : 'bg-indigo-600 text-white border-indigo-700 shadow-md'
            }`}
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Active Streak */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 dark:bg-amber-500/20 dark:border-amber-500/30">
              <Flame className="w-5 h-5 text-amber-600 animate-bounce" />
            </div>
            <div>
              <div className="text-sm font-black">Active Study Streak</div>
              <div className="text-xs text-slate-500 font-bold">Keep practicing daily to build your streak</div>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-2xl bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 font-black text-xs">
            🔥 {streakDays} Days Streak
          </span>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className={`p-6 rounded-3xl border space-y-3 shadow-md ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
      }`}>
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
          Platform Shortcuts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`p-4 rounded-2xl border transition-all flex items-center gap-3 font-black text-xs text-left ${
              isDark ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-indigo-50 border-slate-300'
            }`}
          >
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div>National Leaderboard</div>
              <div className="text-[10px] text-slate-500 font-normal">Check All-India Ranks</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`p-4 rounded-2xl border transition-all flex items-center gap-3 font-black text-xs text-left ${
              isDark ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' : 'bg-slate-50 hover:bg-indigo-50 border-slate-300'
            }`}
          >
            <BarChart3 className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div>Performance Analytics</div>
              <div className="text-[10px] text-slate-500 font-normal">View speed & accuracy</div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
