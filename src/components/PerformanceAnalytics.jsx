import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Award, 
  Target, 
  BrainCircuit, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function PerformanceAnalytics({ onGenerateQuiz, theme }) {
  const isDark = theme === 'dark';

  const subjectPerformance = [
    { subject: 'Reasoning Ability', accuracy: 88, speed: '38 sec/q', status: 'Strong Area', color: 'from-indigo-600 to-purple-700' },
    { subject: 'Quantitative Aptitude', accuracy: 72, speed: '52 sec/q', status: 'Needs Practice', color: 'from-purple-600 to-indigo-800' },
    { subject: 'Indian Constitution & Polity', accuracy: 85, speed: '25 sec/q', status: 'Strong Area', color: 'from-amber-600 to-orange-700' },
    { subject: 'English & Comprehension', accuracy: 68, speed: '30 sec/q', status: 'Focus Required', color: 'from-rose-600 to-pink-700' }
  ];

  const recentMockTrend = [
    { name: 'Mock Test #01', score: 62, accuracy: 70 },
    { name: 'Mock Test #02', score: 68, accuracy: 74 },
    { name: 'Mock Test #03', score: 75, accuracy: 80 },
    { name: 'Mock Test #04', score: 84, accuracy: 88 }
  ];

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
        isDark ? 'bg-slate-900 border-indigo-500/30 text-white' : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black mb-2 border border-white/30">
            <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Performance & Speed Analytics
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-semibold">
            Real-time breakdown of accuracy %, solving speed, subject strength radar, and AI rank prediction.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border text-center space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
          <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Overall Accuracy</span>
          <div className="text-3xl font-black text-indigo-900 dark:text-indigo-400">78.5%</div>
          <span className="text-[10px] text-slate-900 dark:text-slate-300 font-black">Top 5% Accuracy Tier</span>
        </div>
        <div className={`p-5 rounded-3xl border text-center space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
          <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Average Speed</span>
          <div className="text-3xl font-black text-indigo-900 dark:text-indigo-400">36 sec</div>
          <span className="text-[10px] text-slate-900 dark:text-slate-300 font-black">Goal: &lt;40s per MCQ</span>
        </div>
        <div className={`p-5 rounded-3xl border text-center space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
          <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Estimated Percentile</span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">97.8%</div>
          <span className="text-[10px] text-slate-900 dark:text-slate-300 font-black">Rank ~ #142 All India</span>
        </div>
        <div className={`p-5 rounded-3xl border text-center space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
          <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Syllabus Mastery</span>
          <div className="text-3xl font-black text-purple-900 dark:text-purple-400">62%</div>
          <span className="text-[10px] text-slate-900 dark:text-slate-300 font-black">34 / 56 Topics Done</span>
        </div>
      </div>

      {/* AI Diagnostic Advisory Box */}
      <div className={`p-6 rounded-3xl border space-y-3 shadow-lg ${
        isDark ? 'bg-slate-900 border-indigo-500/30' : 'bg-indigo-50 border-indigo-300'
      }`}>
        <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-300 font-black text-sm">
          <Sparkles className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
          <span>AI Diagnostic Recommendation Report</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-900 dark:text-slate-200">
          <div className={`p-4 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <strong className="text-indigo-900 dark:text-indigo-400 font-black block">💪 Core Strengths:</strong>
            <p>Reasoning Ability & Indian Polity (Accuracy &gt;85%). High speed on direct formula questions.</p>
          </div>
          <div className={`p-4 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <strong className="text-rose-700 dark:text-rose-400 font-black block">⚠️ Growth Vulnerabilities:</strong>
            <p>Quantitative Aptitude time per question is 52s (target is 40s). Dishonest trader math & Time & Work take 65% of test duration.</p>
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button
            onClick={onGenerateQuiz}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            Launch Targeted Remedial Quiz
          </button>
        </div>
      </div>

      {/* Main 2-Column: Subject Mastery Bars & Test Score Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subject Mastery Progress Bars */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <h3 className={`text-base font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Subject Accuracy & Speed Breakdown
          </h3>

          <div className="space-y-4 pt-2">
            {subjectPerformance.map((sp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{sp.subject}</span>
                  <div className="flex items-center gap-2 font-black">
                    <span className="text-slate-700 dark:text-slate-400">⚡ {sp.speed}</span>
                    <span className="text-indigo-900 dark:text-indigo-300">{sp.accuracy}% Accuracy</span>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${sp.color} transition-all duration-500`}
                    style={{ width: `${sp.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Trend Line Visualization */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <h3 className={`text-base font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Mock Test Score Trajectory
          </h3>

          <div className="space-y-4 pt-2">
            {recentMockTrend.map((mt, idx) => (
              <div key={idx} className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{mt.name}</div>
                  <div className="text-[10px] font-extrabold text-slate-700 dark:text-slate-400 mt-0.5">Accuracy: {mt.accuracy}%</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-28 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: `${mt.score}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-indigo-950 dark:text-indigo-300">{mt.score} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
