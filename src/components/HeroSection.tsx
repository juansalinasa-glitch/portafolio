import React from 'react';
import { Mail, Code2, ArrowUpRight, Layers } from 'lucide-react';
import { StructuralCanvas } from './StructuralCanvas';
import { ActiveTab } from '../types';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenContactModal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10 overflow-hidden">
      {/* Ambient background glows for hero */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-5 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-[1140px] mx-auto w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Status tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.06] border border-white/15 text-xs font-mono text-slate-300 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>2do Semestre • Pontificia Universidad Católica de Valparaíso</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Ingeniería Estructural en <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent italic">Código</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-[19px] text-slate-300 leading-relaxed max-w-xl font-normal">
              Estudiante de Ingeniería Civil en Informática (2do semestre, PUCV). Construyendo cimientos lógicos sólidos y desarrollando soluciones técnicas de alto rendimiento.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1 items-center">
              <button
                onClick={onOpenContactModal}
                className="bg-white text-black hover:bg-slate-200 px-5 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all transform active:scale-95 cursor-pointer"
              >
                <Mail size={17} className="text-slate-800" />
                <span>Contacto</span>
              </button>

              <a
                href="https://github.com/juansalinasa-glitch"
                target="_blank"
                rel="noreferrer"
                className="backdrop-blur-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 hover:text-white px-5 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-all transform active:scale-95 group"
              >
                <Code2 size={17} className="text-slate-400 group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
              </a>

              <button
                onClick={() => setActiveTab('lab')}
                className="backdrop-blur-md bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
              >
                <Layers size={16} className="text-blue-400" />
                <span>Explorar Laboratorio</span>
              </button>
            </div>

            {/* Micro badges in Frosted Glass */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-3 flex flex-col">
                <span className="font-mono text-white text-base font-bold">PUCV</span>
                <span className="text-[11px] text-slate-400">Escuela de Ing. Informática</span>
              </div>
              <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-3 flex flex-col">
                <span className="font-mono text-white text-base font-bold">100%</span>
                <span className="text-[11px] text-slate-400">Rigor Algorítmico</span>
              </div>
              <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-3 flex flex-col">
                <span className="font-mono text-white text-base font-bold">Valparaíso</span>
                <span className="text-[11px] text-slate-400">Chile</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Structural Visualizer */}
          <div className="lg:col-span-5 w-full h-[360px] sm:h-[400px] lg:h-[420px]">
            <StructuralCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};

