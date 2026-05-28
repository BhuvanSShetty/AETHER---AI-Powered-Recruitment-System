import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Briefcase,
  GraduationCap,
  Sparkles,
  Loader2,
  AlertCircle,
  Trash2,
  FileText,
  Star,
  CheckCircle
} from 'lucide-react';
import { candidateAPI } from '../services/api';
import AnalyticsChart from '../components/AnalyticsChart';
import GlowCard from '../components/ui/GlowCard';
import { useToast } from '../context/ToastContext';

const CandidateDetails = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState(null);

  // --- New State for Rating ---
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await candidateAPI.getCandidateById(id);

      // Handle structure variations just in case
      const candidateData = data.candidate || data;
      setCandidate(candidateData);

      // If prediction exists on load, set it
      if (candidateData.prediction && candidateData.prediction.success_score) {
        setPrediction(candidateData.prediction);
      }

      // --- New: Load Existing Rating ---
      if (candidateData.hr_rating) {
        setRating(candidateData.hr_rating);
        setRatingSuccess(true);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load candidate');
      console.error('Error fetching candidate:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePrediction = async () => {
    try {
      setPredicting(true);

      // API call to generate new prediction
      const updatedCandidate = await candidateAPI.generatePrediction(id);

      if (updatedCandidate && updatedCandidate.prediction) {
        setPrediction(updatedCandidate.prediction);
        setCandidate(updatedCandidate); // Update full candidate state
      } else {
        setError('Prediction generated but no data returned');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate prediction');
      console.error('Error generating prediction:', err);
    } finally {
      setPredicting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await candidateAPI.deleteCandidate(id);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete candidate');
      }
    }
  };

  // --- New: Submit Rating Handler ---
  const submitRating = async (selectedRating) => {
    if (ratingSuccess) return; // Prevent re-rating if already done (optional)

    setIsRatingSubmitting(true);
    try {
      await candidateAPI.rateCandidate(id, selectedRating);
      setRating(selectedRating);
      setRatingSuccess(true);
      showToast("Candidate rating submitted successfully!", "success");
    } catch (err) {
      console.error("Rating failed", err);
      showToast("Failed to submit rating. Please try again.", "error");
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-primary-200">Loading candidate dossier...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <GlowCard className="max-w-md text-center p-8 bg-primary-900/60 border border-white/10">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-extrabold text-white mb-2 tracking-tight">
            Error Loading Candidate
          </h2>
          <p className="text-xs font-semibold text-primary-200 mb-6 leading-relaxed">{error || 'Candidate not found'}</p>
          <button onClick={() => navigate('/')} className="btn-primary w-full text-xs">
            Back to Dashboard
          </button>
        </GlowCard>
      </div>
    );
  }

  const educationTierLabels = {
    1: 'Top Tier University',
    2: 'Mid Tier University',
    3: 'Entry Level Institution'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 relative">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[10px] font-extrabold text-primary-200 hover:text-white transition-all uppercase tracking-widest mb-6 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-primary-200" /> Return to Dashboard
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              {candidate.name}
            </h1>
            <div className="flex items-center space-x-2 text-xs font-medium text-primary-200">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-sans">{candidate.email}</span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 p-2.5 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/5 transition-all"
            title="Delete Candidate"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidate Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/5">
            <h2 className="text-base font-extrabold text-white mb-4 tracking-tight">
              Dossier Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3.5 bg-white/5 border border-white/5 p-4 rounded-xl shadow-md">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-primary-200 uppercase tracking-widest">Experience</p>
                  <p className="font-bold text-sm text-white mt-0.5">
                    {candidate.experience_years || 0} Years
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-white/5 border border-white/5 p-4 rounded-xl shadow-md">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-primary-200 uppercase tracking-widest">Education</p>
                  <p className="font-bold text-sm text-white mt-0.5 truncate max-w-[180px]">
                    {educationTierLabels[candidate.education_tier] || 'Not Specified'}
                  </p>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Summary */}
          {candidate.summary && (
            <GlowCard className="p-6 bg-primary-900/60 border border-white/5">
              <h2 className="text-base font-extrabold text-white mb-4 tracking-tight">
                Professional Dossier Summary
              </h2>
              <p className="text-primary-100 leading-relaxed font-medium text-sm">
                {candidate.summary}
              </p>
            </GlowCard>
          )}

          {/* Skills */}
          {candidate.skills && candidate.skills.length > 0 && (
            <GlowCard className="p-6 bg-primary-900/60 border border-white/5">
              <h2 className="text-base font-extrabold text-white mb-4 tracking-tight">
                Technical Capabilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white/5 text-primary-50 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlowCard>
          )}

          {/* Additional Data */}
          {candidate.parsed_data && (
            <GlowCard className="p-6 bg-primary-900/60 border border-white/5">
              <h2 className="text-base font-extrabold text-white mb-4 tracking-tight">
                Raw Extracted Data
              </h2>
              <pre className="bg-[#080808]/90 p-4 rounded-xl text-[11px] text-primary-200 border border-white/5 overflow-auto max-h-60 shadow-inner font-mono leading-relaxed">
                {JSON.stringify(candidate.parsed_data, null, 2)}
              </pre>
            </GlowCard>
          )}
        </div>

        {/* Right Column - Prediction & Rating */}
        <div className="lg:col-span-1 space-y-6">

          {/* --- NEW: RATING CARD --- */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <h3 className="text-base font-extrabold text-white mb-2 flex items-center gap-2.5 tracking-tight">
              <Star className={`w-4 h-4 ${ratingSuccess ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-primary-300'}`} />
              HR Calibration Feedback
            </h3>
            <p className="text-xs text-primary-200 mb-4 font-sans leading-relaxed">
              Rate this candidate (1-10) to help calibrating the custom AI scoring profile.
            </p>

            {ratingSuccess ? (
              <div className="flex flex-col items-center justify-center p-5 bg-white/5 rounded-2xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                <CheckCircle className="w-10 h-10 text-white mb-2.5" />
                <p className="text-sm font-extrabold text-white">Calibration Saved!</p>
                <p className="text-xs text-primary-200 mt-1 font-sans">You rated candidate <strong>{rating} / 10</strong></p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                {/* 10 Star Rating Component */}
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[...Array(10)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => submitRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        disabled={isRatingSubmitting}
                        className="focus:outline-none transition-transform hover:scale-[1.15] p-0.5"
                      >
                        <Star
                          className={`w-4 h-4 ${starValue <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-white/20'
                            } transition-colors duration-200`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] font-bold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-xl tracking-wide">
                  {hoverRating > 0 ? `Rating: ${hoverRating} / 10` : 'Calibrate Score'}
                </div>
              </div>
            )}
          </GlowCard>

          {/* Main Prediction Card */}
          {!prediction ? (
            <GlowCard className="text-center p-6 bg-primary-900/60 border border-white/5 shadow-lg shadow-black/25">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl mb-4 shadow-md shadow-black/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2 tracking-tight">
                AI Match Score
              </h3>
              <p className="text-primary-200 text-xs mb-6 font-sans leading-relaxed">
                Generate an AI-powered success prediction based on this candidate's profile compared against your Active Job Config.
              </p>
              <button
                onClick={handleGeneratePrediction}
                disabled={predicting}
                className="btn-primary w-full text-sm text-primary-950 font-bold py-2.5 flex items-center justify-center gap-2"
              >
                {predicting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-primary-950" />
                    <span>Analyzing Dossier...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-primary-950" />
                    <span>Generate AI Prediction</span>
                  </>
                )}
              </button>
            </GlowCard>
          ) : (
            <>
              {/* Chart Component */}
              <AnalyticsChart prediction={prediction} />

              {/* Analysis Text Component - Only shows if analysis exists */}
              {prediction.analysis && (
                <GlowCard className="p-5 bg-primary-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <h4 className="flex items-center gap-2 font-extrabold text-white mb-3 text-sm tracking-tight">
                    <FileText className="w-4 h-4 text-primary-200" />
                    AI Qualitative Summary
                  </h4>
                  <p className="text-xs font-medium text-primary-100 leading-relaxed font-sans">
                    {prediction.analysis}
                  </p>
                </GlowCard>
              )}

              {/* Re-run Button */}
              <button
                onClick={handleGeneratePrediction}
                disabled={predicting}
                className="w-full py-2.5 text-xs text-primary-200 hover:text-white hover:bg-white/5 border border-white/5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {predicting ? <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
                Regenerate Match Score
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;