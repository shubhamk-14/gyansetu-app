import React from 'react';
import { EXAMS, SUBJECTS_TREE, MOCK_TESTS, INITIAL_STUDY_PLAN } from '../data/examData';
import { 
  Trophy, 
  Target, 
  Clock, 
  BrainCircuit, 
  Calculator, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function Dashboard({ 
  currentExam, 
  setActiveTab, 
  onStartMockTest, 
  onSelectTopicNotes,
  theme
}) {
  const exam = EXAMS.find(e => e.id === currentExam) || EXAMS[0];
  const isDark = theme === 'dark';

  const titleColor = isDark ? '#FFFFFF' : '#020617';
  const subtitleColor = isDark ? '#94A3B8' : '#334155';
  const cardBg = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md';

  const stats = [
    { 
      title: 'Readiness Index', 
      value: '78%', 
      change: '+5.2% this week', 
      valueColor: isDark ? 'text-indigo-400' : 'text-indigo-900', 
      icon: Target 
    },
    { 
      title: 'Mock Tests Attempted', 
      value: '14', 
      change: 'Avg: 84% accuracy', 
      valueColor: isDark ? 'text-blue-400' : 'text-blue-900', 
      icon: ShieldCheck 
    },
    { 
      title: 'Syllabus Mastered', 
      value: '62%', 
      change: '34 of 56 topics', 
      valueColor: isDark ? 'text-amber-400' : 'text-amber-900', 
      icon: BookOpen 
    },
    { 
      title: 'All India Rank', 
      value: '#142', 
      change: 'Top 2.5% Percentile', 
      valueColor: isDark ? 'text-purple-400' : 'text-purple-900', 
      icon: Trophy 
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 pb-8 animate-fadeIn max-w-full overflow-hidden">
      
      {/* High-Contrast Hero Exam Banner */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-950 shadow-2xl text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-black text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Target Stream: {exam.name}</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white break-words">
              {exam.name} Exam Hub
            </h2>
            <p className="text-white text-xs sm:text-sm leading-relaxed font-semibold">
              {exam.desc}
            </p>
          </div>

          {/* Exam Rules & Quick Launch Box */}
          <div className="w-full lg:w-auto flex flex-row items-center justify-between gap-3 bg-slate-950/70 backdrop-blur-xl p-3.5 sm:p-5 rounded-2xl border border-white/30 shadow-2xl shrink-0">
            <div className="text-center px-2 sm:px-3 border-r border-white/25">
              <div className="text-[9px] sm:text-[10px] uppercase font-black text-amber-300 tracking-wider">Target Date</div>
              <div className="text-xs sm:text-sm font-black text-white">{exam.date}</div>
            </div>
            <div className="text-center px-2 sm:px-3 border-r border-white/25 lg:border-r-0">
              <div className="text-[9px] sm:text-[10px] uppercase font-black text-amber-300 tracking-wider">Rules</div>
              <div className="text-xs sm:text-sm font-black text-white">+{exam.marksPerQuestion} / -{exam.negativeMarking}</div>
            </div>
            <button
              onClick={() => onStartMockTest(MOCK_TESTS[0].id)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-xl active:scale-95 flex items-center gap-1.5 shrink-0"
            >
              <span>Mock Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* AI Diagnostic Alert Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-800 to-purple-800 text-white border border-indigo-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-white/20 rounded-2xl shrink-0 text-white">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-black text-white">AI Diagnostic Alert</h3>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-amber-400 text-slate-950 rounded-md">
                Actionable Insight
              </span>
            </div>
            <p className="text-xs text-white mt-1 leading-relaxed font-semibold">
              Your accuracy in <strong>Reasoning (Coding-Decoding)</strong> is 85%. Attempt 1 Mock Test to reach top 1% Rank!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ai-quiz')}
          className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch AI Quiz</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all flex flex-col justify-between ${cardBg}`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-black truncate pr-1" style={{ color: subtitleColor }}>{s.title}</span>
                <div className={`p-2 rounded-xl ${isDark ? 'bg-slate-950' : 'bg-slate-100'} ${s.valueColor} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="my-2">
                <span className={`text-xl sm:text-3xl font-black ${s.valueColor}`}>{s.value}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-black flex items-center gap-1 truncate" style={{ color: subtitleColor }}>
                <TrendingUp className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="truncate">{s.change}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Subject & Topic Tree */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black flex items-center gap-2" style={{ color: titleColor }}>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                <span>Subject & Topic Mastery Breakdown</span>
              </h3>
              <p className="text-[11px] sm:text-xs font-bold" style={{ color: subtitleColor }}>
                Click any topic to view formulas & PYQs
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('subjects')}
              className="text-xs font-black text-indigo-700 hover:underline flex items-center gap-1 shrink-0"
            >
              Notes <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {SUBJECTS_TREE.map((subject) => {
              const SubjectIcon = subject.id === 'reasoning' ? BrainCircuit : subject.id === 'mathematics' ? Calculator : BookOpen;
              
              return (
                <div key={subject.id} className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border space-y-3 ${cardBg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
                      }`}>
                        <SubjectIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black" style={{ color: titleColor }}>{subject.name}</h4>
                        <p className="text-[10px] sm:text-[11px] font-bold" style={{ color: subtitleColor }}>{subject.topics.length} core topics</p>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full border bg-indigo-100 text-indigo-950 border-indigo-300 shrink-0">
                      High Yield
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {subject.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => onSelectTopicNotes(subject.id, topic.id)}
                        className={`p-3 sm:p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                          isDark 
                            ? 'bg-slate-950 hover:bg-slate-800 border-slate-800' 
                            : 'bg-slate-50 hover:bg-indigo-50 border-slate-300 hover:border-indigo-400 shadow-xs'
                        }`}
                      >
                        <div className="space-y-1 pr-2 min-w-0">
                          <div className="text-xs font-black truncate" style={{ color: titleColor }}>
                            {topic.name}
                          </div>
                          <div className="text-[10px] font-extrabold flex items-center gap-1.5 flex-wrap" style={{ color: subtitleColor }}>
                            <span>⏱️ {topic.estimatedTime}</span>
                            <span>•</span>
                            <span className="font-black bg-indigo-100 text-indigo-950 px-1.5 py-0.5 rounded border border-indigo-300">
                              Mastery: {topic.mastery}%
                            </span>
                          </div>
                        </div>

                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center transition-all shadow-md group-hover:scale-105 shrink-0">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Daily Goal Checklist & Timed Exams */}
        <div className="space-y-6">
          
          {/* Daily Goal Checklist */}
          <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border space-y-4 ${cardBg}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs sm:text-sm font-black flex items-center gap-2" style={{ color: titleColor }}>
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Daily Roadmap</span>
              </h3>
              <span className="text-[10px] font-black uppercase" style={{ color: subtitleColor }}>Today</span>
            </div>

            <div className="space-y-2.5">
              {INITIAL_STUDY_PLAN.slice(0, 4).map((task) => {
                const isCompleted = task.status === 'completed';

                return (
                  <div 
                    key={task.id} 
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between shadow-xs ${
                      isCompleted
                        ? isDark
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-indigo-50/90 border-indigo-300'
                        : isDark
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5 pr-2 min-w-0">
                      <div className="font-black text-xs sm:text-sm truncate" style={{ color: isDark ? '#FFFFFF' : '#020617' }}>
                        {task.title}
                      </div>
                      <div className="text-[10px] font-black flex items-center gap-1.5" style={{ color: isDark ? '#94A3B8' : '#334155' }}>
                        <span className="font-black text-indigo-700">{task.subject}</span>
                        <span>•</span>
                        <span>{task.time}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-lg uppercase shrink-0 ${
                      isCompleted 
                        ? 'bg-slate-950 text-white border border-slate-900' 
                        : 'bg-amber-300 text-slate-950 border border-amber-400 font-black'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('planner')}
              className={`w-full text-center py-2.5 border rounded-2xl text-xs font-black transition-all ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-indigo-400 hover:text-indigo-300' 
                  : 'bg-indigo-50 border-indigo-300 text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              Open Full Roadmap
            </button>
          </div>

          {/* Featured Timed Exams */}
          <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border space-y-4 ${cardBg}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs sm:text-sm font-black flex items-center gap-2" style={{ color: titleColor }}>
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Featured Timed Exams</span>
              </h3>
              <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase">Live</span>
            </div>

            <div className="space-y-3">
              {MOCK_TESTS.map((test) => (
                <div 
                  key={test.id}
                  className={`p-3 rounded-2xl border transition-all space-y-2 ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800' 
                      : 'bg-slate-50 border-slate-300 hover:border-indigo-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h5 className="text-xs font-black truncate" style={{ color: titleColor }}>{test.title}</h5>
                      <p className="text-[10px] font-bold mt-0.5 truncate" style={{ color: subtitleColor }}>{test.subject}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-black rounded border bg-slate-200 text-slate-950 border-slate-300 shrink-0">
                      {test.durationMinutes}m
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[10px] font-black" style={{ color: subtitleColor }}>
                    <span>{test.questions.length} MCQs</span>
                    <button
                      onClick={() => onStartMockTest(test.id)}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-lg text-[10px] transition-all shadow-sm shrink-0"
                    >
                      Attempt Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
