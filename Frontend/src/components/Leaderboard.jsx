import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import GlowCard from './ui/GlowCard'; 

const Leaderboard = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await userAPI.getTopCandidates();
        setCandidates(data);
      } catch (err) {
        console.error("Failed to load leaderboard");
      }
    };
    fetchTop();
  }, []);

  if (candidates.length === 0) return null;

  return (
    <GlowCard className="p-5 bg-primary-900/60">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
          <Trophy className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="font-extrabold text-white tracking-tight text-base">Top Performers</h3>
      </div>
      
      <div className="space-y-2">
        {candidates.map((cand, idx) => (
          <div 
            key={cand._id}
            onClick={() => navigate(`/candidate/${cand._id}`)}
            className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/10 hover:scale-[1.02] cursor-pointer transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <span className={`font-extrabold text-xs w-5 h-5 flex items-center justify-center rounded-lg border
                ${idx === 0 ? 'bg-amber-400/10 text-amber-300 border-amber-400/20' : 
                  idx === 1 ? 'bg-slate-400/10 text-slate-300 border-slate-400/20' : 
                  idx === 2 ? 'bg-orange-400/10 text-orange-300 border-orange-400/20' : 
                  'bg-white/5 text-primary-200 border-white/5'}`}>
                {idx + 1}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-xs text-white truncate max-w-[120px] group-hover:text-white transition-colors">{cand.name}</p>
                <p className="text-[10px] text-primary-200 truncate max-w-[120px] font-sans">{cand.email}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-white font-extrabold text-xs bg-white/5 border border-white/10 py-1 px-2 rounded-lg">
                <TrendingUp className="w-3 h-3 text-primary-200" />
                {cand.prediction?.success_score?.toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
};

export default Leaderboard;