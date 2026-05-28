import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User } from 'lucide-react';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GlowCard from '../components/ui/GlowCard';
import AetherLogo from '../components/ui/AetherLogo';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin
        ? await userAPI.login(username, password)
        : await userAPI.register(username, password);

      login(data.token, data.user);
      showToast(isLogin ? "Welcome back!" : "Account created successfully!", "success");
      navigate('/');
    } catch (err) {
      showToast(err.response?.data?.message || "Authentication failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-950 px-4">
      <GlowCard className="w-full max-w-md p-8 bg-[#0D0D0D]/90 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary-200 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex justify-center mb-6">
          <AetherLogo className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-extrabold text-center text-white tracking-tight mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 w-4 h-4 text-primary-200" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 p-3 bg-[#0F0F0F] text-white border border-white/10 rounded-xl focus:border-white outline-none transition-all placeholder-zinc-600 font-medium text-sm"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-primary-200" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 p-3 bg-[#0F0F0F] text-white border border-white/10 rounded-xl focus:border-white outline-none transition-all placeholder-zinc-600 font-medium text-sm"
              required
            />
          </div>

          <button className="w-full btn-primary py-3 font-bold text-base mt-2 shadow-lg shadow-black/25">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-xs font-semibold text-primary-200 font-sans">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-extrabold hover:underline transition-colors"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </GlowCard>
    </div>
  );
};

export default Login;