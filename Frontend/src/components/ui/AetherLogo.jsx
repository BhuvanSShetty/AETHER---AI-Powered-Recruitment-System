import React from 'react';

const AetherLogo = ({ className = "w-6 h-6", ...props }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} transition-all duration-500`}
      {...props}
    >
      <defs>
        <linearGradient id="aether-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
        <linearGradient id="aether-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#09090B" stopOpacity="0.2" />
        </linearGradient>
        <filter id="aether-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer elegant rotating dash ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="44" 
        stroke="url(#aether-grad-1)" 
        strokeWidth="1.5" 
        strokeDasharray="4 6" 
        className="opacity-40 origin-center animate-[spin_60s_linear_infinite]"
      />
      
      {/* Outer solid hairline ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="url(#aether-grad-2)" 
        strokeWidth="0.75" 
        className="opacity-30"
      />

      {/* Abstract Aether "A" Shape */}
      <path 
        d="M30 70C30 50 42 30 50 30C58 30 70 50 70 70" 
        stroke="url(#aether-grad-1)" 
        strokeWidth="4" 
        strokeLinecap="round"
        className="transition-all duration-300 group-hover:stroke-white"
      />
      
      {/* Dynamic intersecting horizon band */}
      <path 
        d="M25 55H75" 
        stroke="url(#aether-grad-1)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        className="opacity-80 transition-all duration-300 group-hover:stroke-white"
      />

      {/* Core floating node */}
      <circle 
        cx="50" 
        cy="30" 
        r="5.5" 
        fill="#FFFFFF" 
        filter="url(#aether-glow)"
        className="animate-pulse"
      />
    </svg>
  );
};

export default AetherLogo;
