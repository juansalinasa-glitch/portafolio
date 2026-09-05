import React, { useState } from 'react';
import { Competency } from '../types';
import { X, Play, Copy, Check, Terminal, BookOpen, Code2, ArrowRight } from 'lucide-react';

interface SkillModalProps {
  competency: Competency | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ competency, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!competency) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(competency.details.sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateExecution = () => {
    setIsExecuting(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      if (competency.id === 'python') {
        setExecutionOutput(`[EJECUTANDO PYTHON 3.12 INTERPRETER]\n>>> Iniciando busqueda_binaria(datos, 23, 0, 9)\n[Paso 1] Rango [0..9], Medio: 4 (Valor: 16) -> 23 > 16 (Buscar derecha)\n[Paso 2] Rango [5..9], Medio: 7 (Valor: 56) -> 23 < 56 (Buscar izquierda)\n[Paso 3] Rango [5..6], Medio: 5 (Valor: 23) -> ¡Objetivo encontrado!\nResultado asintótico: O(log 10) = 3 comparaciones.\nÍndice retornado: 5\n[ESTADO: ÉXITO 0 ERRORS]`);
      } else if (competency.id === 'algoritmos') {
        setExecutionOutput(`[ANÁLISIS ASINTÓTICO DE QUICKSORT]\nEntrada de prueba: [64, 34, 25, 12, 22, 11, 90]\nPartición 1 (Pivote = 12): Menores=[11], Pivote=12, Mayores=[64, 34, 25, 22, 90]\nRecursión profunda completada en 0.00012s.\nArreglo ordenado: [11, 12, 22, 25, 34, 64, 90]\nComplejidad empírica: O(n log n) verificada.`);
      } else if (competency.id === 'logica') {
        setExecutionOutput(`[TABLA DE VERDAD GENERADA AUTOMÁTICAMENTE]\nP | Q | P -> Q | ~P v Q | Equivalencia Lógica\n---------------------------------------------\n1 | 1 |   1    |    1   | VÁLIDO (Tautología)\n1 | 0 |   0    |    0   | VÁLIDO\n0 | 1 |   1    |    1   | VÁLIDO\n0 | 0 |   1    |    1   | VÁLIDO\nConclusión: La ley de implicación formal se cumple estrictamente.`);
      } else if (competency.id === 'pseint') {
        setExecutionOutput(`[EJECUCIÓN PSEINT ESTRUCTURADO]\n*** Proceso CalculoIngenieria ***\n> Ingrese nota de evaluación 1: 6.5 (Pond: 30%)\n> Ingrese nota de evaluación 2: 6.0 (Pond: 35%)\n> Ingrese nota de evaluación 3: 6.8 (Pond: 35%)\nNota Final Ponderada: 6.43\nEstado: Asignatura Aprobada con Distinción.\n*** Fin Proceso ***`);
      } else if (competency.id === 'optimizacion') {
        setExecutionOutput(`[TEST DE ESTRUCTURA DE DATOS PILA LIFO]\n> PilaEstructural instanciada con capacidad=100\n> push(10) -> OK\n> push(20) -> OK\n> push(30) -> OK\n> peek() -> 30 (Tope)\n> pop() -> Retorna 30. Tamaño restante: 2\nUso de memoria optimizado en heap: 64 bytes.`);
      } else {
        setExecutionOutput(`[GCC COMPILER & MEMORY SANITIZER]\nCompilando con -Wall -Wextra -O2...\nReserva de memoria dinámica: 5 * sizeof(int) = 20 bytes.\nDirección base asignada: 0x7ffd9b84a2b0\nAsignaciones verificadas con éxito.\nMemoria liberada con free(bloque). 0 memory leaks detectados.`);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl backdrop-blur-2xl bg-[#0a0c10]/90 border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono text-blue-300 backdrop-blur-md bg-blue-500/10 border border-blue-400/25">
              {competency.tag}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {competency.name}
            </h3>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
              • {competency.level}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            title="Cerrar modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Fundamentación de Ingeniería
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {competency.details.longDescription}
            </p>
          </div>

          {/* Academic link */}
          <div className="p-3.5 backdrop-blur-md bg-white/[0.03] rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Asignatura PUCV de Aplicación:</span>
            <span className="text-blue-300 font-semibold">{competency.details.pucvCourse}</span>
          </div>

          {/* Key concepts chips */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Conceptos Clave & Principios
            </h4>
            <div className="flex flex-wrap gap-2">
              {competency.details.keyConcepts.map((c, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer & Interactive Sandbox */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 size={14} className="text-blue-400" />
                <span>Implementación de Ejemplo</span>
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleSimulateExecution}
                  disabled={isExecuting}
                  className="flex items-center gap-1.5 text-xs font-bold bg-white text-black hover:bg-slate-200 px-3 py-1 rounded-xl transition-all shadow-md shadow-white/10 active:scale-95 cursor-pointer"
                >
                  <Play size={13} />
                  <span>{isExecuting ? 'Ejecutando...' : 'Ejecutar Lógica'}</span>
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="backdrop-blur-md bg-black/60 rounded-2xl border border-white/10 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre>{competency.details.sampleCode}</pre>
            </div>

            {/* Execution Output Console */}
            {executionOutput && (
              <div className="mt-3 p-4 rounded-2xl backdrop-blur-md bg-black/60 border border-blue-500/30 text-xs font-mono text-emerald-300 space-y-1 animate-in fade-in">
                <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-1.5 mb-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Terminal size={13} className="text-blue-400" /> Consola de Ejecución en Vivo
                  </span>
                  <span className="text-[10px] text-emerald-400">STATUS: OK</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">{executionOutput}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Escuela de Ingeniería Civil en Informática • PUCV</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl backdrop-blur-md bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

