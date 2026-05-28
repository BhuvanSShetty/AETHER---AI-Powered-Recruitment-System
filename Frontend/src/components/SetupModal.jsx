import React, { useState } from 'react';
import { Key, Lock, Loader2, CheckCircle } from 'lucide-react';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SetupModal = () => {
  const { showKeyModal, updateApiKeyStatus } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!showKeyModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await userAPI.saveApiKey(apiKey);
      updateApiKeyStatus();
    } catch (err) {
      setError('Failed to save API Key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-8 m-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl mb-4 shadow-md shadow-black/25">
            <Key className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Setup API Calibration Key</h2>
          <p className="text-xs font-semibold text-primary-200 mt-2 font-sans">
            AETHER calibrated models use Google Gemini. Please enter your API Key to initialize pipeline scoring.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-primary-200" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Gemini API Key here"
              className="w-full pl-11 pr-4 py-3 bg-[#0F0F0F] text-white border border-white/10 rounded-xl focus:border-white focus:ring-0 outline-none transition-all placeholder-zinc-600 font-medium text-xs font-sans"
              required
            />
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/40 text-red-300 border border-red-500/20 text-xs font-bold rounded-xl font-sans">
              {error}
            </div>
          )}

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-[11px] text-primary-200 font-medium leading-relaxed font-sans">
            <p className="flex items-center gap-1.5 mb-1.5 font-bold text-white uppercase tracking-wider text-[9px]">
              <Lock className="w-3.5 h-3.5 text-white" /> Security Protocol
            </p>
            <p>Your API Key is encrypted locally on standard AES-256 cycles before memory write and parsed only for communication lines with the AI microservice.</p>
          </div>

          <button
            type="submit"
            disabled={loading || !apiKey}
            className="w-full btn-primary py-3 font-bold text-sm text-primary-950 flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-primary-950" /> : 'Initialize & Save Key'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupModal;