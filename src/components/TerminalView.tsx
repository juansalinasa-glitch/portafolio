import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Trash2, Cpu } from 'lucide-react';
import { COMPETENCIES_DATA } from '../data/portfolioData';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const TerminalView: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="text-[#ffaaa1] font-bold">
            JUAN SALINAS CLI [Versión 2.4.0-PUCV]
          </div>
          <div className="text-slate-400">
            Ingeniería Estructural en Código • Pontificia Universidad Católica de Valparaíso
          </div>
          <div className="text-slate-500">
            Escribe <span className="text-[#ffb4ac] font-bold">help</span> para listar todos los comandos disponibles.
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    const lowerCmd = rawCmd.toLowerCase();
    const parts = lowerCmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    let output: string | React.ReactNode = '';

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-[#ffaaa1] font-bold">COMANDOS DISPONIBLES:</div>
            <div>• <span className="text-white font-mono font-bold">about</span> : Muestra la biografía y enfoque de ingeniería.</div>
            <div>• <span className="text-white font-mono font-bold">skills</span> : Lista las competencias técnicas y fundamentos.</div>
            <div>• <span className="text-white font-mono font-bold">pucv</span> : Muestra información académica y asignaturas actuales.</div>
            <div>• <span className="text-white font-mono font-bold">tree</span> : Despliega la estructura del repositorio de proyectos.</div>
            <div>• <span className="text-white font-mono font-bold">run [algo]</span> : Ejecuta simulación (ej: <span className="text-[#ffb4ac]">run quicksort</span> o <span className="text-[#ffb4ac]">run binarysearch</span>).</div>
            <div>• <span className="text-white font-mono font-bold">contact</span> : Despliega canales de contacto formal.</div>
            <div>• <span className="text-white font-mono font-bold">clear</span> : Limpia la consola.</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Juan Salinas — Estudiante de Ingeniería Civil en Informática (2do semestre, PUCV). Abordo la programación con una mentalidad estructural, estableciendo bases algorítmicas sólidas y arquitectura de software eficiente.
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-[#ffaaa1] font-bold mb-1">COMPETENCIAS TÉCNICAS:</div>
            {COMPETENCIES_DATA.map(s => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="text-white font-bold w-32 font-mono">[{s.name}]</span>
                <span className="text-slate-400">• {s.tag}</span>
                <span className="text-slate-500 font-mono text-[10px]">({s.level})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'pucv':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-[#ffaaa1] font-bold">PONTIFICIA UNIVERSIDAD CATÓLICA DE VALPARAÍSO</div>
            <div>Carrera: Ingeniería Civil en Informática (Escuela de Ing. Informática)</div>
            <div>Semestre Activo: 2do Semestre (2024)</div>
            <div>Asignaturas actuales: Programación POO, Cálculo Integral, Lógica Computacional, Física Mecánica.</div>
          </div>
        );
        break;

      case 'tree':
        output = (
          <pre className="text-xs text-emerald-400 font-mono leading-tight">{`.
├── src/
│   ├── algorithms/
│   │   ├── sorting/ (quicksort.py, mergesort.py)
│   │   └── search/ (binary_search.py)
│   ├── data_structures/
│   │   ├── stack.py
│   │   └── bst.py
│   ├── formal_logic/
│   │   └── truth_table_engine.py
│   └── pucv_projects/
└── docs/
    └── memoria_ingenieril.pdf`}</pre>
        );
        break;

      case 'run':
        if (arg === 'quicksort' || arg === 'sort') {
          output = `[RUNNING QUICKSORT O(n log n)]\nInput: [38, 27, 43, 3, 9, 82, 10]\nPivot Selected: 10\nPartitioning completed: [3, 9, 10, 27, 38, 43, 82]\nExecution Time: 0.000042s. Status: Sorted OK.`;
        } else if (arg === 'binarysearch' || arg === 'search') {
          output = `[RUNNING BINARY SEARCH O(log n)]\nTarget: 42 in [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91]\nIteration 1: mid=23 (< 42)\nIteration 2: mid=56 (> 42)\nIteration 3: mid=42 (FOUND at index 7)\nSteps: 3 comparisons.`;
        } else {
          output = `Error: Algoritmo desconocido '${arg || ''}'. Prueba con 'run quicksort' o 'run binarysearch'.`;
        }
        break;

      case 'contact':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <div>Email Institucional: <span className="text-blue-300">juan.salinas.a@mail.pucv.cl</span></div>
            <div>GitHub: <a href="https://github.com/juansalinasa-glitch" target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">github.com/juansalinasa-glitch</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/juan-salinas-acosta-0313bb41b/" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">linkedin.com/in/juan-salinas-acosta-0313bb41b</a></div>
            <div>Ubicación: Valparaíso, Chile</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = `Comando no reconocido: '${rawCmd}'. Escribe 'help' para ver la lista de comandos disponibles.`;
        break;
    }

    setHistory(prev => [
      ...prev,
      { command: rawCmd, output, timestamp: new Date().toLocaleTimeString() }
    ]);
    setInput('');
  };

  return (
    <div className="py-12 md:py-16 space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal size={16} className="text-[#ffb4ac]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#ffaaa1]">
              Consola Interactiva POSIX
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Terminal de Comandos de Ingeniería
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Interactúa directamente con el perfil y proyectos de Juan Salinas mediante comandos de consola.
          </p>
        </div>

        <button
          onClick={() => setHistory([])}
          className="px-3 py-1.5 bg-[#151b2d] hover:bg-[#1e293b] border border-[#1e293b] text-slate-400 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Trash2 size={13} />
          <span>Limpiar Consola</span>
        </button>
      </div>

      {/* Terminal Window */}
      <div className="bg-[#070d1f] rounded-2xl border border-[#1e293b] shadow-2xl overflow-hidden flex flex-col h-[480px]">
        {/* Title bar */}
        <div className="px-4 py-2.5 bg-[#0c1324] border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#991b1b]/80 border border-[#991b1b]"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-500"></div>
            <span className="font-mono text-xs text-slate-400 ml-2">salinas@pucv-arch: ~/portfolio</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            BASH 5.2.26
          </div>
        </div>

        {/* Console output stream */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs space-y-4">
          {history.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#ffaaa1] font-bold">salinas@pucv:~$</span>
                <span className="text-white font-medium">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l-2 border-[#1e293b] py-0.5">
                {typeof item.output === 'string' ? (
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{item.output}</pre>
                ) : (
                  item.output
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0c1324] border-t border-[#1e293b] flex items-center gap-2 font-mono text-xs">
          <span className="text-[#ffaaa1] font-bold pl-2">salinas@pucv:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe 'help', 'skills', 'pucv', 'tree', 'run quicksort'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-[#991b1b] hover:bg-[#b91c1c] text-white transition-colors"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>

      {/* Suggested command chips */}
      <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-slate-400">
        <span>Sugeridos:</span>
        {['help', 'skills', 'about', 'pucv', 'tree', 'run quicksort', 'contact'].map(cmd => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
            }}
            className="px-2 py-0.5 rounded bg-[#151b2d] hover:bg-[#1e293b] border border-[#1e293b] text-slate-300 hover:text-[#ffaaa1] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
