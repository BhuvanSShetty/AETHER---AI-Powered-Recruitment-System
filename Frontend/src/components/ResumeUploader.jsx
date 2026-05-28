import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { candidateAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import GlowCard from './ui/GlowCard';

const ResumeUploader = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setStatus(null);
      setMessage('');
    } else {
      setStatus('error');
      setMessage('Please upload a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setStatus(null);
    setMessage('Parsing resume with AI...');

    try {
      const response = await candidateAPI.uploadResume(file);
      
      setFile(null); 
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setStatus('success');
      setMessage('Resume processed successfully!');
      
      setTimeout(() => {
        const candidateId = response.candidate?._id || response._id;
        navigate(`/candidate/${candidateId}`);
        handleClose();
      }, 1500);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to process resume');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setStatus(null);
    setMessage('');
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
      {/* Modal Container */}
      <GlowCard className="w-full max-w-lg mx-4 p-6 shadow-2xl z-50 bg-[#0D0D0D]/95 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Upload Resume</h2>
          <button
            onClick={handleClose}
            className="text-primary-200 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
            disabled={uploading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NESTED GLOW EFFECT FOR DROP ZONE */}
        <div className="relative group">
           {/* The blurry gradient background that appears on hover */}
           <div className={`absolute -inset-0.5 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-20 transition duration-500 blur ${dragActive ? 'opacity-50' : 'group-hover:opacity-40'}`}></div>
           
           <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-white bg-white/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()} // Click anywhere to upload
          >
            {!file ? (
              <>
                <Upload className="w-10 h-10 text-primary-200 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm text-primary-100 font-semibold mb-2">
                  Drag and drop candidate resume here, or
                </p>
                <button
                  type="button"
                  className="text-white font-bold underline hover:text-zinc-200 text-sm"
                >
                  browse files
                </button>
                <p className="text-xs text-primary-200 mt-2 font-sans">PDF files only (Max 10MB)</p>
              </>
            ) : (
              <div className="flex items-center justify-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <FileText className="w-8 h-8 text-white" />
                <div className="text-left min-w-0">
                  <p className="font-bold text-sm text-white truncate max-w-[250px]">{file.name}</p>
                  <p className="text-xs text-primary-200 font-sans">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 border ${
            status === 'success' 
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
              : status === 'error'
              ? 'bg-red-950/40 text-red-300 border-red-500/20'
              : 'bg-white/5 text-primary-100 border-white/5'
          }`}>
            {status === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            {status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
            {!status && <Loader2 className="w-4 h-4 text-white animate-spin" />}
            <p className="text-xs font-bold leading-none">{message}</p>
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleClose}
            className="btn-secondary flex-1 text-sm py-2.5"
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="btn-primary flex-1 text-sm py-2.5 flex items-center justify-center space-x-2 disabled:bg-white/5 disabled:text-white/20 disabled:border-white/5 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing AI...</span>
              </>
            ) : (
              <span>Upload & Parse</span>
            )}
          </button>
        </div>
      </GlowCard>
    </div>
  );
};

export default ResumeUploader;