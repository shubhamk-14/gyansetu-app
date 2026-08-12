import React, { useState } from 'react';
import { EXAMS } from '../data/examData';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ChevronDown, 
  Target,
  Shield,
  CheckCircle2,
  Sun,
  Moon,
  LogOut,
  LogIn,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  currentExam, 
  setCurrentExam, 
  setActiveTab,
  theme,
  setTheme,
  user,
  onOpenAuthModal,
  onLogout,
  streakDays = 14
}) {
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const selectedExamData = EXAMS.find(e => e.id === currentExam) || EXAMS[0];
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800' 
        : 'bg-white/95 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo - GyanSetu */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
          <div className="relative group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center ${isDark ? 'bg-slate-950 text-amber-400' : 'bg-white text-indigo-700'}`}>
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <h1 className={`text-lg sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Gyan<span className="text-amber-500 dark:text-amber-400">Setu</span>
              </h1>
              <span className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black tracking-widest uppercase rounded-md border ${
                isDark 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}>
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Target Exam Switcher Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className={`flex items-center gap-2 border rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-left transition-all duration-200 shadow-sm ${
              isDark 
                ? 'bg-slate-900 border-slate-750 text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-950 hover:bg-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Target Goal
              </div>
              <div className={`text-xs sm:text-sm font-black flex items-center gap-1 truncate max-w-[110px] sm:max-w-none ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {selectedExamData.name}
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${examDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
              </div>
            </div>
          </button>

          {/* Exam Dropdown */}
          {examDropdownOpen && (
            <div 
              className={`absolute top-full right-0 sm:left-0 mt-2 w-64 sm:w-72 border rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-xl'
              }`}
            >
              <div className={`text-[11px] font-black px-3 py-2 border-b flex items-center justify-between ${
                isDark ? 'text-slate-400 border-slate-800' : 'text-slate-700 border-slate-200'
              }`}>
                <span>Select Your Goal Exam</span>
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div className="mt-1 space-y-1">
                {EXAMS.map((exam) => {
                  const isSelected = currentExam === exam.id;
                  return (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setCurrentExam(exam.id);
                        setExamDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        isSelected
                          ? isDark 
                            ? 'bg-indigo-600/30 text-white border border-indigo-500/40 font-bold' 
                            : 'bg-indigo-100 text-indigo-950 border border-indigo-300 font-black'
                          : isDark
                          ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-bold'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-black flex items-center gap-1.5">
                          {exam.name}
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                        </div>
                        <div className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exam.date}</div>
                      </div>

                      <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300">
                        {exam.totalMcqs} MCQs
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Theme Toggle, Profile/Login, Streak */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-black ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-300 text-indigo-900 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-700" />}
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-950 rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black shadow-xs dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span>{streakDays}d</span>
          </div>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2.5 py-1.5 rounded-xl sm:rounded-2xl font-black text-xs shadow-md"
              >
                <div className="w-5 h-5 rounded-full bg-white text-indigo-900 flex items-center justify-center font-black text-[9px]">
                  {user.avatar || 'SK'}
                </div>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className={`absolute top-full right-0 mt-2 w-56 border rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn backdrop-blur-xl ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950 shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow">
                      {user.avatar || 'SK'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black truncate">{user.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-3 py-2 rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
