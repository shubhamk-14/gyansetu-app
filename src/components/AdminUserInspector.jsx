import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  X, 
  ShieldCheck, 
  Database, 
  Calendar, 
  Target, 
  Sparkles, 
  Flame, 
  CheckCircle2,
  LogIn
} from 'lucide-react';

export default function AdminUserInspector({ isOpen, onClose, onSwitchUser, theme }) {
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadRemoteUsers();
    }
  }, [isOpen]);

  const loadRemoteUsers = () => {
    try {
      const saved = localStorage.getItem('prepai_remote_firestore_users');
      const parsed = saved ? JSON.parse(saved) : {};
      
      let list = Object.values(parsed).map(u => u.userProfile);
      
      if (list.length === 0) {
        list = [
          { uid: 'u1', name: 'Shubham', email: 'shubham@gmail.com', targetExam: 'ssc', avatar: 'SK', streak: 14, readinessScore: 78, createdAt: '2026-08-10', provider: 'firebase' },
          { uid: 'u2', name: 'Priya Verma', email: 'priya.upsc@gmail.com', targetExam: 'upsc', avatar: 'PV', streak: 35, readinessScore: 94, createdAt: '2026-08-01', provider: 'google-oauth2' },
          { uid: 'u3', name: 'Vikram Singh', email: 'vikram.bank@gmail.com', targetExam: 'banking', avatar: 'VS', streak: 28, readinessScore: 88, createdAt: '2026-08-05', provider: 'firebase' }
        ];
      }
      setUsersList(list);
    } catch {
      setUsersList([]);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.targetExam?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border shadow-2xl relative space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-950'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black" style={{ color: isDark ? '#FFFFFF' : '#020617' }}>
                User Database Inspector
              </h3>
              <p className="text-xs font-bold text-slate-500">
                View all registered aspirants, target exam streams, streaks & readiness scores.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search registered user by name, email, or exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-2xl pl-10 pr-4 py-2.5 text-xs font-black focus:outline-none ${
              isDark ? 'bg-slate-950 border-slate-750 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 focus:border-indigo-600'
            }`}
          />
        </div>

        {/* Users Table */}
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
            Registered Aspirants ({filteredUsers.length})
          </div>

          <div className="space-y-2.5">
            {filteredUsers.map((u) => (
              <div
                key={u.uid || u.email}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-md shrink-0">
                    {u.avatar || u.name?.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <h4 className="text-sm font-black" style={{ color: isDark ? '#FFFFFF' : '#020617' }}>
                      {u.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-500">{u.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 text-[9px] font-black rounded uppercase bg-indigo-100 text-indigo-950 border border-indigo-300">
                        {u.targetExam?.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        Provider: {u.provider || 'firebase'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <div className="font-black text-indigo-700 dark:text-indigo-400">Readiness: {u.readinessScore || 78}%</div>
                    <div className="text-[10px] font-bold text-amber-600">Streak: {u.streak || 14} Days 🔥</div>
                  </div>

                  <button
                    onClick={() => {
                      onSwitchUser(u);
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs shadow transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login as User</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
