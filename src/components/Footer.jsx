import React from 'react';

export default function Footer({ lang }) {
  return (
    <footer className="relative z-10 border-t border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-black/70 dark:text-white/70">
        <p>© 2025 AgenVel. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:underline">{lang === 'es' ? 'Privacidad' : 'Privacy'}</a>
          <a href="#terms" className="hover:underline">{lang === 'es' ? 'Términos' : 'Terms'}</a>
        </div>
      </div>
    </footer>
  );
}
