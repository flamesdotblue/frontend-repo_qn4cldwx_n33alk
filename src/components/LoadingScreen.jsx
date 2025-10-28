import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 text-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning brain logo using inline SVG to avoid external assets */}
        <div className="w-20 h-20 animate-spin-slow">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#092343" />
                <stop offset="50%" stopColor="#325e8c" />
                <stop offset="100%" stopColor="#71a4d0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="#02050e" />
            <path d="M60 120c-12-40 12-70 40-70 38 0 60 40 40 70M60 120c20 10 40 10 80 0M60 120c-8-22-2-40 16-50m88 50c8-22 2-40-16-50" fill="none" stroke="url(#grad)" strokeWidth="10" strokeLinecap="round" />
            <path d="M80 135c0 12 10 22 22 22s22-10 22-22" fill="none" stroke="#c5d9e7" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-wide">AgenVel</h1>
        <p className="text-sm text-white/70">Cargando experiencia de salud inteligente…</p>
      </div>
    </div>
  );
}
