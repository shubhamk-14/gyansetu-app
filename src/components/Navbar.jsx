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
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl px-2 sm:px-6 lg:px-8 py-2 sm:py-3.5 border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800' 
        : 'bg-white/95 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 overflow-hidden">
        
        {/* Brand Logo - GyanSetu */}
        <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
          <div className="relative group shrink-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[6px] sm:rounded-[14px] flex items-center justify-center ${isDark ? 'bg-slate-950 text-amber-400' : 'bg-white text-indigo-700'}`}>
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-1">
              <h1 className={`text-base sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Gyan<span className="text-amber-500 dark:text-amber-400">Setu</span>
              </h1>
              <span className={`px-1 py-0.2 text-[8px] sm:text-[10px] font-black uppercase rounded border ${
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
        <div className="relative shrink min-w-0">
          <button
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className={`flex items-center gap-1 sm:gap-2 border rounded-lg sm:rounded-2xl px-2 sm:px-3 py-1 sm:py-1.5 text-left transition-all duration-200 shadow-sm ${
              isDark 
                ? 'bg-slate-900 border-slate-750 text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-950 hover:bg-white'
            }`}
          >
            <div className={`p-1 rounded-md shrink-0 hidden xs:block ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className={`text-[8px] sm:text-[10px] font-black uppercase tracking-wider hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Goal
              </div>
              <div className={`text-[11px] sm:text-sm font-black flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                <span className="truncate max-w-[70px] xs:max-w-[100px] sm:max-w-none">{selectedExamData.name}</span>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-200 ${examDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
              </div>
            </div>
          </button>

          {/* Exam Dropdown */}
          {examDropdownOpen && (
            <div 
              className={`absolute top-full right-0 sm:left-0 mt-2 w-60 sm:w-72 border rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-xl'
              }`}
            >
              <div className={`text-[10px] sm:text-[11px] font-black px-2 py-1.5 border-b flex items-center justify-between ${
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
                      className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex items-center justify-between ${
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
                        <div className="text-xs font-black flex items-center gap-1">
                          {exam.name}
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-600" />}
                        </div>
                        <div className={`text-[9px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exam.date}</div>
                      </div>

                      <span className="text-[9px] font-black text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300">
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
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-2xl border transition-all flex items-center justify-center text-xs font-black shrink-0 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-300 text-indigo-900 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-700" />}
          </button>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-950 rounded-lg sm:rounded-2xl px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-black shrink-0 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-600 animate-bounce" />
            <span>{streakDays}d</span>
          </div>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2 py-1 rounded-lg sm:rounded-2xl font-black text-xs shadow-md"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-indigo-900 flex items-center justify-center font-black text-[8px] sm:text-[9px]">
                  {user.avatar || 'SK'}
                </div>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className={`absolute top-full right-0 mt-2 w-52 border rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn backdrop-blur-xl ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950 shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow">
                      {user.avatar || 'SK'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black truncate">{user.name}</h4>
                      <p className="text-[9px] text-slate-500 font-bold truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full py-1.5 px-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] sm:text-xs font-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-2xl shadow-md transition-all shrink-0"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
