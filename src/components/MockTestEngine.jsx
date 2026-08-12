import React, { useState, useEffect } from 'react';
import { MOCK_TESTS, QUESTION_BANK, EXAMS } from '../data/examData';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  Calculator, 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Bot, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Play
} from 'lucide-react';

export default function MockTestEngine({ 
  selectedTestId, 
  onAskAIAboutQuestion, 
  onReturnToDashboard,
  theme
}) {
  const isDark = theme === 'dark';
  const [activeTestId, setActiveTestId] = useState(selectedTestId || MOCK_TESTS[0].id);
  const testData = MOCK_TESTS.find(t => t.id === activeTestId) || MOCK_TESTS[0];
  const examRules = EXAMS.find(e => e.id === testData.examId) || EXAMS[0];

  const mappedQuestions = (testData.questions || [])
    .map(qId => typeof qId === 'string' ? QUESTION_BANK.find(q => q.id === qId) : qId)
    .filter(Boolean);

  const testQuestions = mappedQuestions.length > 0 ? mappedQuestions : QUESTION_BANK;

  const [examStatus, setExamStatus] = useState('lobby');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({ [testQuestions[0]?.id]: true });
  
  const [timeLeft, setTimeLeft] = useState(testData.durationMinutes * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');
  const [calcInput, setCalcInput] = useState('');

  useEffect(() => {
    let timer = null;
    if (examStatus === 'active' && !isTimerPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStatus, isTimerPaused, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setExamStatus('active');
    setTimeLeft(testData.durationMinutes * 60);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({ [testQuestions[0]?.id]: true });
  };

  const handleSelectOption = (optionIndex) => {
    const qId = testQuestions[currentQIndex].id;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleClearSelection = () => {
    const qId = testQuestions[currentQIndex].id;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleMarkForReview = () => {
    const qId = testQuestions[currentQIndex].id;
    setMarkedForReview(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQIndex(index);
    const qId = testQuestions[index].id;
    setVisitedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < testQuestions.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      handleJumpToQuestion(currentQIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    setExamStatus('completed');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const marksPerQ = examRules?.marksPerQuestion || 2;
    const negPenalty = examRules?.negativeMarking || 0.5;

    testQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const positiveMarks = correctCount * marksPerQ;
    const negativePenalty = incorrectCount * negPenalty;
    const netScore = Math.max(0, +(positiveMarks - negativePenalty).toFixed(2));
    const maxScore = testQuestions.length * marksPerQ;
    const accuracy = correctCount + incorrectCount > 0 
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
      : 0;

    return {
      correctCount,
      incorrectCount,
      unattemptedCount,
      positiveMarks,
      negativePenalty,
      netScore,
      maxScore,
      accuracy
    };
  };

  const results = examStatus === 'completed' ? calculateResults() : null;

  // LOBBY VIEW
  if (examStatus === 'lobby') {
    return (
      <div className="space-y-6 pb-8 animate-fadeIn">
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
          isDark ? 'bg-slate-900 border-indigo-500/30 text-white' : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white'
        }`}>
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase border border-white/30">
              Exam Simulation Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {testData.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-semibold">
              Standard competitive exam environment for {examRules.name}. Simulates authentic computer-based examination marking & timing rules.
            </p>
          </div>
        </div>

        {/* Available Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {MOCK_TESTS.map((t) => {
            const isSelected = t.id === activeTestId;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTestId(t.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? isDark 
                      ? 'bg-slate-900 border-indigo-500 shadow-xl' 
                      : 'bg-indigo-50 border-indigo-400 shadow-md'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-950 dark:bg-slate-800 dark:text-indigo-300">
                    {t.difficulty}
                  </span>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-400">⏱️ {t.durationMinutes} mins</span>
                </div>

                <div>
                  <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{t.title}</h4>
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">{t.subject}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-black text-slate-700 dark:text-slate-400">
                  <span>{t.questions.length} MCQs</span>
                  <span>Avg: {t.avgScore} pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Test Rules & Launch */}
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <h3 className={`text-lg font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            Official Instructions & Rules
          </h3>

          {/* ULTRA-HIGH CONTRAST METRIC CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            {/* Box 1: Total Duration */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300 shadow-xs'}`}>
              <span className={`text-[10px] uppercase font-black block ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Total Duration</span>
              <strong className={`text-xl font-black block mt-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {testData.durationMinutes} Minutes
              </strong>
            </div>

            {/* Box 2: Total Questions */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300 shadow-xs'}`}>
              <span className={`text-[10px] uppercase font-black block ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Total Questions</span>
              <strong className={`text-xl font-black block mt-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {testQuestions.length} Questions
              </strong>
            </div>

            {/* Box 3: Correct Answer */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50 border-indigo-200 shadow-xs'}`}>
              <span className={`text-[10px] uppercase font-black block ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Correct Answer</span>
              <strong className="text-xl font-black block mt-1 text-indigo-600 dark:text-indigo-400">
                +{examRules?.marksPerQuestion || 2} Marks
              </strong>
            </div>

            {/* Box 4: Negative Penalty */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-rose-50 border-rose-200 shadow-xs'}`}>
              <span className={`text-[10px] uppercase font-black block ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>Negative Penalty</span>
              <strong className="text-xl font-black block mt-1 text-rose-600 dark:text-rose-400">
                -{examRules?.negativeMarking || 0.5} Penalty
              </strong>
            </div>

          </div>

          <div className={`space-y-2 text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-950'}`}>
            <p>• The clock will be set on the top right server timer. Test auto-submits when time expires.</p>
            <p>• You can use the <strong>On-Screen Calculator</strong> and <strong>Scratchpad</strong> for rough calculations.</p>
            <p>• You can jump between questions anytime using the Question Palette on the right.</p>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleStartTest}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Timed Exam</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM VIEW
  if (examStatus === 'active') {
    const currentQ = testQuestions[currentQIndex];
    const isSelected = userAnswers[currentQ.id] !== undefined;
    const isMarked = !!markedForReview[currentQ.id];

    return (
      <div className="space-y-4 pb-8 animate-fadeIn">
        
        {/* Top Control Bar */}
        <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 sticky top-16 z-20 shadow-xl backdrop-blur-lg ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <div>
            <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{testData.title}</h3>
            <p className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Question {currentQIndex + 1} of {testQuestions.length}</p>
          </div>

          {/* Tools & Timer */}
          <div className="flex items-center gap-3">
            
            {/* Calculator Toggle */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-900 dark:text-slate-200 rounded-xl flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Calculator</span>
            </button>

            {/* Scratchpad Toggle */}
            <button
              onClick={() => setShowScratchpad(!showScratchpad)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-900 dark:text-slate-200 rounded-xl flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Scratchpad</span>
            </button>

            {/* Live Timer */}
            <div className="px-4 py-1.5 bg-indigo-900 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-md">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Finish & Submit Button */}
            <button
              onClick={handleSubmitTest}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow transition-all"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Modal Calculator */}
        {showCalculator && (
          <div className="p-4 bg-slate-900 border border-indigo-500/40 rounded-2xl w-64 fixed bottom-6 right-6 z-50 shadow-2xl space-y-3 text-white">
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Calculator className="w-4 h-4 text-indigo-400" /> Calculator</span>
              <button onClick={() => setShowCalculator(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <input
              type="text"
              readOnly
              value={calcInput}
              placeholder="0"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-right font-mono text-sm text-amber-300 font-bold focus:outline-none"
            />
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(btn => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === 'C') setCalcInput('');
                    else if (btn === '=') {
                      try { setCalcInput(Function('"use strict";return (' + calcInput + ')')().toString()); } catch { setCalcInput('Error'); }
                    } else setCalcInput(prev => prev + btn);
                  }}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white border border-slate-700 active:scale-95"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Scratchpad */}
        {showScratchpad && (
          <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl w-80 fixed bottom-6 right-72 z-50 shadow-2xl space-y-3 text-white">
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-amber-400" /> Rough Scratchpad</span>
              <button onClick={() => setShowScratchpad(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <textarea
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
              placeholder="Jot down rough math steps here..."
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

        {/* Main Grid: Question stem & Right Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Question Stem (8 cols) */}
          <div className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
          }`}>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-black text-xs">
                    Q{currentQIndex + 1} of {testQuestions.length}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Difficulty: {currentQ.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  {(currentQ.tags || ['PYQ']).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-black bg-indigo-100 text-indigo-950 border border-indigo-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <div className={`text-sm sm:text-base font-black leading-relaxed whitespace-pre-line ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {currentQ.question}
              </div>

              {/* Radio Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isChecked = userAnswers[currentQ.id] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        isChecked
                          ? 'bg-indigo-600 text-white font-black border-indigo-700 shadow-md'
                          : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-300 text-slate-950 hover:bg-indigo-50 font-bold'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-black shrink-0 ${
                        isChecked ? 'bg-white text-indigo-900 border-white' : 'border-slate-400 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-xs sm:text-sm">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMarkForReview}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-black transition-all ${
                    isMarked
                      ? 'bg-purple-900 text-white border-purple-950'
                      : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300'
                  }`}
                >
                  {isMarked ? '★ Marked for Review' : '☆ Mark for Review'}
                </button>

                <button
                  onClick={handleClearSelection}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-700 dark:text-slate-400 rounded-xl"
                >
                  Clear Option
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-950 disabled:opacity-40 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-800 dark:text-slate-300 rounded-xl"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQIndex === testQuestions.length - 1}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow transition-all"
                >
                  Save & Next
                </button>
              </div>
            </div>

          </div>

          {/* Right Question Palette (4 cols) */}
          <div className={`lg:col-span-4 p-5 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
          }`}>
            <h4 className={`text-xs font-black uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-950'
            }`}>
              Question Palette Grid
            </h4>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-800 dark:text-slate-300 font-black">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-700"></span> Answered</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-600"></span> Not Answered</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-700"></span> Marked Review</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-400"></span> Not Visited</div>
            </div>

            {/* Question Boxes Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {testQuestions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isMrk = !!markedForReview[q.id];
                const isVis = !!visitedQuestions[q.id];
                const isCurrent = currentQIndex === idx;

                let colorStyle = 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-300 font-bold';
                if (isMrk) colorStyle = 'bg-purple-800 text-white font-black';
                else if (isAns) colorStyle = 'bg-indigo-700 text-white font-black';
                else if (isVis) colorStyle = 'bg-rose-600 text-white font-black';

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-10 rounded-xl text-xs flex items-center justify-center transition-all ${colorStyle} ${
                      isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleSubmitTest}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow transition-all"
              >
                Submit Exam Now
              </button>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // POST-EXAM SCORECARD & REVIEW VIEW
  if (examStatus === 'completed' && results) {
    return (
      <div className="space-y-6 pb-8 animate-fadeIn">
        
        {/* Scorecard Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-indigo-600 border border-indigo-400 mx-auto flex items-center justify-center text-white">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Exam Submission Summary
            </h2>
            <p className="text-xs text-slate-300 mt-1 font-semibold">{testData.title}</p>
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Net Final Score</span>
            <div className="text-3xl font-black text-indigo-900 dark:text-indigo-400 mt-1">{results.netScore} / {results.maxScore}</div>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Accuracy Rate</span>
            <div className="text-3xl font-black text-indigo-900 dark:text-indigo-400 mt-1">{results.accuracy}%</div>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Correct Answers</span>
            <div className="text-3xl font-black text-indigo-900 dark:text-indigo-400 mt-1">{results.correctCount} / {testQuestions.length}</div>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'}`}>
            <span className="text-[10px] font-black uppercase text-slate-700 dark:text-slate-400">Negative Penalty</span>
            <div className="text-3xl font-black text-rose-700 dark:text-rose-400 mt-1">-{results.negativePenalty} pts</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Question Solution Breakdown</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartTest}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-900 dark:text-slate-300 rounded-xl flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-attempt Test</span>
            </button>
            <button
              onClick={() => setExamStatus('lobby')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl"
            >
              Back to Test Lobby
            </button>
          </div>
        </div>

        {/* Detailed Solutions List */}
        <div className="space-y-4">
          {testQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isUnattempted = userAns === undefined;

            return (
              <div 
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                  isCorrect
                    ? 'border-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/20'
                    : isUnattempted
                    ? 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900'
                    : 'border-rose-300 bg-rose-50/60 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-800 dark:text-indigo-400">
                    Question {idx + 1}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-black rounded uppercase ${
                    isCorrect
                      ? 'bg-indigo-900 text-white'
                      : isUnattempted
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {isCorrect ? 'Correct (+2)' : isUnattempted ? 'Unattempted (0)' : 'Incorrect (-0.5)'}
                  </span>
                </div>

                <div className={`text-sm font-black leading-relaxed ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userAns === optIdx;
                    const isRightOpt = q.correctAnswer === optIdx;

                    let optBg = 'bg-slate-100 border-slate-300 text-slate-950 font-bold dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300';
                    if (isRightOpt) optBg = 'bg-indigo-900 border-indigo-950 text-white font-black shadow-sm';
                    else if (isUserPick && !isRightOpt) optBg = 'bg-rose-600 border-rose-700 text-white font-black';

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border ${optBg} flex items-center justify-between`}>
                        <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                        {isRightOpt && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                        {isUserPick && !isRightOpt && <XCircle className="w-4 h-4 text-white shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs space-y-1.5">
                  <strong className="text-amber-300 font-black block">Step-by-Step Explanation:</strong>
                  <p className="whitespace-pre-line leading-relaxed font-bold">{q.explanation}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => onAskAIAboutQuestion(q.question, q.explanation)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Ask AI Tutor to Explain Further</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    );
  }

  return null;
}
