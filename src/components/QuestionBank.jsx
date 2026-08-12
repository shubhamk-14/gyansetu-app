import React, { useState } from 'react';
import { QUESTION_BANK, EXAMS, SUBJECTS_TREE } from '../data/examData';
import { OFFICIAL_PYQ_DATASET, syncLatestWebPYQs } from '../services/pyqService';
import { 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Bot, 
  Bookmark, 
  ChevronDown, 
  Filter, 
  Sparkles,
  Globe,
  RefreshCw,
  Award,
  BookOpen
} from 'lucide-react';

export default function QuestionBank({ onAskAIAboutQuestion, theme, user, onOpenAuthModal }) {
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('all');
  
  const [questionsList, setQuestionsList] = useState([...OFFICIAL_PYQ_DATASET, ...QUESTION_BANK]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);

  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [bookmarkedQs, setBookmarkedQs] = useState({ 'pyq-ssc-2024-1': true });

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarkedQs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSyncWebPYQs = async () => {
    setIsSyncing(true);
    setSyncStatus(null);

    const result = await syncLatestWebPYQs(selectedSubjectFilter, selectedYearFilter);
    
    // Combine and deduplicate
    setQuestionsList([...result.questions, ...QUESTION_BANK]);
    setSyncStatus(`Successfully synced ${result.count} authentic PYQs from ${result.source} at ${result.syncedAt}!`);
    setIsSyncing(false);
  };

  const filteredQuestions = questionsList.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubjectFilter === 'all' || q.subjectId === selectedSubjectFilter;
    const matchesYear = selectedYearFilter === 'all' || q.year === selectedYearFilter;
    const matchesDifficulty = selectedDifficultyFilter === 'all' || q.difficulty === selectedDifficultyFilter;
    return matchesSearch && matchesSubject && matchesYear && matchesDifficulty;
  });

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
        isDark ? 'bg-slate-900 border-indigo-500/30 text-white' : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black mb-2">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>Live Govt Exam PYQ Web Connection Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Authentic PYQ Question Bank (2021-2024)
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-semibold">
            Real official Previous Year Questions fetched directly from UPSC, SSC CGL, IBPS PO & UPSI exam portals.
          </p>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSyncWebPYQs}
          disabled={isSyncing}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all flex items-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-slate-950 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Live Portals...' : 'Sync Latest Web PYQs'}</span>
        </button>
      </div>

      {/* Sync Status Alert Box */}
      {syncStatus && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-300 text-indigo-950 text-xs font-black flex items-center gap-2 animate-fadeIn shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-700 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Search & Multi-Filters Toolbar */}
      <div className={`p-4 rounded-3xl border space-y-3 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword, topic, or paper shift (e.g. CGL 2024, UPSC 2024, IBPS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs font-black focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-750 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
              }`}
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYearFilter}
            onChange={(e) => setSelectedYearFilter(e.target.value)}
            className={`border rounded-xl px-3.5 py-2.5 text-xs font-black focus:outline-none ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-950'
            }`}
          >
            <option value="all">All Exam Years</option>
            <option value="2024">2024 PYQs</option>
            <option value="2023">2023 PYQs</option>
            <option value="2022">2022 PYQs</option>
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className={`border rounded-xl px-3.5 py-2.5 text-xs font-black focus:outline-none ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-950'
            }`}
          >
            <option value="all">All Subjects</option>
            {SUBJECTS_TREE.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = revealedSolutions[q.id];
          const isBookmarked = bookmarkedQs[q.id];

          return (
            <div key={q.id} className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
            }`}>
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-600 text-white">
                    {q.examName || `Question #${idx + 1}`}
                  </span>
                  {q.year && (
                    <span className="px-2 py-0.5 text-[10px] font-black bg-amber-100 text-amber-950 border border-amber-300 rounded">
                      {q.year} Exam Paper
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {q.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 text-[9px] font-black rounded bg-slate-100 text-slate-950 border border-slate-300">
                      {t}
                    </span>
                  ))}
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked ? 'bg-amber-100 border-amber-300 text-amber-950' : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Question Stem */}
              <div className={`text-sm sm:text-base font-black leading-relaxed whitespace-pre-line ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {q.question}
              </div>

              {/* Radio Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, optIdx) => {
                  const isCorrect = q.correctAnswer === optIdx;

                  return (
                    <div
                      key={optIdx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between font-extrabold ${
                        isRevealed && isCorrect
                          ? 'bg-slate-950 border-slate-950 text-white font-black shadow-md'
                          : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-950'
                      }`}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                      {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Solution Box */}
              {isRevealed && (
                <div className="p-4.5 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-1.5 animate-fadeIn shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <strong className="text-amber-300 font-black">Official Answer Breakdown:</strong>
                    <span className="text-[10px] text-slate-400 font-bold">{q.officialSource || 'Official Govt Key'}</span>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed font-bold pt-1">{q.explanation}</p>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-indigo-900 dark:text-indigo-400 rounded-xl hover:bg-slate-200"
                >
                  {isRevealed ? 'Hide Solution' : 'Reveal Solution & Official Key'}
                </button>

                <button
                  onClick={() => {
                    if (!user) onOpenAuthModal();
                    else onAskAIAboutQuestion(q.question, q.explanation);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow transition-all active:scale-95"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Tutor</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
