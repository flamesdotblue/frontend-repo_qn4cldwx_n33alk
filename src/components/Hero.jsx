import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ lang, onOpenChat }) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Scale down slowly as we scroll, simulating the brain moving away
      const s = Math.max(0.75, 1 - y / 1500);
      setScale(s);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = {
    es: {
      title: 'Agendador médico inteligente',
      subtitle: 'Analiza síntomas, recomienda cuidados y sugiere especialistas.',
      cta1: 'Agendar Cita',
      cta2: 'Hablar con la IA',
    },
    en: {
      title: 'Intelligent medical scheduler',
      subtitle: 'Analyzes symptoms, recommends care and suggests specialists.',
      cta1: 'Book Appointment',
      cta2: 'Start AI Chat',
    },
  }[lang];

  return (
    <section id="home" className="relative min-h-[110vh] w-full">
      {/* 3D Brain background */}
      <div ref={containerRef} className="absolute inset-0" style={{ transform: `scale(${scale})`, transformOrigin: 'center top', transition: 'transform 120ms linear' }}>
        <Spline scene="https://prod.spline.design/Zn7XRxnnbSat5OJG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient and vignette overlays, do not block scene interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white/90 dark:from-black/70 dark:via-black/10 dark:to-black/90" />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#85E6C0] via-[#70A1E6] to-[#8C95E6]">
          AgenVel
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-black/70 dark:text-white/80">
          {t.title}
        </p>
        <p className="mt-1 text-sm sm:text-base text-black/60 dark:text-white/60">
          {t.subtitle}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#calendar" className="px-5 py-3 rounded-lg bg-[#67E6DF] text-black font-medium shadow hover:scale-[1.02] active:scale-[0.99] transition-transform">
            {t.cta1}
          </a>
          <button onClick={onOpenChat} className="px-5 py-3 rounded-lg bg-black/80 dark:bg-white/10 text-white font-medium border border-white/20 hover:bg-black/70 dark:hover:bg-white/20 transition-colors">
            {t.cta2}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center text-xs text-black/60 dark:text-white/60">
          <span>{lang === 'es' ? 'Desplázate' : 'Scroll'}</span>
          <div className="mt-2 h-8 w-[2px] bg-gradient-to-b from-transparent via-[#50BEE6] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
