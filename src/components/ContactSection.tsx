import React, { useState } from 'react';
import { Mail, Send, Check, Copy, MessageSquare, Linkedin, Github, Twitter, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isModal, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    purpose: 'collaboration',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const officialEmail = 'juan.salinas.a@mail.pucv.cl';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    setTimeout(() => {
      // Create mailto link as direct action
      const mailtoUrl = `mailto:${officialEmail}?subject=${encodeURIComponent(`[${formData.purpose.toUpperCase()}] ${formData.subject || 'Contacto desde Portafolio'}`)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  const content = (
    <div className="space-y-8">
      {/* Header */}
      {!isModal && (
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
              Canal de Comunicación
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Contacto & Vinculación Profesional
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Disponible para proyectos de software, colaboraciones académicas en informática y resolución de problemas algorítmicos.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5">
            <h3 className="font-bold text-white text-base">Información Directa</h3>

            {/* Email copy card */}
            <div className="p-4 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl backdrop-blur-md bg-blue-500/10 text-blue-300 border border-blue-400/20">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider">CORREO INSTITUCIONAL / CONTACTO</span>
                  <span className="text-sm font-mono text-white font-medium">{officialEmail}</span>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl backdrop-blur-md bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                title="Copiar correo"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Academic details */}
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-blue-400" />
                <span>Valparaíso, Chile • Región de Valparaíso</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-purple-400" />
                <span>Horario de Atención: Lunes a Viernes (Zona Horaria GMT-4)</span>
              </div>
            </div>

            {/* Social Links matching mockup */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/juan-salinas-acosta-0313bb41b/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              >
                <Linkedin size={14} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/juansalinasa-glitch"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              >
                <Twitter size={14} className="text-sky-400" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="lg:col-span-7">
          <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl backdrop-blur-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-xl font-bold text-white">¡Mensaje Preparado con Éxito!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Se ha generado la solicitud de contacto con los datos estructurados. Tu cliente de correo se abrirá automáticamente para enviar el mensaje a <span className="text-white font-mono">{officialEmail}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl backdrop-blur-md bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Sofía Ramírez"
                      className="w-full backdrop-blur-md bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full backdrop-blur-md bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Propósito del Contacto
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                      className="w-full backdrop-blur-md bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="collaboration" className="bg-[#0a0c10]">Colaboración en Proyecto</option>
                      <option value="academic" className="bg-[#0a0c10]">Consulta Académica PUCV</option>
                      <option value="internship" className="bg-[#0a0c10]">Oportunidad Profesional / Pasantía</option>
                      <option value="inquiry" className="bg-[#0a0c10]">Consulta Técnica General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Asunto
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ej: Desarrollo de Algoritmo de Optimización"
                      className="w-full backdrop-blur-md bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Mensaje / Descripción Técnica *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe los requerimientos, detalles del proyecto o consulta..."
                    className="w-full backdrop-blur-md bg-black/40 border border-white/15 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-slate-200 text-black py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-white/10 transition-all transform active:scale-98 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Enviar Mensaje Estructurado</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in">
        <div 
          className="relative w-full max-w-4xl backdrop-blur-2xl bg-[#0a0c10]/90 border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto p-6 sm:p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-xl font-bold text-white">Contacto — Juan Salinas</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 backdrop-blur-md bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white rounded-xl text-xs font-mono border border-white/15 transition-colors cursor-pointer"
              >
                Cerrar ✕
              </button>
            )}
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-8">
      {content}
    </section>
  );
};

