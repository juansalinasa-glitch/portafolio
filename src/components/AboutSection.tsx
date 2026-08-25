import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, Cpu, Terminal, Compass, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [selectedFocus, setSelectedFocus] = useState<number>(0);

  const pillars = [
    {
      title: 'Mentalidad Estructural',
      desc: 'El software se concibe como una obra civil de ingeniería: bases firmes, cálculo de cargas asintóticas y diseño modular resistente a fallas.',
      icon: <ShieldCheck size={20} className="text-blue-400" />
    },
    {
      title: 'Rigor Algorítmico',
      desc: 'Comprensión profunda de la complejidad Big-O, análisis de invariantes de bucle y optimización matemática antes de escribir código.',
      icon: <Cpu size={20} className="text-purple-400" />
    },
    {
      title: 'Código Limpio y Fundamentado',
      desc: 'Implementación legible, documentada y testeable, eliminando deuda técnica desde el diseño inicial.',
      icon: <Terminal size={20} className="text-emerald-400" />
    }
  ];

  return (
    <section id="about" className="py-10 md:py-14 border-b border-white/10 scroll-mt-20">
      <div className="flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Sobre Mí</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full backdrop-blur-md bg-white/[0.06] border border-white/15 text-slate-300 font-normal">
              Perfil Profesional
            </span>
          </h2>
        </div>

        {/* Main Card with Frosted Glass */}
        <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all shadow-2xl relative overflow-hidden group">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none rounded-full blur-2xl"></div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal relative z-10">
            Como estudiante de Ingeniería Civil en Informática en la Pontificia Universidad Católica de Valparaíso, abordo la programación con una mentalidad estructural. Mi interés principal radica en establecer bases algorítmicas sólidas y comprender la arquitectura subyacente del software. Busco aplicar principios de ingeniería para resolver problemas complejos del mundo real a través de código limpio, eficiente y bien fundamentado. Mi enfoque actual es dominar la lógica computacional esencial que sirve como pilar para el desarrollo de sistemas robustos.
          </p>

          {/* Academic Badge */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-blue-400" />
              <span className="text-white font-medium">Pontificia Universidad Católica de Valparaíso (PUCV)</span>
              <span className="text-slate-500">•</span>
              <span>Facultad de Ingeniería</span>
            </div>
            <div className="flex items-center gap-2 backdrop-blur-md bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-xl text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Régimen Académico Diurno • 2do Semestre Activo</span>
            </div>
          </div>
        </div>

        {/* Engineering Pillars in Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFocus(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-xl ${
                selectedFocus === idx
                  ? 'bg-white/[0.08] border-white/25 shadow-xl shadow-blue-500/10'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl backdrop-blur-md bg-white/[0.08] border border-white/15">
                  {pillar.icon}
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

