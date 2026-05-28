import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, Menu, X } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext'; 
import AetherLogo from './ui/AetherLogo';

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto pointer-events-auto bg-[#0D0D0D]/85 backdrop-blur-md border border-white/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <AetherLogo className="w-6 h-6 group-hover:scale-105 transition-all duration-300" />
              <span className="text-lg font-black text-white tracking-widest font-display">
                AETHER
              </span>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/create-job" 
                    className="flex items-center space-x-2 text-primary-200 hover:text-white font-semibold transition-all duration-200 px-3.5 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 text-xs uppercase tracking-wider"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Job Config</span>
                  </Link>

                  {/* Divider */}
                  <div className="h-5 w-px bg-white/10"></div>

                  {/* Sign Out Button */}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-primary-200 hover:text-red-400 font-semibold transition-all duration-200 px-3.5 py-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/5 text-xs uppercase tracking-wider"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-white font-bold transition-all px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 border border-white/10 text-xs uppercase tracking-wider">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary-200 hover:text-white p-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 p-4 flex flex-col gap-2 bg-[#0D0D0D]/95 rounded-b-2xl animate-in slide-in-from-top duration-200">
            {user ? (
              <>
                <Link 
                  to="/create-job" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-primary-200 hover:text-white font-bold p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-sans"
                >
                  <PlusCircle className="w-4 h-4 text-primary-200" />
                  <span>New Job Config</span>
                </Link>
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="flex items-center gap-3 text-primary-200 hover:text-red-400 font-bold p-3 rounded-xl hover:bg-red-500/10 transition-all text-left text-sm font-sans w-full"
                >
                  <LogOut className="w-4 h-4 text-primary-200" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-3 bg-white text-primary-950 font-extrabold rounded-xl hover:bg-zinc-200 transition-all text-center text-sm"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;