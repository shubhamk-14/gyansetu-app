import React, { useState } from 'react';
import { INITIAL_LEADERBOARD } from '../data/examData';
import { 
  Trophy, 
  Award, 
  Flame, 
  Target, 
  Sparkles, 
  User, 
  ChevronRight 
} from 'lucide-react';

export default function Leaderboard() {
  const [filterTab, setFilterTab] = useState('all');

  const topThree = INITIAL_LEADERBOARD.slice(0, 3);
  const remainingRanks = INITIAL_LEADERBOARD.slice(3);

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-r from-gray-900 via-amber-950/40 to-gray-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>All-India Benchmark & Accuracy Sprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            National Rank Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Compare mock scores, accuracy, and streaks with thousands of aspirants across India.
          </p>
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        
        {/* Rank 2 (Silver) */}
        <div className="order-2 md:order-1 glass-panel p-6 rounded-3xl border border-gray-800 text-center space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-400 to-slate-200 text-gray-950 font-black text-xl mx-auto flex items-center justify-center shadow-lg">
            #2
          </div>
          <div>
            <h4 className="text-base font-bold text-white">{topThree[1]?.name}</h4>
            <p className="text-xs text-gray-400">{topThree[1]?.exam}</p>
          </div>
          <div className="p-3 rounded-2xl bg-gray-900 border border-gray-800 space-y-1">
            <span className="text-lg font-black text-gray-200">{topThree[1]?.score} pts</span>
            <div className="text-[10px] text-gray-400 flex items-center justify-center gap-2">
              <span>{topThree[1]?.accuracy}% Acc</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">🔥 {topThree[1]?.streak}d</span>
            </div>
          </div>
        </div>

        {/* Rank 1 (Gold) */}
        <div className="order-1 md:order-2 glass-panel p-6 rounded-3xl border border-amber-500/50 bg-gradient-to-b from-amber-950/30 to-gray-900 text-center space-y-3 relative overflow-hidden glow-amber flex flex-col justify-between md:-translate-y-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-gray-950 font-black text-2xl mx-auto flex items-center justify-center shadow-2xl animate-pulse">
            👑 #1
          </div>
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              {topThree[0]?.badge}
            </span>
            <h4 className="text-lg font-extrabold text-white mt-1">{topThree[0]?.name}</h4>
            <p className="text-xs text-gray-300">{topThree[0]?.exam}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-900 border border-amber-500/30 space-y-1">
            <span className="text-2xl font-black text-amber-400">{topThree[0]?.score} pts</span>
            <div className="text-xs text-gray-300 flex items-center justify-center gap-2">
              <span>{topThree[0]?.accuracy}% Acc</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">🔥 {topThree[0]?.streak}d</span>
            </div>
          </div>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="order-3 glass-panel p-6 rounded-3xl border border-gray-800 text-center space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 to-orange-600 text-white font-black text-xl mx-auto flex items-center justify-center shadow-lg">
            #3
          </div>
          <div>
            <h4 className="text-base font-bold text-white">{topThree[2]?.name}</h4>
            <p className="text-xs text-gray-400">{topThree[2]?.exam}</p>
          </div>
          <div className="p-3 rounded-2xl bg-gray-900 border border-gray-800 space-y-1">
            <span className="text-lg font-black text-gray-200">{topThree[2]?.score} pts</span>
            <div className="text-[10px] text-gray-400 flex items-center justify-center gap-2">
              <span>{topThree[2]?.accuracy}% Acc</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">🔥 {topThree[2]?.streak}d</span>
            </div>
          </div>
        </div>

      </div>

      {/* Ranks Table */}
      <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" />
          National Aspirant Ranks
        </h3>

        <div className="space-y-2.5">
          {remainingRanks.map((r) => (
            <div
              key={r.rank}
              className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-8 text-center text-sm font-black text-gray-400">
                  #{r.rank}
                </span>

                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${r.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {r.name.charAt(0)}
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">{r.name}</h5>
                  <span className="text-[10px] text-gray-400">{r.exam}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="font-extrabold text-indigo-300">{r.score} pts</div>
                  <div className="text-[10px] text-gray-400">{r.accuracy}% Acc</div>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{r.streak}d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
