import React, { useState } from 'react';
import { Upload, Sliders, AlertCircle, FileText, Briefcase, Loader2, CheckCircle2, Shield, Settings, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { candidateAPI } from '../services/api';
import GlowCard from '../components/ui/GlowCard';
import { useToast } from '../context/ToastContext';

const roleSuggestions = [
    "Senior Backend Engineer",
    "Full Stack Developer",
    "AI Research Scientist",
    "Lead Product Designer",
    "DevOps Architect"
];

const JobSetup = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const [formData, setFormData] = useState({
        jobTitle: '',
        minExperience: 0,
        tier1Only: false,
        experienceWeight: 40,
        skillsWeight: 40,
        educationWeight: 20,
    });

    const [benchmarkFiles, setBenchmarkFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 12) {
            showToast("Maximum 12 files allowed. Please select fewer files.", "error");
            return;
        }
        setBenchmarkFiles(files);
    };

    const handleSubmit = async () => {
        if (!formData.jobTitle) {
            showToast("Please specify an active Job Title.", "error");
            return;
        }
        if (benchmarkFiles.length === 0) {
            showToast("Please upload at least one gold-standard reference resume to train the model.", "error");
            return;
        }

        setLoading(true);
        setLoadingMessage("Uploading gold-standard resumes...");

        try {
            const payload = new FormData();
            payload.append('config', JSON.stringify(formData));

            benchmarkFiles.forEach(file => {
                payload.append('benchmark_resumes', file);
            });

            setTimeout(() => setLoadingMessage("Training AETHER intelligence core... (This may take a minute)"), 2000);

            await candidateAPI.createJobConfig(payload);
            showToast("AETHER engine calibrated and launched!", "success");
            navigate('/');

        } catch (err) {
            console.error("Submission failed", err);
            showToast("Failed to launch configuration: " + (err.response?.data?.error || err.message), "error");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 relative">

            {/* Go Back button */}
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-[10px] font-extrabold text-primary-200 hover:text-white transition-all uppercase tracking-widest mb-6 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
                <ArrowLeft className="w-3.5 h-3.5 text-primary-200" /> Cancel & Return
            </button>

            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center h-full min-h-[500px]">
                    <div className="bg-[#0D0D0D] p-8 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center text-center max-w-sm">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-black/20">
                            <Loader2 className="w-7 h-7 text-white animate-spin" />
                        </div>
                        <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">Calibrating Engine</h3>
                        <p className="text-xs text-primary-200 font-semibold animate-pulse">{loadingMessage}</p>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-1">
                    <Settings className="w-6 h-6 text-white" />
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        AETHER Config Engine
                    </h1>
                </div>
                <p className="text-xs font-semibold text-primary-200 font-sans">
                    Calibrate neural search matrices, load standard dossiers, and compile core scoring algorithms.
                </p>
            </div>

            {/* --- COCKPIT INTERACTIVE GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: IDENTITY & HARD FILTERS */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Identity Panel */}
                    <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md">
                        <div className="border-b border-white/5 pb-4 mb-4">
                            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Identity Panel</h2>
                            <p className="text-[10px] text-primary-200 font-medium font-sans">Specify active recruitment parameters</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-extrabold text-primary-100 mb-2 uppercase tracking-widest font-sans">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-[#0F0F0F] text-white border border-white/10 rounded-xl focus:border-white outline-none transition-all placeholder-zinc-600 font-medium text-xs font-sans"
                                    placeholder="e.g. Senior Backend Engineer"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold text-[#A3A3A3] mb-2 uppercase tracking-widest font-sans">Suggested Profiles</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {roleSuggestions.map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, jobTitle: role })}
                                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-200 font-sans
                        ${formData.jobTitle === role
                                                    ? 'bg-white text-primary-950 border-white scale-[1.02]'
                                                    : 'bg-white/5 text-primary-100 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlowCard>

                    {/* Hard Constraints Panel */}
                    <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md">
                        <div className="border-b border-white/5 pb-4 mb-4">
                            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Hard Constraints</h2>
                            <p className="text-[10px] text-primary-200 font-medium font-sans">Mandatory validation parameters</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-primary-100 font-sans">Min. Experience Years</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-16 p-2 bg-[#0F0F0F] text-white border border-white/10 rounded-xl text-center focus:border-white font-bold outline-none text-xs font-sans"
                                    value={formData.minExperience}
                                    onChange={(e) => setFormData({ ...formData, minExperience: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="tier1"
                                    checked={formData.tier1Only}
                                    onChange={(e) => setFormData({ ...formData, tier1Only: e.target.checked })}
                                    className="w-4 h-4 bg-[#0F0F0F] border border-white/10 text-white rounded focus:ring-0 focus:ring-offset-0 focus:border-white cursor-pointer accent-white"
                                />
                                <label htmlFor="tier1" className="text-[11px] font-bold text-primary-100 cursor-pointer select-none font-sans">
                                    Require Tier-1 University
                                </label>
                            </div>
                        </div>
                    </GlowCard>

                </div>

                {/* RIGHT COLUMN: ALGORITHM TUNING & GOLD STANDARDS */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Priority Weight Calibrator */}
                        <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="border-b border-white/5 pb-4 mb-5">
                                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Weights Calibration</h2>
                                    <p className="text-[10px] text-primary-200 font-medium font-sans">Tune scoring priority curves</p>
                                </div>

                                <div className="space-y-5">
                                    <WeightSlider
                                        label="Experience Importance"
                                        value={formData.experienceWeight}
                                        onChange={(val) => setFormData({ ...formData, experienceWeight: val })}
                                    />
                                    <WeightSlider
                                        label="Skills Match Importance"
                                        value={formData.skillsWeight}
                                        onChange={(val) => setFormData({ ...formData, skillsWeight: val })}
                                    />
                                    <WeightSlider
                                        label="Education Prestige Importance"
                                        value={formData.educationWeight}
                                        onChange={(val) => setFormData({ ...formData, educationWeight: val })}
                                    />
                                </div>
                            </div>

                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[9px] text-primary-200 font-medium font-sans leading-relaxed mt-6">
                                Optimization Sum: <strong>{formData.experienceWeight + formData.skillsWeight + formData.educationWeight}%</strong>. Total sum does not require normalization.
                            </div>
                        </GlowCard>

                        {/* Reference Resume Vault */}
                        <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="border-b border-white/5 pb-4 mb-4">
                                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Gold Reference Vault</h2>
                                    <p className="text-[10px] text-primary-200 font-medium font-sans">Upload dossiers to train AI weights</p>
                                </div>

                                {/* THE UPLOAD BOX */}
                                <div className="relative group cursor-pointer mb-4">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                                    <div className="relative bg-white/5 border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all">
                                        <Upload className="w-8 h-8 text-primary-200 mx-auto mb-2" />
                                        <p className="font-bold text-xs text-primary-100 font-sans">Click to upload training resumes</p>
                                        <p className="text-[10px] text-primary-200 font-sans mt-0.5">PDF format only (Max 12)</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic File Grid */}
                            {benchmarkFiles.length > 0 ? (
                                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1.5 custom-scrollbar">
                                    {benchmarkFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-[11px] font-semibold text-white bg-white/5 p-2 rounded-xl border border-white/5 font-sans">
                                            <div className="flex items-center truncate min-w-0">
                                                <FileText className="w-3.5 h-3.5 mr-1.5 text-white/55 flex-shrink-0" />
                                                <span className="truncate max-w-[140px]">{file.name}</span>
                                            </div>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[9px] text-primary-200 font-semibold leading-relaxed flex gap-2 font-sans align-start">
                                    <AlertCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                    <span>Please load standard candidate resumes. The AETHER NLP compiler extracts structural parameters from loaded standards.</span>
                                </div>
                            )}
                        </GlowCard>

                    </div>

                    {/* LAUNCH ENGINE CONTROL BAR - Positioned underneath within the right column */}
                    <GlowCard className="bg-primary-900/60 border border-white/5 shadow-md mt-6">
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-white flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-4.5 h-4.5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider leading-none">Calibration Launch Dock</h4>
                                    <p className="text-[10px] text-primary-200 font-medium font-sans leading-none mt-2">Ready to initialize Neural Search grids with Gemini support</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full btn-primary py-5 px-8 text-xs font-extrabold tracking-wide uppercase flex items-center justify-center gap-3 flex-shrink-0"
                            >
                                Launch Config Cycle
                                <ArrowRight className="w-4 h-4 text-primary-950" />
                            </button>
                        </div>
                    </GlowCard>

                </div>

            </div>

        </div>
    );
};

// Weight Slider component
const WeightSlider = ({ label, value, onChange }) => (
    <div>
        <div className="flex justify-between items-center mb-1.5 font-sans">
            <span className="text-xs font-bold text-primary-100">{label}</span>
            <span className="text-[10px] font-extrabold text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">{value}%</span>
        </div>
        <input
            type="range"
            min="0" max="100" step="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-colors"
        />
    </div>
);

export default JobSetup;