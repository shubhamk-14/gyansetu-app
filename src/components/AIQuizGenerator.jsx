import React, { useState } from 'react';
import { EXAMS, SUBJECTS_TREE, QUESTION_BANK } from '../data/examData';
import { 
  Zap, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Bot, 
  Sliders, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function AIQuizGenerator({ onAskAIAboutQuestion, theme }) {
  const isDark = theme === 'dark';
  const [selectedExam, setSelectedExam] = useState('ssc');
  const [selectedSubject, setSelectedSubject] = useState('reasoning');
  const [selectedTopic, setSelectedTopic] = useState('coding-decoding');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [mode, setMode] = useState('instant');

  const [isGenerating, setIsGenerating] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentSubjectObj = SUBJECTS_TREE.find(s => s.id === selectedSubject) || SUBJECTS_TREE[0];

  const handleGenerateQuiz = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let matching = QUESTION_BANK.filter(q => q.subjectId === selectedSubject || q.topicId === selectedTopic);
      if (matching.length === 0) matching = QUESTION_BANK;

      let generated = [];
      for (let i = 0; i < questionCount; i++) {
        const base = matching[i % matching.length];
        generated.push({
          ...base,
          id: `ai-q-${Date.now()}-${i}`,
          question: i > matching.length - 1 ? `[AI Dynamic Variant] ${base.question}` : base.question
        });
      }

      setQuizQuestions(generated);
      setCurrentIdx(0);
      setUserAnswers({});
      setShowExplanation({});
      setIsFinished(false);
      setIsGenerating(false);
    }, 1500);
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    if (mode === 'instant') {
      setShowExplanation(prev => ({ ...prev, [qId]: true }));
    }
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
        isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 border-purple-800 text-white shadow-purple-200'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Dynamic Quiz Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Custom AI Quiz Generator
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-semibold">
            Configure your target exam, subject, difficulty, and generate instant custom practice quizzes.
          </p>
        </div>
      </div>

      {/* Generator Wizard */}
      {!quizQuestions && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <h3 className={`text-base font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Configure Your Quiz Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Target Exam */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>1. Target Exam Stream</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className={`w-full border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
                }`}
              >
                {EXAMS.map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.category})</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>2. Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  const sub = SUBJECTS_TREE.find(s => s.id === e.target.value);
                  if (sub) setSelectedTopic(sub.topics[0]?.id);
                }}
                className={`w-full border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
                }`}
              >
                {SUBJECTS_TREE.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Sub-Topic */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>3. Specific Topic Focus</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className={`w-full border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
                }`}
              >
                {currentSubjectObj.topics.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.level})</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>4. Difficulty Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['Easy', 'Medium', 'Hard', 'Exam Level'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-black border transition-all ${
                      difficulty === d
                        ? 'bg-purple-700 border-purple-800 text-white shadow-md'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>5. Number of Questions</label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setQuestionCount(c)}
                    className={`py-2.5 rounded-xl text-xs font-black border transition-all ${
                      questionCount === c
                        ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {c} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Mode */}
            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>6. Answer Feedback Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('instant')}
                  className={`p-3 rounded-xl border text-left text-xs font-black transition-all ${
                    mode === 'instant'
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-950 font-black'
                      : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300'
                      : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="font-black text-slate-950 dark:text-white">Instant Solution Mode</div>
                  <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5 font-bold">Reveals step-by-step logic right after picking option</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('timed')}
                  className={`p-3 rounded-xl border text-left text-xs font-black transition-all ${
                    mode === 'timed'
                      ? 'bg-indigo-600 text-white font-black'
                      : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300'
                      : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="font-black text-slate-950 dark:text-white">Test Challenge Mode</div>
                  <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5 font-bold">No hints until quiz completion</div>
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleGenerateQuiz}
              disabled={isGenerating}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                  <span>Synthesizing High-Yield Questions...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>Generate AI Quiz Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Quiz Active Player */}
      {quizQuestions && !isFinished && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-indigo-600 text-white rounded">
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
              <h4 className={`text-sm font-black mt-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>Topic: {selectedTopic}</h4>
            </div>

            <button
              onClick={() => setQuizQuestions(null)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-800 dark:text-slate-300 rounded-xl"
            >
              Exit Quiz
            </button>
          </div>

          {/* Current Question Stem */}
          <div className="space-y-4">
            <div className={`text-sm sm:text-base font-black leading-relaxed ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {quizQuestions[currentIdx].question}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {quizQuestions[currentIdx].options.map((opt, optIdx) => {
                const qId = quizQuestions[currentIdx].id;
                const isSelected = userAnswers[qId] === optIdx;
                const isCorrectOpt = quizQuestions[currentIdx].correctAnswer === optIdx;
                const isRevealed = mode === 'instant' && showExplanation[qId];

                let optionStyle = 'bg-slate-50 border-slate-300 text-slate-950 font-black hover:bg-indigo-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200';
                if (isRevealed) {
                  if (isCorrectOpt) optionStyle = 'bg-slate-950 text-white font-black border-slate-950 shadow-md';
                  else if (isSelected && !isCorrectOpt) optionStyle = 'bg-rose-600 text-white font-black border-rose-700';
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-600 text-white font-black border-indigo-700 shadow-md';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleOptionSelect(qId, optIdx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <span className="text-xs sm:text-sm">{String.fromCharCode(65 + optIdx)}. {opt}</span>
                    {isRevealed && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />}
                    {isRevealed && isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-white shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instant Explanation Box */}
          {mode === 'instant' && showExplanation[quizQuestions[currentIdx].id] && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-1.5 animate-fadeIn">
              <strong className="text-amber-300 font-black block">AI Solution Explanation:</strong>
              <p className="whitespace-pre-line leading-relaxed font-bold">{quizQuestions[currentIdx].explanation}</p>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-800 dark:text-slate-300 rounded-xl disabled:opacity-40"
            >
              Previous
            </button>

            {currentIdx < quizQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white text-xs font-black rounded-xl shadow"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg"
              >
                Finish Quiz & View Score
              </button>
            )}
          </div>

        </div>
      )}

      {/* Quiz Finished Summary */}
      {isFinished && quizQuestions && (
        <div className={`p-8 rounded-3xl border text-center space-y-6 animate-fadeIn ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white border border-indigo-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>AI Quiz Completed!</h3>
            <p className={`text-xs font-bold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Topic: {selectedTopic}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 max-w-sm mx-auto shadow-xl">
            <span className="text-xs uppercase text-slate-400 font-black block">Your Final Score</span>
            <div className="text-4xl font-black text-amber-300 mt-1">
              {calculateScore()} / {quizQuestions.length}
            </div>
            <span className="text-xs text-slate-300 mt-2 block font-black">
              Accuracy: {Math.round((calculateScore() / quizQuestions.length) * 100)}%
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setQuizQuestions(null)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow"
            >
              Generate Another Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
