import React from 'react';
import { TrendingUp, Award, FileText } from 'lucide-react';
import GlowCard from './ui/GlowCard';

const AnalyticsChart = ({ prediction }) => {
  if (!prediction) return null;

  // Handle both old and new field names for robustness
  const { success_score, chart_base64, chart_url, analysis } = prediction;
  const chartImage = chart_base64 || chart_url;

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-white bg-white/5 border-white/20';
    if (score >= 60) return 'text-primary-100 bg-white/5 border-white/10';
    return 'text-primary-200 bg-white/5 border-white/5';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Needs Review';
  };

  // Safe score formatting
  const displayScore = typeof success_score === 'number' ? success_score : 0;

  return (
    <div className="space-y-6">
      
      {/* 1. Success Score Card */}
      <GlowCard className="text-center p-6 bg-primary-900/60">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl mb-4 shadow-md shadow-black/25">
          <Award className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xs font-bold text-primary-200 uppercase tracking-wider mb-2">
          Predicted Success Score
        </h3>
        
        <div className={`inline-block px-8 py-3.5 rounded-2xl border mb-2 ${getScoreColor(displayScore)}`}>
          <div className="flex items-baseline justify-center gap-0.5">
            <span className="text-5xl font-extrabold tracking-tight text-white">{displayScore.toFixed(0)}</span>
            <span className="text-sm font-bold text-primary-100">%</span>
          </div>
        </div>
        
        <p className="text-xs font-extrabold mt-1 text-white tracking-wide uppercase">
          {getScoreLabel(displayScore)}
        </p>
      </GlowCard>

      {/* 2. Radar Chart */}
      {chartImage && (
        <GlowCard className="p-6 bg-primary-900/60">
          <div className="flex items-center space-x-2.5 mb-6">
            <div className="p-2 bg-white/5 border border-white/10 rounded-xl shadow-md">
                <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Benchmark Comparison
            </h3>
          </div>
          
          <div className="bg-[#080808]/90 rounded-2xl border border-white/5 p-4 flex justify-center items-center min-h-[250px] shadow-inner shadow-black">
            <img
              src={chartImage.startsWith('data:') ? chartImage : `data:image/png;base64,${chartImage}`}
              alt="Performance Radar Chart"
              className="w-full max-w-[280px] h-auto object-contain filter brightness-95 contrast-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<p class="text-xs text-red-400 font-semibold">Radar data unrendered</p>';
              }}
            />
          </div>
          
          <div className="mt-4 flex justify-center gap-6 text-xs text-primary-200 font-semibold font-sans">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/10 border border-white/50 rounded-sm"></div>
                <span>Candidate</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/50 border border-white rounded-sm"></div>
                <span>Gold Standard</span>
            </div>
          </div>
        </GlowCard>
      )}

      {/* 3. AI Analysis Text (If not handled in parent, we show it here as backup) */}
      {/* Note: In the CandidateDetails.jsx update, we moved the analysis text 
         OUTSIDE this component to be its own card. 
         However, keeping a small fallback here is good practice in case this component is used elsewhere.
      */}
      {/* {analysis && (
        <GlowCard className="p-5 bg-gradient-to-br from-white to-slate-50 border-l-4 border-l-primary-500">
          <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
            <FileText className="w-4 h-4 text-primary-600" />
            AI Insights
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {analysis}
          </p>
        </GlowCard>
      )} */}
      
    </div>
  );
};

export default AnalyticsChart;