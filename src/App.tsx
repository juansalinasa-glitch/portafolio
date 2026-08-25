import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { AlgorithmLab } from './components/AlgorithmLab';
import { CurriculumView } from './components/CurriculumView';
import { TerminalView } from './components/TerminalView';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Layers, Terminal, Sparkles, ArrowRight, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Sync hash with active tab if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['about', 'skills', 'lab', 'curriculum', 'terminal', 'contact'].includes(hash)) {
        setActiveTab(hash as ActiveTab);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10] text-slate-100 selection:bg-blue-500/30 selection:text-white relative overflow-x-hidden font-sans">
      {/* Ambient Frosted Glass Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600 rounded-full blur-[140px] opacity-20 pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[140px] opacity-20 pointer-events-none -z-10" />
      <div className="fixed top-[25%] right-[5%] w-[35%] h-[35%] bg-pink-500 rounded-full blur-[160px] opacity-10 pointer-events-none -z-10" />
      <div className="fixed top-[60%] left-[2%] w-[30%] h-[30%] bg-indigo-500 rounded-full blur-[150px] opacity-15 pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow w-full z-10">
        {/* Dedicated Screens based on activeTab */}
        {activeTab === 'lab' ? (
          <div className="max-w-[1140px] mx-auto px-6 pt-24 pb-12">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                ← Volver al Inicio
              </button>
            </div>
            <AlgorithmLab />
          </div>
        ) : activeTab === 'curriculum' ? (
          <div className="max-w-[1140px] mx-auto px-6 pt-24 pb-12">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                ← Volver al Inicio
              </button>
            </div>
            <CurriculumView />
          </div>
        ) : activeTab === 'terminal' ? (
          <div className="max-w-[1140px] mx-auto px-6 pt-24 pb-12">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                ← Volver al Inicio
              </button>
            </div>
            <TerminalView />
          </div>
        ) : activeTab === 'contact' ? (
          <div className="max-w-[1140px] mx-auto px-6 pt-24 pb-12">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                ← Volver al Inicio
              </button>
            </div>
            <ContactSection />
          </div>
        ) : (
          /* Main Overview / Portfolio Page with Frosted Glass Theme */
          <>
            {/* Hero Section */}
            <HeroSection
              setActiveTab={setActiveTab}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />

            {/* Container for Sections */}
            <div className="max-w-[1140px] mx-auto w-full px-6 pb-12 space-y-8">
              {/* Sobre Mí */}
              <AboutSection />

              {/* Competencias Técnicas */}
              <SkillsSection />

              {/* Interactive Screen Teaser / Call to action (Frosted Glass Hero Feature) */}
              <section className="backdrop-blur-2xl bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-white/[0.07] rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all"></div>

                <div className="space-y-2.5 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono text-blue-300 backdrop-blur-md bg-blue-500/10 border border-blue-500/25 uppercase tracking-wider">
                    <Sparkles size={12} className="text-blue-400" />
                    <span>Módulos Interactivos de Ingeniería</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Laboratorio de Algoritmos & Consola POSIX en Vivo
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                    Visualiza ordenamientos con análisis $O(n^2)$, búsqueda binaria $O(\log n)$, simulación de memorias LIFO/FIFO y transpilación de PSeInt sobre paneles de cristal reactivos.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10">
                  <button
                    onClick={() => setActiveTab('lab')}
                    className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all transform active:scale-98 cursor-pointer"
                  >
                    <Layers size={14} />
                    <span>Abrir Laboratorio</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => setActiveTab('terminal')}
                    className="px-4 py-2.5 backdrop-blur-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 hover:text-white rounded-2xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Terminal size={14} className="text-purple-400" />
                    <span>Terminal CLI</span>
                  </button>
                </div>
              </section>

              {/* Contacto Section */}
              <ContactSection />
            </div>
          </>
        )}
      </main>

      {/* Floating Contact Modal if requested */}
      {isContactModalOpen && (
        <ContactSection
          isModal={true}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

