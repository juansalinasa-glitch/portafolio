import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Terminal, Menu, X, Sparkles, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; isInteractive?: boolean }[] = [
    { id: 'overview', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'skills', label: 'Competencias' },
    { id: 'lab', label: 'Laboratorio', isInteractive: true },
    { id: 'curriculum', label: 'Malla PUCV' },
    { id: 'terminal', label: 'Terminal CLI' },
    { id: 'contact', label: 'Contacto' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // If it's a section on the main page, scroll gently
    if (tab === 'about' || tab === 'skills' || tab === 'contact') {
      const element = document.getElementById(tab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/[0.04] border-b border-white/10 transition-all">
      <nav className="max-w-[1140px] mx-auto flex justify-between items-center h-16 px-6">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-3 text-left group transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold font-mono text-sm border border-white/20 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            JS
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight block leading-tight flex items-center gap-1.5">
              Juan Salinas
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
              Ing. Civil Informática • PUCV
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-1.5 items-center text-sm font-medium">
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-mono cursor-pointer ${
              activeTab === 'about'
                ? 'bg-white/10 text-white border border-white/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Sobre Mí
          </button>
          
          <button
            onClick={() => handleNavClick('skills')}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-mono cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-white/10 text-white border border-white/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Competencias
          </button>

          <button
            onClick={() => handleNavClick('lab')}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold shadow-sm shadow-blue-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            <span>Laboratorio</span>
          </button>

          <button
            onClick={() => handleNavClick('curriculum')}
            className={`px-3 py-1.5 rounded-xl transition-all text-xs font-mono cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-white/10 text-white border border-white/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Malla PUCV
          </button>

          <button
            onClick={() => handleNavClick('terminal')}
            className={`px-2.5 py-1.5 rounded-xl transition-all font-mono text-xs flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            <Terminal size={12} className="text-purple-400" />
            <span>CLI</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`ml-2 px-3.5 py-1.5 rounded-xl transition-all text-xs font-mono cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white text-black font-bold shadow-md shadow-white/10'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15'
            }`}
          >
            Contacto
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl backdrop-blur-md bg-white/[0.06] border border-white/15 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-[#0a0c10]/95 border-b border-white/10 px-6 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm transition-all flex items-center justify-between font-mono text-xs ${
                activeTab === item.id
                  ? 'bg-white/10 text-white font-bold border border-white/20'
                  : 'text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              <span>{item.label}</span>
              {item.isInteractive && (
                <span className="text-[10px] font-mono bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded-full">
                  Interactivo
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

