import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import GlowCard from './ui/GlowCard'; 

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();

  const educationTierLabels = {
    1: 'Top Tier',
    2: 'Mid Tier',
    3: 'Entry Level'
  };

  return (
    <GlowCard 
      onClick={() => navigate(`/candidate/${candidate._id}`)}
      className="cursor-pointer h-full p-6 transition-all duration-300 hover:scale-[1.01] hover:border-white/10 group" 
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-white transition-colors duration-200">
              {candidate.name || 'Unknown Candidate'}
            </h3>
            {candidate.prediction?.success_score !== undefined && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-white/5 border border-white/10 text-white shadow-sm font-sans tracking-wide">
                {candidate.prediction.success_score.toFixed(0)}% Fit
              </span>
            )}
          </div>
          <p className="text-xs text-primary-200 font-medium font-sans">{candidate.email}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-primary-300 group-hover:translate-x-0.5 transition-transform duration-200" />
      </div>

      <div className="flex items-center space-x-4 mb-4 text-xs text-primary-100 font-semibold font-sans">
        <div className="flex items-center space-x-1.5 bg-white/5 border border-white/5 py-1 px-2.5 rounded-lg">
          <Briefcase className="w-3.5 h-3.5 text-primary-200" />
          <span>{candidate.experience_years || 0} Yrs Experience</span>
        </div>
        {candidate.education_tier && (
          <div className="flex items-center space-x-1.5 bg-white/5 border border-white/5 py-1 px-2.5 rounded-lg">
            <GraduationCap className="w-3.5 h-3.5 text-primary-200" />
            <span>{educationTierLabels[candidate.education_tier]}</span>
          </div>
        )}
      </div>

      {candidate.skills && candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-white/5 text-primary-50 rounded-xl text-[11px] font-bold border border-white/10 hover:bg-white/10 transition-colors"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span className="px-2.5 py-1 bg-white/10 text-primary-100 rounded-xl text-[11px] font-bold border border-white/5">
              +{candidate.skills.length - 5} More
            </span>
          )}
        </div>
      )}

      {candidate.summary && (
        <p className="mt-4 text-xs text-primary-200 font-medium leading-relaxed line-clamp-2">
          {candidate.summary}
        </p>
      )}
    </GlowCard>
  );
};

export default CandidateCard;