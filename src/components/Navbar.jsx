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

  const calculateDaysLeft = (targetDateStr) => {
    const target = new Date(targetDateStr);
    const today = new Date();
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(selectedExamData.targetDate);
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl px-4 lg:px-8 py-3.5 border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800' 
        : 'bg-white/95 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo - GyanSetu */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${isDark ? 'bg-slate-950 text-amber-400' : 'bg-white text-indigo-700'}`}>
                <GraduationCap className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xl lg:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Gyan<span className="text-amber-500 dark:text-amber-400">Setu</span>
              </h1>
              <span className={`px-2 py-0.5 text-[10px] font-black tracking-widest uppercase rounded-md border ${
                isDark 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}>
                PRO
              </span>
            </div>
            <p className={`text-[11px] font-bold hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              AI Exam Preparation Platform
            </p>
          </div>
        </div>

        {/* Target Exam Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className={`flex items-center gap-3 border rounded-2xl px-4 py-2 text-left transition-all duration-200 shadow-sm ${
              isDark 
                ? 'bg-slate-900 border-slate-750 text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-950 hover:bg-white'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Target Stream
              </div>
              <div className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {selectedExamData.name}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${examDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
              </div>
            </div>
          </button>

          {/* Exam Dropdown */}
          {examDropdownOpen && (
            <div 
              className={`absolute top-full left-0 mt-2 w-72 border rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-xl'
              }`}
              onMouseLeave={() => setExamDropdownOpen(false)}
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
                        <div className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exam.category}</div>
                      </div>

                      <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300">
                        {exam.defaultQuestions} MCQs
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Theme Toggle, Profile/Login, Days Left, Streak */}
        <div className="flex items-center gap-3">
          
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-black ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-300 text-indigo-900 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-700" />}
          </button>

          {/* Days Left Pill */}
          <div className={`hidden lg:flex items-center gap-2 border rounded-2xl px-3.5 py-2 text-xs font-extrabold ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <Clock className="w-4 h-4 text-amber-600" />
            <span><strong className="text-amber-700 font-black text-sm">{daysLeft}</strong> Days Left</span>
          </div>

          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-950 rounded-2xl px-3.5 py-2 text-xs font-black shadow-xs dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>{streakDays}d Streak</span>
          </div>

          {/* User Profile / Login & Logout */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-2xl font-black text-xs shadow-md hover:scale-105 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white text-indigo-900 flex items-center justify-center font-black text-[10px]">
                  {user.avatar}
                </div>
                <span className="hidden md:inline">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div 
                  className={`absolute top-full right-0 mt-2 w-64 border rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn backdrop-blur-xl ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950 shadow-xl'
                  }`}
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-black">{user.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold">{user.email}</p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
                    <div className="flex items-center justify-between py-1 px-2">
                      <span className="text-slate-500">Readiness Score</span>
                      <span className="font-black text-indigo-600 dark:text-indigo-400">{user.readinessScore}%</span>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2">
                      <span className="text-slate-500">Active Streak</span>
                      <span className="font-black text-amber-600">{user.streak} Days 🔥</span>
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
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
