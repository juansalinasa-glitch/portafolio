import React, { useState } from 'react';
import { COMPETENCIES_DATA } from '../data/portfolioData';
import { Competency } from '../types';
import { SkillModal } from './SkillModal';
import { Network, Cpu, Terminal, Database, Sparkles, ExternalLink, Binary } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'python':
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center border border-white/15 text-blue-400 font-bold text-xs shadow-inner">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9 2C6.8 2 7.1 4.2 7.1 4.2L7.1 6.5H12V7.3H4.4C4.4 7.3 2 7 2 12.1C2 17.2 4.1 16.9 4.1 16.9H5.6V14.6C5.6 14.6 5.4 11.9 8.2 11.9H12.9C12.9 11.9 15.5 12 15.5 9.4V4.7C15.5 4.7 15.9 2 11.9 2ZM9.6 3.5C10.2 3.5 10.7 4 10.7 4.6C10.7 5.2 10.2 5.7 9.6 5.7C9 5.7 8.5 5.2 8.5 4.6C8.5 4 9 3.5 9.6 3.5Z" fill="#60a5fa"/>
              <path d="M12.1 22C17.2 22 16.9 19.8 16.9 19.8L16.9 17.5H12V16.7H19.6C19.6 16.7 22 17 22 11.9C22 6.8 19.9 7.1 19.9 7.1H18.4V9.4C18.4 9.4 18.6 12.1 15.8 12.1H11.1C11.1 11.1 8.5 12 8.5 14.6V19.3C8.5 19.3 8.1 22 12.1 22ZM14.4 20.5C13.8 20.5 13.3 20 13.3 19.4C13.3 18.8 13.8 18.3 14.4 18.3C15 18.3 15.5 18.8 15.5 19.4C15.5 20 15 20.5 14.4 20.5Z" fill="#a855f7"/>
            </svg>
          </div>
        );
      case 'tree':
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center text-blue-400 border border-white/15 shadow-inner">
            <Network size={20} className="text-blue-400" />
          </div>
        );
      case 'memory':
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center text-purple-400 border border-white/15 shadow-inner">
            <Cpu size={20} className="text-purple-400" />
          </div>
        );
      case 'terminal':
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center text-emerald-400 border border-white/15 shadow-inner">
            <Terminal size={20} className="text-emerald-400" />
          </div>
        );
      case 'database':
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center text-amber-400 border border-white/15 shadow-inner">
            <Database size={20} className="text-amber-400" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/[0.08] flex items-center justify-center text-indigo-400 border border-white/15 shadow-inner">
            <Binary size={20} className="text-indigo-400" />
          </div>
        );
    }
  };

  return (
    <section id="skills" className="py-10 md:py-14 scroll-mt-20">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
                02 // Núcleo Técnico
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Competencias Técnicas
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Pilares formativos del currículo de Ingeniería Civil en Informática (PUCV)
            </p>
          </div>

          <div className="text-xs font-mono text-slate-300 backdrop-blur-md bg-white/[0.04] px-3.5 py-1.5 rounded-xl border border-white/15 w-fit">
            Haz clic en una tarjeta para inspeccionar código y pruebas
          </div>
        </div>

        {/* Competency Cards Grid in Frosted Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPETENCIES_DATA.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedCompetency(skill)}
              className="backdrop-blur-xl bg-white/[0.04] hover:bg-white/[0.08] rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div>
                {/* Header with Icon and Title */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {renderIcon(skill.iconType)}
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <ExternalLink size={15} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-5">
                  {skill.description}
                </p>
              </div>

              {/* Tag chip */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-blue-300 backdrop-blur-md bg-blue-500/10 border border-blue-400/25">
                  {skill.tag}
                </span>

                <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                  Ver Detalles →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedCompetency && (
        <SkillModal
          competency={selectedCompetency}
          onClose={() => setSelectedCompetency(null)}
        />
      )}
    </section>
  );
};

