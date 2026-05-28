import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, Sliders, Sparkles, Upload, Users, Shield } from 'lucide-react';
import GlowCard from '../components/ui/GlowCard';
import AetherLogo from '../components/ui/AetherLogo';

const Landing = () => {
  return (
    <div className="min-h-screen bg-primary-950 text-primary-50 relative overflow-hidden font-sans pb-16">

      {/* Decorative ambient lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <AetherLogo className="w-16 h-16" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display max-w-4xl mx-auto leading-tight">
          Bespoke Talent Alignment <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg text-primary-200 mt-6 max-w-2xl mx-auto font-medium font-sans leading-relaxed">
          Activate a Gemini-powered resume extraction pipeline, tune weighted scoring models, and rank candidates through explainable AI evaluation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <Link
            to="/login"
            className="w-full sm:w-auto btn-primary py-3 px-8 flex items-center justify-center gap-2 font-bold text-sm tracking-wide uppercase"
          >
            Enter Console
            <ArrowRight className="w-4 h-4 text-primary-950" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto btn-secondary py-3 px-8 flex items-center justify-center gap-2 font-bold text-sm tracking-wide uppercase"
          >
            Explore Engine
          </a>
        </div>
      </div>

      {/* --- "HOW IT WORKS" PIPELINE --- */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 scroll-mt-24">
        <div className="text-center mb-16">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A3A3A3] font-sans">System Overview</p>
          <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">How AETHER Works</h2>
          <p className="text-xs text-primary-200 mt-2 max-w-md mx-auto leading-relaxed">
            A hybrid AI workflow that moves from resume upload to adaptive weight optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Step 1 */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 text-white font-extrabold text-xs">
                01
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">Import Benchmarks</h3>
              <p className="text-xs text-primary-200 leading-relaxed font-sans font-medium">
                Upload up to 12 top-performer profiles to establish a "Gold Standard" baseline. The system extracts experience, education, and structured capability profiles.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-extrabold text-primary-200 uppercase tracking-wider">
              <Upload className="w-3.5 h-3.5" /> Reference Capture
            </div>
          </GlowCard>

          {/* Step 2 */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 text-white font-extrabold text-xs">
                02
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">Tune Engine Priorities</h3>
              <p className="text-xs text-primary-200 leading-relaxed font-sans font-medium">
                Calibrate weighted scoring directly from the workspace sidebar. Dynamically adjust recruiter priorities across experience, skills, and educational benchmarks.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-extrabold text-primary-200 uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" /> Priority Calibration
            </div>
          </GlowCard>

          {/* Step 3 */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 text-white font-extrabold text-xs">
                03
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">AI Candidate Evaluation</h3>
              <p className="text-xs text-primary-200 leading-relaxed font-sans font-medium">
                Applicant resumes are parsed through a Gemini-powered NLP pipeline and evaluated by AETHER's adaptive scoring engine.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-extrabold text-primary-200 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> High Fidelity Scan
            </div>
          </GlowCard>

          {/* Step 4 */}
          <GlowCard className="p-6 bg-primary-900/60 border border-white/5 shadow-md flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-5 text-white font-extrabold text-xs">
                04
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">Candidate Evaluation Report</h3>
              <p className="text-xs text-primary-200 leading-relaxed font-sans font-medium">
                Review ranked candidate portfolios with explainable score breakdowns, AI-generated summaries, radar chart analytics, and recruiter calibration feedback.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-extrabold text-primary-200 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Profile Dossier
            </div>
          </GlowCard>

        </div>
      </div>

      {/* --- TECH SPEC GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A3A3A3] font-sans">Engineering Specs</p>
            <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">The AETHER Pipeline</h2>
            <p className="text-xs text-primary-200 mt-4 leading-relaxed font-sans font-medium">
              We reject the generic administrative grids typical of hiring platforms. AETHER is built as a highly tactile control deck powered by hybrid AI systems and modern frameworks:
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-white/5 border border-white/10 rounded flex items-center justify-center text-white mt-0.5">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div className="text-xs">
                  <strong className="text-white font-bold block mb-0.5">AES-256 Key Encryption</strong>
                  Gemini API keys are protected locally on secure memory boundaries.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-white/5 border border-white/10 rounded flex items-center justify-center text-white mt-0.5">
                  <Sliders className="w-3 h-3 text-white" />
                </div>
                <div className="text-xs">
                  <strong className="text-white font-bold block mb-0.5">MERN + Python FastAPI Scoring Service</strong>
                  The scoring engine computes weighted evaluations and fine-tunes priorities from recruiter feedback.
                </div>
              </div>
            </div>
          </div>

          <GlowCard className="p-8 bg-[#0D0D0D] border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">Ready to calibrate?</h3>
            <p className="text-xs text-primary-200 mb-6 max-w-xs leading-relaxed font-sans">
              Enter your secure recruitment workspace console and launch your first hiring pipeline.
            </p>
            <Link
              to="/login"
              className="btn-primary w-full max-w-xs py-3 font-bold text-sm tracking-wide uppercase"
            >
              Sign In to Console
            </Link>
          </GlowCard>
        </div>
      </div>

      {/* --- Aesthetic Footer --- */}
      <footer className="mt-20 py-8 border-t border-white/5 text-center font-sans relative z-10">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white">
          AETHER &copy; {new Date().getFullYear()}
        </p>
        <p className="text-[9px] text-primary-200 mt-2 tracking-[0.1em] uppercase font-bold">
          Hybrid AI recruitment intelligence &bull; Gemini parsing + ML scoring
        </p>
      </footer>

    </div>
  );
};

export default Landing;
