import React from 'react';

const AboutSection = () => {
  return (
    <footer className="mt-20 py-8 border-t border-white/5 text-center font-sans">
      <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white">
        AETHER &copy; {new Date().getFullYear()}
      </p>
      <p className="text-[9px] text-primary-200 mt-2 tracking-[0.1em] uppercase font-bold">
        Hybrid AI recruitment intelligence &bull; Gemini parsing + ML scoring
      </p>
    </footer>
  );
};

export default AboutSection;