import React, { useState, useEffect } from 'react';
import {
  Users, Loader2, AlertCircle, RefreshCw, Trash2, Plus, Upload,
  Settings, Briefcase, Save, X, GraduationCap, Trophy
} from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import Leaderboard from '../components/Leaderboard';
import ResumeUploader from '../components/ResumeUploader';
import AboutSection from '../components/AboutSection';
import GlowCard from '../components/ui/GlowCard';
import { candidateAPI, userAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { showToast, confirmAction } = useToast();
  const [candidates, setCandidates] = useState([]);
  const [jobConfig, setJobConfig] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetting, setResetting] = useState(false);

  // Modals State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Weights State for the Modal
  const [editWeights, setEditWeights] = useState({
    experienceWeight: 30,
    skillsWeight: 40,
    educationWeight: 20
  });
  const [savingWeights, setSavingWeights] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parallel fetch for speed
      const [candidatesData, configData] = await Promise.all([
        candidateAPI.getAllCandidates(),
        candidateAPI.getActiveJobConfig()
      ]);

      setCandidates(candidatesData.candidates || candidatesData || []);

      if (configData) {
        setJobConfig(configData);
        // Pre-fill modal with current weights
        if (configData.scoringWeights) {
          setEditWeights(configData.scoringWeights);
        }
      }

    } catch (err) {
      console.error("Dashboard Load Error:", err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleResetJob = () => {
    confirmAction(
      "Destructive Action",
      "This will permanently delete all candidates and active job settings from the AETHER system. This process is irreversible. Are you sure you wish to proceed?",
      async () => {
        setResetting(true);
        try {
          await userAPI.resetJob();
          setCandidates([]);
          setJobConfig(null);
          showToast("Engine and pipeline reset successfully.", "success");
          setTimeout(() => window.location.reload(), 1500); // Reload after showing toast
        } catch (err) {
          showToast("Failed to reset system engine.", "error");
        } finally {
          setResetting(false);
        }
      }
    );
  };

  const handleSaveWeights = async () => {
    setSavingWeights(true);
    try {
      const updatedConfig = await candidateAPI.updateJobConfig({
        scoringWeights: editWeights
      });
      setJobConfig(updatedConfig);
      setIsConfigModalOpen(false);
      showToast("Scoring weights calibrated! Pipeline updated.", "success");
    } catch (err) {
      showToast("Failed to update calibration weights.", "error");
    } finally {
      setSavingWeights(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 relative">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <Users className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Calibrated Pipeline
            </h1>
          </div>
          <p className="text-xs font-semibold text-primary-200 font-sans">
            {candidates.length} Candidate{candidates.length !== 1 ? 's' : ''} active under AETHER intelligence cycles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-primary-950 rounded-xl hover:bg-zinc-200 transition-all text-xs font-extrabold shadow-md shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 text-primary-950" />
            Add Candidate
          </button>

          {/* Job Reset */}
          <button
            onClick={handleResetJob}
            disabled={resetting}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all text-xs font-extrabold hover:scale-[1.02] active:scale-[0.98]"
          >
            {resetting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Reset System
          </button>
        </div>
      </div>

      {/* --- TOP CONTROL DECK --- */}
      {jobConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Active Role Showcase - Spans 2 Columns */}
          <GlowCard className="lg:col-span-2 bg-primary-900/60 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="p-6 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <Briefcase className="w-4 h-4 text-primary-200" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary-200">Active Pipeline Calibration</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">{jobConfig.jobTitle}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-primary-200 font-sans">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 font-semibold">
                    <Briefcase className="w-3.5 h-3.5 text-primary-200" />
                    Experience Target: <strong className="text-white">{jobConfig.goldStandardBenchmark?.avgYearsExperience || 5} Yrs</strong>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5 text-primary-200" />
                    Academic Target: <strong className="text-white">Tier {jobConfig.goldStandardBenchmark?.educationTierTarget || 2}</strong>
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all text-xs font-bold hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Settings className="w-3.5 h-3.5 text-primary-200" />
                  Tune Model Weights
                </button>

                <div className="text-[10px] text-primary-200 font-sans font-semibold">
                  Gold standard references imported successfully
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Quick Metrics Stack - Spans 1 Column */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Metric 1 - Profiles Indexed */}
            <GlowCard className="bg-primary-900/60 border border-white/5 shadow-md flex-1">
              <div className="p-6 flex items-center justify-between h-full">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-200 font-sans leading-none">Profiles Indexed</p>
                  <p className="text-xl font-extrabold text-white tracking-tight">{candidates.length} Scored</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-white flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
              </div>
            </GlowCard>

            {/* Metric 2 - Leading Fit Score */}
            <GlowCard className="bg-primary-900/60 border border-white/5 shadow-md flex-1">
              <div className="p-6 flex items-center justify-between h-full">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-200 font-sans leading-none">Leading Fit Score</p>
                  <p className="text-xl font-extrabold text-white tracking-tight">
                    {candidates.length > 0 ? Math.max(...candidates.map(c => c.prediction?.success_score || 0)).toFixed(0) : 0}%
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-white flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </GlowCard>

            {/* Metric 3 - Pipeline Average Fit */}
            <GlowCard className="bg-primary-900/60 border border-white/5 shadow-md flex-1">
              <div className="p-6 flex items-center justify-between h-full">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-200 font-sans leading-none">Pipeline Average Fit</p>
                  <p className="text-xl font-extrabold text-white tracking-tight">
                    {candidates.length > 0
                      ? (candidates.reduce((sum, c) => sum + (c.prediction?.success_score || 0), 0) / candidates.length).toFixed(0)
                      : 0}%
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-white flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
            </GlowCard>

          </div>
        </div>
      )}

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Main Content: Candidate Grid */}
        <div className="lg:col-span-3">
          {error && (
            <div className="card mb-6 bg-red-950/40 border border-red-500/20 text-center p-4">
              <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-red-300 text-xs font-semibold">{error}</p>
            </div>
          )}

          {candidates.length === 0 ? (
            <div className="card text-center py-16 bg-primary-900/40 border border-white/5 shadow-lg shadow-black/10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl mb-4 shadow-md shadow-black/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">
                No Candidates Yet
              </h3>
              <p className="text-primary-200 text-sm font-medium mb-6 max-w-sm mx-auto">
                Get started by uploading your first resume to the candidate pipeline.
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-primary-950" />
                Upload Resume
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#A3A3A3] font-sans">
                  Pipeline dossiers
                </h3>
                <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-extrabold text-white">
                  RANKED BY MATCH
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidates.map((candidate) => (
                  <CandidateCard key={candidate._id} candidate={candidate} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Leaderboard & Controls */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">

            {/* Top Performers */}
            <Leaderboard />

            {/* Live Model Calibration Console */}
            {jobConfig && (
              <GlowCard className="p-5 bg-primary-900/60 border border-white/5 shadow-lg">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm tracking-tight">Calibration</h4>
                    <p className="text-[9px] text-primary-200 font-medium font-sans">Real-time dynamic weights</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Experience Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-sans">
                      <span className="text-[10px] font-bold text-primary-100">Experience Weight</span>
                      <span className="text-[10px] font-extrabold text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
                        {editWeights.experienceWeight}%
                      </span>
                    </div>
                    <input
                      type="range" min="0" max="100" step="5"
                      value={editWeights.experienceWeight}
                      onChange={(e) => setEditWeights({ ...editWeights, experienceWeight: parseInt(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                    />
                  </div>

                  {/* Skills Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-sans">
                      <span className="text-[10px] font-bold text-primary-100">Skills Weight</span>
                      <span className="text-[10px] font-extrabold text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
                        {editWeights.skillsWeight}%
                      </span>
                    </div>
                    <input
                      type="range" min="0" max="100" step="5"
                      value={editWeights.skillsWeight}
                      onChange={(e) => setEditWeights({ ...editWeights, skillsWeight: parseInt(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                    />
                  </div>

                  {/* Education Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-sans">
                      <span className="text-[10px] font-bold text-primary-100">Education Weight</span>
                      <span className="text-[10px] font-extrabold text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
                        {editWeights.educationWeight}%
                      </span>
                    </div>
                    <input
                      type="range" min="0" max="100" step="5"
                      value={editWeights.educationWeight}
                      onChange={(e) => setEditWeights({ ...editWeights, educationWeight: parseInt(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleSaveWeights}
                    disabled={savingWeights}
                    className="w-full btn-primary py-2 text-xs font-bold flex justify-center items-center gap-1.5 mt-2"
                  >
                    {savingWeights ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Apply Calibration
                  </button>
                </div>
              </GlowCard>
            )}

            {/* Recruiting Info Tip */}
            <div className="card bg-white/5 border border-white/10 p-5 rounded-2xl shadow-lg">
              <h4 className="font-extrabold text-white mb-2 text-sm tracking-tight">Active Engine</h4>
              <p className="text-[11px] text-primary-200 font-sans leading-relaxed">
                Calibration scores are calculated instantly by processing candidate resumes through standard NLP embedding matrices and cross-verifying them against Google Gemini models.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* --- MODALS --- */}

      {/* 1. Resume Uploader */}
      <ResumeUploader
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* 2. Weight Configuration Modal (Feature 3) */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#080808]/90">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 tracking-tight">
                <Settings className="w-4 h-4 text-white" />
                Tune Scoring Model
              </h3>
              <button onClick={() => setIsConfigModalOpen(false)} className="text-primary-200 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-xs font-semibold text-primary-200 leading-relaxed">
                Adjust how much importance the AI gives to each factor when calculating success scores.
              </p>

              {/* Experience Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 font-sans">
                  <span className="text-xs font-bold text-primary-100">Experience Weight</span>
                  <span className="text-[11px] font-extrabold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">{editWeights.experienceWeight}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5"
                  value={editWeights.experienceWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, experienceWeight: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                />
              </div>

              {/* Skills Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 font-sans">
                  <span className="text-xs font-bold text-primary-100">Skills Weight</span>
                  <span className="text-[11px] font-extrabold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">{editWeights.skillsWeight}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5"
                  value={editWeights.skillsWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, skillsWeight: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                />
              </div>

              {/* Education Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 font-sans">
                  <span className="text-xs font-bold text-primary-100">Education Weight</span>
                  <span className="text-[11px] font-extrabold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">{editWeights.educationWeight}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5"
                  value={editWeights.educationWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, educationWeight: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
                />
              </div>

              <div className="bg-white/5 p-4 rounded-xl text-[11px] text-primary-200 border border-white/5 font-medium leading-relaxed font-sans">
                Note: New weights will apply to future predictions. Existing scores remain unchanged until re-predicted.
              </div>
            </div>

            <div className="p-5 border-t border-white/5 flex gap-3 bg-[#080808]/90">
              <button onClick={() => setIsConfigModalOpen(false)} className="btn-secondary flex-1 py-2 text-xs font-bold">Cancel</button>
              <button
                onClick={handleSaveWeights}
                disabled={savingWeights}
                className="btn-primary flex-1 py-2 text-xs font-bold flex justify-center items-center gap-2"
              >
                {savingWeights ? <Loader2 className="w-4 h-4 animate-spin text-primary-950" /> : <Save className="w-4 h-4 text-primary-950" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;