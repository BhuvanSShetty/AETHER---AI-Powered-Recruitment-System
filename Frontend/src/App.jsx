import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CandidateDetails from './pages/CandidateDetails';
import JobSetup from './pages/JobSetup';
import SetupModal from './components/SetupModal'; 
import Login from './pages/Login'; 
import Landing from './pages/Landing'; 
import { AuthProvider, useAuth } from './context/AuthContext'; 
import { ToastProvider } from './context/ToastContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Navigation Wrapper to hide Navbar on /login and on / when user is logged out (Landing Page)
const NavigationWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  if (location.pathname === '/login' || (location.pathname === '/' && !user)) return null;
  return <Navbar />;
};

// Home Route: Dashboard if logged in, Landing if logged out
const HomeRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }
  if (!user) return <Landing />;
  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-primary-950 text-primary-50">
            {/* Conditional Navbar rendering based on route */}
            <NavigationWrapper />
            
            {/* Feature 1: Global Setup Modal for BYOK */}
            <SetupModal />

            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<HomeRoute />} />
              
              <Route path="/candidate/:id" element={
                <ProtectedRoute>
                  <CandidateDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/create-job" element={
                <ProtectedRoute>
                  <JobSetup />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;