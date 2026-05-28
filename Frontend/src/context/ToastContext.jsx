import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  // Custom Confirmation Dialog State
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const showToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const confirmAction = useCallback((title, message, onConfirm, onCancel = null) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
      }
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, confirmAction }}>
      {children}

      {/* --- TOASTS LAYER --- */}
      <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex flex-col gap-3 max-w-sm mx-auto sm:mx-0 w-auto pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 bg-[#0D0D0D]/95 border rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in duration-300
              ${toast.type === 'success' ? 'border-emerald-500/20 shadow-emerald-950/20' : 
                toast.type === 'error' ? 'border-red-500/20 shadow-red-950/20' : 
                'border-white/10 shadow-black/40'}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white leading-relaxed font-sans">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-primary-200 hover:text-white p-0.5 hover:bg-white/5 rounded-md transition-all flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* --- CONFIRM DIALOG MODAL --- */}
      {confirmState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 bg-[#080808]/90">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 tracking-tight">
                <AlertCircle className="w-4 h-4 text-red-400" />
                {confirmState.title || 'Confirmation Required'}
              </h3>
            </div>
            
            <div className="p-6">
              <p className="text-xs font-semibold text-primary-200 leading-relaxed font-sans">
                {confirmState.message}
              </p>
            </div>

            <div className="p-5 border-t border-white/5 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 bg-[#080808]/90">
              <button 
                onClick={confirmState.onCancel} 
                className="btn-secondary w-full sm:flex-1 py-2.5 sm:py-2 text-xs font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={confirmState.onConfirm} 
                className="w-full sm:flex-1 py-2.5 sm:py-2 text-xs font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
