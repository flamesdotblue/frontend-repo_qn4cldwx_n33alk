import React, { useEffect, useMemo, useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Footer from './components/Footer.jsx';
import { AlertTriangle, Send, X } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [accessibility, setAccessibility] = useState(false);
  const [lang, setLang] = useState('es');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hola, soy la IA médica de AgenVel. Cuéntame tus síntomas para ayudarte.' }]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [theme]);

  const contrastClasses = accessibility ? 'text-black bg-white !contrast-125' : '';

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userText }]);
    setInput('');
    // Simulated AI triage response
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let specialist = '';
      if (/(pecho|card|heart|palpit)/.test(lower)) specialist = lang === 'es' ? 'cardiólogo' : 'cardiologist';
      else if (/(cabeza|migra|head|neuro)/.test(lower)) specialist = lang === 'es' ? 'neurólogo' : 'neurologist';
      else if (/(piel|rash|derma|skin)/.test(lower)) specialist = lang === 'es' ? 'dermatólogo' : 'dermatologist';
      else if (/(estómago|gastro|abdomen|stomach)/.test(lower)) specialist = lang === 'es' ? 'gastroenterólogo' : 'gastroenterologist';
      const recEs = 'Te recomiendo descansar, hidratarte y monitorear tus síntomas. Si empeoran, busca atención médica.';
      const recEn = 'I recommend rest, hydration, and monitoring your symptoms. If they worsen, seek medical attention.';
      const suggEs = specialist ? ` Podría ser útil consultar a un ${specialist}.` : '';
      const suggEn = specialist ? ` It may be helpful to consult a ${specialist}.` : '';
      const reply = lang === 'es' ? recEs + suggEs : recEn + suggEn;
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    }, 600);
  };

  const t = useMemo(() => ({
    es: {
      sections: {
        calendar: 'Calendario',
        appts: 'Mis Citas',
        profile: 'Perfil',
        notifs: 'Notificaciones',
        contact: 'Contacto',
        auth: 'Acceso',
      },
      aiPlaceholder: 'Describe tus síntomas…',
    },
    en: {
      sections: {
        calendar: 'Calendar',
        appts: 'My Appointments',
        profile: 'Profile',
        notifs: 'Notifications',
        contact: 'Contact',
        auth: 'Sign In',
      },
      aiPlaceholder: 'Describe your symptoms…',
    },
  })[lang], [lang]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#02050e] text-white' : 'bg-white text-black'} ${contrastClasses}`}>
      {loading && <LoadingScreen />}

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        accessibility={accessibility}
        onToggleAccessibility={() => setAccessibility((a) => !a)}
        lang={lang}
        onChangeLang={setLang}
        onOpenChat={() => setChatOpen(true)}
      />

      <main>
        <Hero lang={lang} onOpenChat={() => setChatOpen(true)} />

        {/* Sections ready for future pages */}
        <section id="calendar" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.calendar}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Pronto podrás reservar con un calendario interactivo.' : 'You will soon be able to book with an interactive calendar.'}</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-gradient-to-br from-[#A1D6E9]/40 to-[#85E6C0]/30 border border-black/10 dark:border-white/10" />
            ))}
          </div>
        </section>

        <section id="appointments" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.appts}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Aquí verás tu historial de citas.' : 'Your appointment history will appear here.'}</p>
          <div className="mt-6 rounded-xl border border-dashed border-black/20 dark:border-white/20 p-10 text-center opacity-80">
            {lang === 'es' ? 'Sin datos por ahora.' : 'No data yet.'}
          </div>
        </section>

        <section id="profile" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.profile}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Gestiona tu información y preferencias.' : 'Manage your information and preferences.'}</p>
        </section>

        <section id="notifications" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.notifs}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Configura recordatorios y alertas.' : 'Set up reminders and alerts.'}</p>
        </section>

        <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.contact}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Soporte humano y conexión desde la IA.' : 'Human support and handoff from AI.'}</p>
        </section>

        <section id="auth" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-semibold">{t.sections.auth}</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">{lang === 'es' ? 'Próximamente: registro, login y social login.' : 'Coming soon: sign up, login and social login.'}</p>
        </section>
      </main>

      <Footer lang={lang} />

      {/* Floating Emergency Button */}
      <a href="#contact" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-5 py-3 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition">
        <AlertTriangle className="size-5" />
        <span className="font-medium">{lang === 'es' ? 'Emergencia' : 'Emergency'}</span>
      </a>

      {/* Simple AI Chat Modal (simulated) */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0b1220] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
              <h3 className="font-semibold">{lang === 'es' ? 'Asistente Médico IA' : 'AI Medical Assistant'}</h3>
              <button onClick={() => setChatOpen(false)} className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"><X className="size-4"/></button>
            </div>
            <div className="h-80 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto bg-[#70A1E6]/20 dark:bg-[#325e8c]/30' : 'mr-auto bg-[#A1D6E9]/30 dark:bg-[#71a4d0]/20'} rounded-xl px-4 py-2`}>{m.text}</div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-4 border-t border-black/10 dark:border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder={t.aiPlaceholder}
                className="flex-1 rounded-lg px-4 py-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 outline-none"
              />
              <button onClick={handleSend} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#67E6DF] text-black font-medium">
                <Send className="size-4" /> {lang === 'es' ? 'Enviar' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind component styles */}
      <style>{`
        .nav-btn { @apply inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 transition; }
        .icon-btn { @apply p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition; }
        .nav-chip { @apply inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/5 dark:bg-white/10 text-xs; }
        .animate-spin-slow { animation: spin 5s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
