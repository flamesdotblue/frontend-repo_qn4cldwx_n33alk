import React from 'react';
import { Home, Calendar, Bot, ClipboardList, User, Bell, Mail, LogIn, Sun, Moon, Accessibility, Globe } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, accessibility, onToggleAccessibility, lang, onChangeLang, onOpenChat }) {
  const t = {
    es: {
      home: 'Inicio',
      book: 'Agendar Cita',
      ai: 'Chat con IA',
      appts: 'Mis Citas',
      profile: 'Perfil',
      notifs: 'Notificaciones',
      contact: 'Contacto',
      login: 'Login / Registro',
      accessible: 'Accesible',
    },
    en: {
      home: 'Home',
      book: 'Book Appointment',
      ai: 'Start AI Chat',
      appts: 'My Appointments',
      profile: 'Profile',
      notifs: 'Notifications',
      contact: 'Contact',
      login: 'Login / Register',
      accessible: 'Accessibility',
    },
  }[lang];

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/40 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#67E6DF] via-[#70A1E6] to-[#8C95E6]" />
            <span className="font-semibold tracking-wide">AgenVel</span>
          </a>
          <div className="hidden md:flex items-center gap-2">
            <a href="#home" className="nav-btn"><Home className="size-4"/> {t.home}</a>
            <a href="#calendar" className="nav-btn"><Calendar className="size-4"/> {t.book}</a>
            <button onClick={onOpenChat} className="nav-btn"><Bot className="size-4"/> {t.ai}</button>
            <a href="#appointments" className="nav-btn"><ClipboardList className="size-4"/> {t.appts}</a>
            <a href="#profile" className="nav-btn"><User className="size-4"/> {t.profile}</a>
            <a href="#notifications" className="nav-btn"><Bell className="size-4"/> {t.notifs}</a>
            <a href="#contact" className="nav-btn"><Mail className="size-4"/> {t.contact}</a>
            <a href="#auth" className="nav-btn"><LogIn className="size-4"/> {t.login}</a>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Accessibility" onClick={onToggleAccessibility} className={`icon-btn ${accessibility ? 'ring-2 ring-offset-2 ring-[#50BEE6]' : ''}`}>
              <Accessibility className="size-5" />
            </button>
            <button aria-label="Toggle theme" onClick={onToggleTheme} className="icon-btn">
              {theme === 'dark' ? <Sun className="size-5"/> : <Moon className="size-5"/>}
            </button>
            <div className="relative">
              <select aria-label="Language" value={lang} onChange={(e) => onChangeLang(e.target.value)} className="pl-8 pr-3 py-2 rounded-md bg-white/70 dark:bg-black/40 border border-black/10 dark:border-white/10 text-sm">
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 size-4 opacity-70"/>
            </div>
          </div>
        </div>
      </nav>
      <div className="md:hidden overflow-x-auto whitespace-nowrap px-4 pb-3 flex gap-2">
        <a href="#home" className="nav-chip"><Home className="size-4"/> {t.home}</a>
        <a href="#calendar" className="nav-chip"><Calendar className="size-4"/> {t.book}</a>
        <button onClick={onOpenChat} className="nav-chip"><Bot className="size-4"/> {t.ai}</button>
        <a href="#appointments" className="nav-chip"><ClipboardList className="size-4"/> {t.appts}</a>
        <a href="#profile" className="nav-chip"><User className="size-4"/> {t.profile}</a>
        <a href="#notifications" className="nav-chip"><Bell className="size-4"/> {t.notifs}</a>
        <a href="#contact" className="nav-chip"><Mail className="size-4"/> {t.contact}</a>
        <a href="#auth" className="nav-chip"><LogIn className="size-4"/> {t.login}</a>
      </div>
    </header>
  );
}
