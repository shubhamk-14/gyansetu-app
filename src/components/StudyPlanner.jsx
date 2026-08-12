import React, { useState } from 'react';
import { INITIAL_STUDY_PLAN, EXAMS } from '../data/examData';
import { 
  CalendarDays, 
  CheckCircle2, 
  Plus, 
  Flame, 
  Award, 
  Clock, 
  Sparkles, 
  Target,
  Trash2
} from 'lucide-react';

export default function StudyPlanner({ currentExam, theme }) {
  const isDark = theme === 'dark';
  const exam = EXAMS.find(e => e.id === currentExam) || EXAMS[0];
  const [tasks, setTasks] = useState(INITIAL_STUDY_PLAN);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState('Reasoning');
  const [newDuration, setNewDuration] = useState('45 mins');

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const newTask = {
      id: 'task-' + Date.now(),
      topic: newTopic,
      subject: newSubject,
      duration: newDuration,
      target: 'Self Practice',
      status: 'pending'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTopic('');
    setShowAddForm(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  const badges = [
    { title: '14-Day Streak Master', icon: Flame, color: 'text-amber-500', bg: 'bg-amber-100 border-amber-300 dark:bg-amber-500/10 dark:border-amber-500/30' },
    { title: 'Quant Speed Ninja', icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-300 dark:bg-indigo-500/10 dark:border-indigo-500/30' },
    { title: 'Polity Special Scholar', icon: Target, color: 'text-purple-600', bg: 'bg-purple-100 border-purple-300 dark:bg-purple-500/10 dark:border-purple-500/30' }
  ];

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
        isDark ? 'bg-slate-900 border-indigo-500/30 text-white' : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 border-indigo-800 text-white'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Study Schedule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Daily Study Roadmap & Tasks
          </h2>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-semibold">
            Target exam date: <strong>{exam.targetDate}</strong> for {exam.name}. Track your daily targets & earn streak badges.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add Study Goal</span>
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className={`p-5 rounded-2xl border space-y-4 animate-fadeIn ${
          isDark ? 'bg-slate-900 border-indigo-500/40' : 'bg-white border-indigo-300 shadow-lg'
        }`}>
          <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">Create New Study Target</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Topic name (e.g. Syllogism Venn Practice)"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className={`border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
              }`}
            />
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className={`border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
              }`}
            >
              <option value="Reasoning">Reasoning</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Polity">Polity & GS</option>
              <option value="English">English</option>
              <option value="Mock Test">Mock Test</option>
            </select>
            <input
              type="text"
              placeholder="Duration (e.g. 45 mins)"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              className={`border rounded-xl p-3 text-xs font-bold focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
              }`}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-black text-slate-800 dark:text-slate-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* Progress Gauge & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Progress Card */}
        <div className={`p-5 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          <div className="flex items-center justify-between text-xs font-black text-slate-950 dark:text-slate-200">
            <span>Daily Goal Completion</span>
            <span className="text-indigo-900 dark:text-indigo-300 font-black">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-400">{completedCount} of {tasks.length} daily goals completed today.</p>
        </div>

        {/* Badges Grid */}
        <div className={`md:col-span-2 p-5 rounded-2xl border flex items-center justify-between gap-3 overflow-x-auto ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
        }`}>
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className={`p-3 rounded-xl border ${b.bg} flex items-center gap-3 shrink-0`}>
                <div className={`p-2 rounded-lg ${b.color} bg-white shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-950 dark:text-white">{b.title}</h5>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-400">Unlocked Badge</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Daily Tasks List */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-md'
      }`}>
        <h3 className={`text-base font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Today's Task Roadmap
        </h3>

        <div className="space-y-3">
          {tasks.map((task) => {
            const isDone = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isDone
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-500/40'
                      : 'bg-indigo-50 border-indigo-300'
                    : isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-indigo-600 border-indigo-700 text-white'
                        : 'border-slate-400 hover:border-indigo-600'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <h4 className={`text-xs sm:text-sm font-black ${isDone ? 'line-through text-slate-500' : isDark ? 'text-white' : 'text-slate-950'}`}>
                      {task.topic}
                    </h4>
                    <div className={`flex items-center gap-2 text-[10px] font-bold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                      <span className="text-indigo-700 dark:text-indigo-400 font-black">{task.subject}</span>
                      <span>•</span>
                      <span>⏱️ {task.duration}</span>
                      <span>•</span>
                      <span>Target: {task.target}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase ${
                    isDone ? 'bg-slate-950 text-white' : 'bg-amber-200 text-amber-950 border border-amber-300'
                  }`}>
                    {task.status}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
