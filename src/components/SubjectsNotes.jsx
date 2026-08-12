import React, { useState } from 'react';
import { SUBJECTS_TREE } from '../data/examData';
import { 
  BookOpen, 
  BrainCircuit, 
  Calculator, 
  Search, 
  Sparkles, 
  CheckCircle, 
  Bot, 
  Zap, 
  Lightbulb, 
  Bookmark, 
  HelpCircle, 
  ChevronRight,
  Flame,
  Copy,
  Check,
  Download,
  Share2,
  FileText
} from 'lucide-react';

export default function SubjectsNotes({ 
  selectedSubjectId, 
  selectedTopicId, 
  onAskAIAboutTopic, 
  onGenerateTopicQuiz,
  theme
}) {
  const isDark = theme === 'dark';
  const [activeSubjectId, setActiveSubjectId] = useState(selectedSubjectId || SUBJECTS_TREE[0].id);
  const currentSubject = SUBJECTS_TREE.find(s => s.id === activeSubjectId) || SUBJECTS_TREE[0];

  const [activeTopicId, setActiveTopicId] = useState(selectedTopicId || currentSubject.topics[0]?.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [masteredTopics, setMasteredTopics] = useState({ 'coding-decoding': true });
  const [bookmarkedNotes, setBookmarkedNotes] = useState({ 'percentage': true });

  const [copiedStatus, setCopiedStatus] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);

  const activeTopic = currentSubject.topics.find(t => t.id === activeTopicId) || currentSubject.topics[0];

  const filteredTopics = currentSubject.topics.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.notes.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMastery = (topicId) => {
    setMasteredTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleBookmark = (topicId) => {
    setBookmarkedNotes(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const handleCopyNote = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handleDownloadPDF = (title) => {
    setDownloadStatus(true);
    setTimeout(() => {
      setDownloadStatus(false);
      window.print();
    }, 800);
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn max-w-full overflow-hidden">
      
      {/* Student-Friendly Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
        isDark 
          ? 'bg-slate-900 border-indigo-500/30 text-white' 
          : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white shadow-indigo-200'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Quick Exam Revision Notes & Chapter Shortcuts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            High-Yield Exam Notes & Study Bank
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-semibold">
            Read concise chapter notes, copy speed formulas, and save notes for quick revision in UPSC, SSC & Banking exams.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topic or formula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none transition-all shadow-inner ${
              isDark 
                ? 'bg-slate-950 border-slate-750 text-white placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-950 placeholder-slate-500 focus:border-indigo-600'
            }`}
          />
        </div>
      </div>

      {/* Subject Stream Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {SUBJECTS_TREE.map((sub) => {
          const Icon = sub.id === 'reasoning' ? BrainCircuit : sub.id === 'mathematics' ? Calculator : BookOpen;
          const isActive = activeSubjectId === sub.id;

          return (
            <button
              key={sub.id}
              onClick={() => {
                setActiveSubjectId(sub.id);
                setActiveTopicId(sub.topics[0]?.id);
              }}
              className={`px-5 py-3.5 rounded-2xl font-black text-xs transition-all duration-200 shrink-0 flex items-center gap-2.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-[1.02]'
                  : isDark
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{sub.name}</span>
              <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-slate-950 text-white">
                {sub.topics.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Topic Selector Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className={`text-xs font-black uppercase tracking-widest px-1 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            Topics in {currentSubject.name}
          </div>

          <div className="space-y-2.5">
            {filteredTopics.map((topic) => {
              const isSelected = activeTopicId === topic.id;
              const isMastered = masteredTopics[topic.id];
              const isBookmarked = bookmarkedNotes[topic.id];

              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? isDark 
                        ? 'bg-slate-900 border-indigo-500 shadow-xl' 
                        : 'bg-indigo-50 border-indigo-400 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-300 hover:border-indigo-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-black ${
                      isSelected 
                        ? 'text-indigo-900 dark:text-indigo-300' 
                        : isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {topic.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {isMastered && (
                        <CheckCircle className="w-4 h-4 text-indigo-700 dark:text-indigo-400 fill-indigo-100" />
                      )}
                      {isBookmarked && (
                        <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-100 border border-slate-300 dark:border-slate-700">{topic.level}</span>
                    <span className="text-slate-950 dark:text-slate-100">⏱️ {topic.estimatedTime}</span>
                    
                    {/* HIGH CONTRAST MASTERY BADGE */}
                    <span className="text-slate-950 font-black bg-amber-300 px-2 py-0.5 rounded border border-amber-400">
                      Mastery: {topic.mastery}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes Content Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTopic && activeTopic.notes ? (
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
            }`}>
              
              {/* Title & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30">
                      {currentSubject.name}
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>⏱️ {activeTopic.estimatedTime} study read</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {activeTopic.notes.title}
                  </h3>
                </div>

                {/* Student Helpful Tools (Copy Notes & Download PDF) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyNote(`${activeTopic.notes.title}\n\nSummary:\n${activeTopic.notes.summary}\n\nFormulas:\n${(activeTopic.notes.formulas || []).join('\n')}`)}
                    className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-black hover:bg-indigo-100 transition-all flex items-center gap-1.5"
                    title="Copy Note Text"
                  >
                    {copiedStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedStatus ? 'Copied!' : 'Copy Note'}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPDF(activeTopic.notes.title)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-black hover:bg-slate-200 transition-all flex items-center gap-1.5"
                    title="Print / Save PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadStatus ? 'Preparing...' : 'PDF Notes'}</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(activeTopic.id)}
                    className={`p-2.5 rounded-xl border text-xs font-black transition-all ${
                      bookmarkedNotes[activeTopic.id]
                        ? 'bg-amber-100 border-amber-300 text-amber-950'
                        : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-950'
                    }`}
                    title="Bookmark Note"
                  >
                    <Bookmark className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Core Insight Callout */}
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-500/30 text-xs text-slate-950 dark:text-slate-100 leading-relaxed font-bold">
                <strong className="text-indigo-900 dark:text-indigo-300 font-black block mb-1 text-sm">Topic Summary & Exam Relevance:</strong>
                {activeTopic.notes.summary}
              </div>

              {/* Core Rules List */}
              <div className="space-y-3">
                <h4 className={`text-sm font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Core Rules & Exam Fundamentals
                </h4>
                <ul className="space-y-2.5">
                  {activeTopic.notes.keyRules.map((rule, idx) => (
                    <li key={idx} className={`p-3.5 rounded-2xl border text-xs font-bold flex items-start gap-3 leading-relaxed ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-950'
                    }`}>
                      <span className="w-6 h-6 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formulas Box */}
              {activeTopic.notes.formulas && activeTopic.notes.formulas.length > 0 && (
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950 border-indigo-500/40' : 'bg-slate-900 border-slate-950 text-white shadow-xl'
                }`}>
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-300" />
                    Speed Formulas & Math Equations
                  </h4>
                  <div className="space-y-2">
                    {activeTopic.notes.formulas.map((formula, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-emerald-300 font-bold">
                        {formula}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5-SECOND SPEED TRICK - ULTRA-HIGH CONTRAST PITCH BLACK TEXT */}
              {activeTopic.notes.shortcutTricks && (
                <div className="p-5 rounded-2xl bg-amber-300 border-2 border-amber-400 text-slate-950 shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider">
                    <Lightbulb className="w-5 h-5 text-amber-900 fill-amber-900" />
                    <span>⚡ 5-Second Speed Trick / Memory Shortcut</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-950 leading-relaxed font-black">
                    {activeTopic.notes.shortcutTricks}
                  </p>
                </div>
              )}

              {/* Solved Example */}
              {activeTopic.notes.sampleProblem && (
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    Authentic Solved Example
                  </h4>
                  <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-950'}`}>
                    {activeTopic.notes.sampleProblem}
                  </p>
                </div>
              )}

              {/* Bottom Floating Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onAskAIAboutTopic(activeTopic.notes.title)}
                  className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95"
                >
                  <Bot className="w-4.5 h-4.5" />
                  <span>Ask AI Tutor about this Topic</span>
                </button>

                <button
                  onClick={() => onGenerateTopicQuiz(activeTopic.id)}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95"
                >
                  <Zap className="w-4.5 h-4.5 text-amber-300" />
                  <span>Practice 5-Min AI Quiz</span>
                </button>
              </div>

            </div>
          ) : (
            <div className={`p-12 rounded-3xl text-center text-slate-500 space-y-3 border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}>
              <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
              <p className="text-sm font-bold">Select a topic from the left menu to view detailed notes.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
