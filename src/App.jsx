import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SubjectsNotes from './components/SubjectsNotes';
import MockTestEngine from './components/MockTestEngine';
import AIDoubtSolver from './components/AIDoubtSolver';
import AIQuizGenerator from './components/AIQuizGenerator';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import StudyPlanner from './components/StudyPlanner';
import QuestionBank from './components/QuestionBank';
import Leaderboard from './components/Leaderboard';
import AuthModal from './components/AuthModal';
import AppSettingsMenu from './components/AppSettingsMenu';
import { firebaseSignOut } from './services/firebaseService';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  Bot, 
  Settings
} from 'lucide-react';

export default function App() {
  const [currentExam, setCurrentExam] = useState('ssc');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('prepai_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null; // Guest Mode by default
  });

  // Inter-component state sharing
  const [selectedMockTestId, setSelectedMockTestId] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [aiDoubtContext, setAiDoubtContext] = useState('');

  // Sync theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Auth Handlers
  const handleLoginSuccess = (userObj) => {
    setUser(userObj);
    localStorage.setItem('prepai_user', JSON.stringify(userObj));
    if (userObj.targetExam) {
      setCurrentExam(userObj.targetExam);
    }
  };

  const handleLogout = async () => {
    await firebaseSignOut();
    setUser(null);
    localStorage.removeItem('prepai_user');
    setActiveTab('dashboard'); // Return to guest dashboard demo
  };

  // Auth Guard Protector: Prompts login modal if user is Guest
  const requireAuth = (callback) => {
    if (!user) {
      setAuthModalOpen(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  // Nav Handlers with Auth Protection
  const handleStartMockTest = (testId) => {
    if (!requireAuth()) return;
    setSelectedMockTestId(testId);
    setActiveTab('mock-tests');
  };

  const handleSelectTopicNotes = (subjectId, topicId) => {
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(topicId);
    setActiveTab('subjects');
  };

  const handleAskAI = (contextTitle, detail = '') => {
    if (!requireAuth()) return;
    setAiDoubtContext(`${contextTitle}\n${detail}`);
    setActiveTab('ai-tutor');
  };

  const handleGenerateTopicQuiz = (topicId) => {
    if (!requireAuth()) return;
    setActiveTab('ai-quiz');
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#06080D] text-slate-100' : 'bg-[#F8FAFC] text-slate-950'
    }`}>
      {/* Top Clean Navbar (Logo & Goal Exam Selector ONLY) */}
      <Navbar 
        currentExam={currentExam} 
        setCurrentExam={setCurrentExam}
        setActiveTab={(tab) => {
          if (tab === 'mock-tests' || tab === 'ai-tutor' || tab === 'ai-quiz' || tab === 'planner') {
            if (!requireAuth()) return;
          }
          setActiveTab(tab);
        }}
        theme={theme}
      />

      {/* Guest Mode Demo Notice Bar */}
      {!user && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs px-4 py-2 text-center flex items-center justify-center gap-3 shadow-md">
          <span>🎓 Guest Demo View: Previewing GyanSetu PRO. Sign In in Settings menu to unlock Mock Exams & AI Tutor!</span>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="px-3 py-1 bg-slate-950 text-white rounded-lg font-black text-[11px] hover:bg-slate-800 transition-all shrink-0"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Navigation Sidebar (Desktop) */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            if (tab === 'mock-tests' || tab === 'ai-tutor' || tab === 'ai-quiz' || tab === 'planner') {
              if (!requireAuth()) return;
            }
            setActiveTab(tab);
          }} 
          theme={theme}
          user={user}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />

        {/* View Content Area */}
        <main className="flex-1 min-w-0 relative">
          
          {activeTab === 'dashboard' && (
            <Dashboard 
              currentExam={currentExam} 
              setActiveTab={setActiveTab}
              onStartMockTest={handleStartMockTest}
              onSelectTopicNotes={handleSelectTopicNotes}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectsNotes 
              selectedSubjectId={selectedSubjectId}
              selectedTopicId={selectedTopicId}
              onAskAIAboutTopic={(title) => handleAskAI(`Topic Doubt: ${title}`)}
              onGenerateTopicQuiz={handleGenerateTopicQuiz}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'mock-tests' && (
            <MockTestEngine 
              selectedTestId={selectedMockTestId}
              onAskAIAboutQuestion={(q, exp) => handleAskAI(`Question Doubt: ${q}`, exp)}
              onReturnToDashboard={() => setActiveTab('dashboard')}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'ai-tutor' && (
            <AIDoubtSolver 
              initialContext={aiDoubtContext}
              onClearInitialContext={() => setAiDoubtContext('')}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'ai-quiz' && (
            <AIQuizGenerator 
              onAskAIAboutQuestion={(q, exp) => handleAskAI(`Quiz Doubt: ${q}`, exp)}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <PerformanceAnalytics 
              onGenerateQuiz={() => handleGenerateTopicQuiz('all')}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'planner' && (
            <StudyPlanner 
              currentExam={currentExam} 
              theme={theme} 
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'question-bank' && (
            <QuestionBank 
              onAskAIAboutQuestion={(q, exp) => handleAskAI(`PYQ Doubt: ${q}`, exp)}
              theme={theme}
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard theme={theme} user={user} />
          )}

          {activeTab === 'settings' && (
            <AppSettingsMenu 
              user={user}
              onOpenAuthModal={() => setAuthModalOpen(true)}
              onLogout={handleLogout}
              theme={theme}
              setTheme={setTheme}
              setActiveTab={setActiveTab}
              streakDays={user ? user.streak : 14}
            />
          )}

        </main>
      </div>

      {/* 🚀 CLEAN FLOATING MOBILE BOTTOM NAVIGATION BAR */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 border-t flex items-center justify-around backdrop-blur-xl ${
        isDark ? 'bg-slate-950/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-950 shadow-lg'
      }`}>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black ${
            activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black ${
            activeTab === 'subjects' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Notes</span>
        </button>

        <button
          onClick={() => {
            if (!requireAuth()) return;
            setActiveTab('mock-tests');
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-black ${
            activeTab === 'mock-tests' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Tests</span>
        </button>

        <button
          onClick={() => {
            if (!requireAuth()) return;
            setActiveTab('ai-tutor');
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-black ${
            activeTab === 'ai-tutor' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span>AI Tutor</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 text-[10px] font-black ${
            activeTab === 'settings' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </div>

      {/* Login / Register Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
      />
    </div>
  );
}
