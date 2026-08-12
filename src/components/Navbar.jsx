import React, { useState } from 'react';
import { EXAMS } from '../data/examData';
import { 
  ChevronDown, 
  Target,
  Shield,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ 
  currentExam, 
  setCurrentExam, 
  setActiveTab,
  theme
}) {
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const selectedExamData = EXAMS.find(e => e.id === currentExam) || EXAMS[0];
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl px-3 sm:px-6 lg:px-8 py-2.5 border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800' 
        : 'bg-white/95 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
        
        {/* Brand Logo - GyanSetu */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
          <div className="relative group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 p-0.5 shadow-md">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-slate-950 text-amber-400' : 'bg-white text-indigo-700'}`}>
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-1.5">
              <h1 className={`text-lg sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Gyan<span className="text-amber-500 dark:text-amber-400">Setu</span>
              </h1>
              <span className={`px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase rounded border ${
                isDark 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}>
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Target Exam Goal Selector */}
        <div className="relative shrink min-w-0">
          <button
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className={`flex items-center gap-2 border rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 text-left transition-all duration-200 shadow-sm ${
              isDark 
                ? 'bg-slate-900 border-slate-750 text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-950 hover:bg-white'
            }`}
          >
            <div className={`p-1 rounded-lg shrink-0 ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Target Stream
              </div>
              <div className={`text-xs sm:text-sm font-black flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                <span className="truncate max-w-[100px] sm:max-w-none">{selectedExamData.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${examDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
              </div>
            </div>
          </button>

          {/* Exam Dropdown */}
          {examDropdownOpen && (
            <div 
              className={`absolute top-full right-0 mt-2 w-64 sm:w-72 border rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-xl'
              }`}
            >
              <div className={`text-[11px] font-black px-2.5 py-1.5 border-b flex items-center justify-between ${
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

      </div>
    </header>
  );
}
