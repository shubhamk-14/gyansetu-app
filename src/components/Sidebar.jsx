import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Bot, 
  Zap, 
  BarChart3, 
  CalendarDays, 
  HelpCircle, 
  Trophy,
  Sparkles,
  Lock
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, theme, user, onOpenAuthModal }) {
  const isDark = theme === 'dark';

  const sections = [
    {
      title: 'Main Hub',
      items: [
        { id: 'dashboard', label: 'Dashboard Demo', icon: LayoutDashboard, badge: 'Public' }
      ]
    },
    {
      title: 'Learning & Practice',
      items: [
        { id: 'subjects', label: 'Subjects & Notes', icon: BookOpen, badge: 'Notes' },
        { id: 'mock-tests', label: 'Timed Mock Tests', icon: Clock, badge: 'PRO', locked: !user },
        { id: 'question-bank', label: 'Question Bank', icon: HelpCircle, badge: 'PYQs' }
      ]
    },
    {
      title: 'AI Study Intelligence',
      items: [
        { id: 'ai-tutor', label: 'AI Doubt Solver', icon: Bot, badge: '24/7 AI', locked: !user },
        { id: 'ai-quiz', label: 'AI Quiz Generator', icon: Zap, badge: 'Dynamic', locked: !user }
      ]
    },
    {
      title: 'Analytics & Roadmap',
      items: [
        { id: 'analytics', label: 'Performance & Speed', icon: BarChart3, badge: null },
        { id: 'planner', label: 'Study Planner', icon: CalendarDays, badge: 'PRO', locked: !user },
        { id: 'leaderboard', label: 'National Leaderboard', icon: Trophy, badge: 'AIR Rank' }
      ]
    }
  ];

  return (
    <aside className={`hidden lg:flex w-64 p-4 flex-col justify-between shrink-0 rounded-3xl border transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-white border-slate-300 shadow-md'
    }`}>
      <div className="space-y-5">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <div 
              className="text-[10px] font-black uppercase tracking-widest px-3"
              style={{ color: isDark ? '#94A3B8' : '#334155' }}
            >
              {sec.title}
            </div>

            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isLocked = item.locked;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isLocked) {
                        onOpenAuthModal();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-black text-xs transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]'
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-slate-950 hover:bg-indigo-50'
                    }`}
                    style={!isActive && !isDark ? { color: '#020617' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : isDark
                          ? 'bg-slate-950 text-slate-400 group-hover:text-indigo-400'
                          : 'bg-slate-100 text-indigo-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isLocked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                      {item.badge && (
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : isLocked
                            ? 'bg-amber-100 text-amber-950 border border-amber-300'
                            : 'bg-indigo-100 text-indigo-950 border border-indigo-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating AI Card */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 hidden lg:block">
        <div className={`p-4 rounded-2xl border relative overflow-hidden shadow-md ${
          isDark 
            ? 'bg-slate-950 border-indigo-500/30' 
            : 'bg-indigo-50 border-indigo-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-700 animate-spin" />
            <span className="text-xs font-black" style={{ color: isDark ? '#FFFFFF' : '#020617' }}>
              {user ? 'AI Instant Tutor' : 'Guest Demo Mode'}
            </span>
          </div>
          <p className="text-[11px] font-bold leading-relaxed mb-3" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
            {user ? 'Ask any doubt or paste math equations for step-by-step solutions.' : 'Sign in to access AI doubt clearing & timed mock tests.'}
          </p>
          <button
            onClick={() => {
              if (!user) onOpenAuthModal();
              else setActiveTab('ai-tutor');
            }}
            className="w-full text-center py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-all shadow-md active:scale-95"
          >
            {user ? 'Start Doubt Session' : 'Sign In to Unlock'}
          </button>
        </div>
      </div>
    </aside>
  );
}
