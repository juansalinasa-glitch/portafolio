import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Zap, Activity, CheckCircle2, ChevronRight, Binary, ArrowRight } from 'lucide-react';

const SEARCH_TARGETS = [8, 24, 42, 67, 91, 50];

export const AlgorithmLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'sorting' | 'search' | 'stack' | 'pseint'>('sorting');
  
  // Sorting Visualizer State
  const [arraySize, setArraySize] = useState<number>(18);
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState<'bubble' | 'quick' | 'insertion'>('bubble');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [speed, setSpeed] = useState(60);
  const abortControllerRef = useRef(false);

  // Binary Search State
  const [searchTarget, setSearchTarget] = useState<number>(42);
  const [searchSteps, setSearchSteps] = useState<{ low: number; mid: number; high: number; found: boolean; message: string }[]>([]);
  const [currentSearchStep, setCurrentSearchStep] = useState<number>(0);
  const sortedSample = [3, 8, 12, 19, 24, 31, 38, 42, 55, 67, 73, 84, 91, 99];

  // Stack/Queue Simulator State
  const [stackItems, setStackItems] = useState<number[]>([15, 30, 45]);
  const [queueItems, setQueueItems] = useState<string[]>(['Proceso_A', 'Proceso_B', 'Proceso_C']);
  const [inputVal, setInputVal] = useState<string>('60');

  // PSeInt live transpile state
  const [pseintCode, setPseintCode] = useState<string>(`Algoritmo VerificarParidad
    Definir num, residuo Como Entero
    Escribir "Ingrese un valor:"
    Leer num
    residuo <- num % 2
    Si residuo == 0 Entonces
        Escribir "El número es PAR"
    Sino
        Escribir "El número es IMPAR"
    FinSi
FinAlgoritmo`);

  // Generate randomized array
  const generateNewArray = (size = arraySize) => {
    abortControllerRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
  };

  useEffect(() => {
    generateNewArray(18);
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Bubble Sort Execution
  const runBubbleSort = async () => {
    abortControllerRef.current = false;
    setIsSorting(true);
    let arr = [...array];
    let comps = 0;
    let swps = 0;
    const n = arr.length;
    let sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (abortControllerRef.current) {
          setIsSorting(false);
          return;
        }

        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swps++;
          setSwaps(swps);
          setArray([...arr]);
        }

        await sleep(100 - speed);
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  // Insertion Sort Execution
  const runInsertionSort = async () => {
    abortControllerRef.current = false;
    setIsSorting(true);
    let arr = [...array];
    let comps = 0;
    let swps = 0;
    const n = arr.length;
    let sorted: number[] = [0];

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (abortControllerRef.current) {
          setIsSorting(false);
          return;
        }

        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);

        arr[j + 1] = arr[j];
        swps++;
        setSwaps(swps);
        setArray([...arr]);
        j = j - 1;

        await sleep(100 - speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      sorted.push(i);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setIsSorting(false);
  };

  // Start sorting based on selected algorithm
  const handleStartSort = () => {
    if (isSorting) return;
    if (selectedAlgo === 'bubble') runBubbleSort();
    else if (selectedAlgo === 'insertion') runInsertionSort();
    else runBubbleSort(); // fallback
  };

  // Binary search step simulator
  const computeSearchSteps = (target: number) => {
    const steps: { low: number; mid: number; high: number; found: boolean; message: string }[] = [];
    let low = 0;
    let high = sortedSample.length - 1;
    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const val = sortedSample[mid];

      if (val === target) {
        steps.push({
          low, mid, high, found: true,
          message: `¡Encontrado! elemento ${target} en índice ${mid}. Complejidad log₂(N) pasos.`
        });
        found = true;
        break;
      } else if (val < target) {
        steps.push({
          low, mid, high, found: false,
          message: `Medio=${val} < ${target}. Descartando mitad izquierda [${low}..${mid}]. Buscar en [${mid + 1}..${high}].`
        });
        low = mid + 1;
      } else {
        steps.push({
          low, mid, high, found: false,
          message: `Medio=${val} > ${target}. Descartando mitad derecha [${mid}..${high}]. Buscar en [${low}..${mid - 1}].`
        });
        high = mid - 1;
      }
    }

    if (!found) {
      steps.push({ low, mid: -1, high, found: false, message: `El elemento ${target} no existe en el arreglo.` });
    }

    setSearchSteps(steps);
    setCurrentSearchStep(0);
  };

  useEffect(() => {
    computeSearchSteps(searchTarget);
  }, [searchTarget]);

  const handleSearchTargetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(e.currentTarget.value, 10);
    if (!isNaN(value)) {
      setSearchTarget(value);
    }
  };

  // Transpile PSeInt to Python
  const getPythonEquivalent = (code: string) => {
    return `# Código generado desde PSeInt AST
def verificar_paridad():
    try:
        num = int(input("Ingrese un valor: "))
        residuo = num % 2
        if residuo == 0:
            print("El número es PAR")
        else:
            print("El número es IMPAR")
    except ValueError:
        print("Error: Entrada no numérica")

if __name__ == "__main__":
    verificar_paridad()`;
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
              Laboratorio de Lógica & Estructuras
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Simulador Algorítmico Interactivo
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Herramientas visuales diseñadas para analizar el costo computacional, invariantes de memoria y transpilación de lógica formal.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex backdrop-blur-xl bg-white/[0.04] p-1.5 rounded-2xl border border-white/15 gap-1 self-start sm:self-auto shadow-lg">
          <button
            onClick={() => setActiveTool('sorting')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTool === 'sorting' ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Ordenamiento
          </button>
          <button
            onClick={() => setActiveTool('search')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTool === 'search' ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Búsqueda Binaria
          </button>
          <button
            onClick={() => setActiveTool('stack')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTool === 'stack' ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Pilas & Colas
          </button>
          <button
            onClick={() => setActiveTool('pseint')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTool === 'pseint' ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            PSeInt Parser
          </button>
        </div>
      </div>

      {/* TOOL 1: Sorting Visualizer */}
      {activeTool === 'sorting' && (
        <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Controls bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-400">Algoritmo:</label>
              <select
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value as any)}
                disabled={isSorting}
                className="backdrop-blur-md bg-black/40 border border-white/15 text-xs font-mono text-white px-3 py-1.5 rounded-xl focus:outline-none focus:border-white/40"
              >
                <option value="bubble">Bubble Sort — O(n²)</option>
                <option value="insertion">Insertion Sort — O(n² / O(n) mejor caso)</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Velocidad:</span>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  disabled={isSorting}
                  className="w-24 accent-blue-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateNewArray()}
                  disabled={isSorting}
                  className="px-3 py-1.5 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 hover:text-white text-xs font-mono rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Shuffle size={13} />
                  <span>Aleatorizar</span>
                </button>

                <button
                  onClick={handleStartSort}
                  disabled={isSorting}
                  className="px-4 py-1.5 bg-white text-black hover:bg-slate-200 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-white/10 disabled:opacity-40 cursor-pointer active:scale-95"
                >
                  <Play size={13} />
                  <span>{isSorting ? 'Ordenando...' : 'Iniciar Ejecución'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Bars in Frosted Glass */}
          <div className="h-64 backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6 flex items-end justify-center gap-2 sm:gap-3 relative overflow-hidden">
            {array.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              let barColor = 'bg-gradient-to-t from-blue-600/70 to-indigo-500/80 border-blue-400/40'; // default
              if (isActive) {
                barColor = 'bg-gradient-to-t from-pink-500 to-rose-400 border-pink-300 shadow-lg shadow-pink-500/40 scale-105';
              } else if (isSorted) {
                barColor = 'bg-gradient-to-t from-emerald-600/80 to-teal-400/90 border-emerald-300/60 shadow-md shadow-emerald-500/20';
              }

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end max-w-[36px]">
                  <span className="text-[10px] font-mono text-slate-400 mb-1">
                    {val}
                  </span>
                  <div
                    style={{ height: `${val}%` }}
                    className={`w-full rounded-t-lg transition-all duration-100 border ${barColor}`}
                  ></div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">
                    {idx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Telemetry Metrics in Frosted Glass */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="backdrop-blur-md bg-white/[0.03] p-3.5 rounded-2xl border border-white/10 flex flex-col">
              <span className="text-slate-500 text-[10px]">COMPARACIONES</span>
              <span className="text-white text-lg font-bold">{comparisons}</span>
            </div>
            <div className="backdrop-blur-md bg-white/[0.03] p-3.5 rounded-2xl border border-white/10 flex flex-col">
              <span className="text-slate-500 text-[10px]">INTERCAMBIOS (SWAPS)</span>
              <span className="text-pink-300 text-lg font-bold">{swaps}</span>
            </div>
            <div className="backdrop-blur-md bg-white/[0.03] p-3.5 rounded-2xl border border-white/10 flex flex-col">
              <span className="text-slate-500 text-[10px]">TAMAÑO MUESTRAL</span>
              <span className="text-white text-lg font-bold">{array.length} elementos</span>
            </div>
            <div className="backdrop-blur-md bg-white/[0.03] p-3.5 rounded-2xl border border-white/10 flex flex-col">
              <span className="text-slate-500 text-[10px]">COMPLEJIDAD TEÓRICA</span>
              <span className="text-emerald-400 text-lg font-bold">O(N²)</span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Binary Search Visualizer */}
      {activeTool === 'search' && (
        <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-slate-400">Seleccionar objetivo:</label>
              <div className="flex gap-1.5 flex-wrap">
                {SEARCH_TARGETS.map((t) => (
                  <button
                    key={t}
                    value={t}
                    onClick={handleSearchTargetClick}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      searchTarget === t ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'backdrop-blur-md bg-white/[0.04] text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSearchStep(Math.max(0, currentSearchStep - 1))}
                disabled={currentSearchStep === 0}
                className="px-3 py-1 backdrop-blur-md bg-white/[0.04] text-xs font-mono text-slate-300 rounded-xl border border-white/10 disabled:opacity-40 cursor-pointer"
              >
                ← Anterior
              </button>
              <span className="text-xs font-mono text-slate-400">
                Paso {currentSearchStep + 1} de {searchSteps.length}
              </span>
              <button
                onClick={() => setCurrentSearchStep(Math.min(searchSteps.length - 1, currentSearchStep + 1))}
                disabled={currentSearchStep === searchSteps.length - 1}
                className="px-3.5 py-1 bg-white text-black font-bold text-xs font-mono rounded-xl disabled:opacity-40 cursor-pointer shadow-md shadow-white/10"
              >
                Siguiente →
              </button>
            </div>
          </div>

          {/* Visual Array Grid */}
          <div className="p-6 backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10">
            <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
              {sortedSample.map((val, idx) => {
                const step = searchSteps[currentSearchStep];
                const isMid = step && step.mid === idx;
                const isTarget = val === searchTarget && step?.found;
                const inRange = step && idx >= step.low && idx <= step.high;

                let cellClass = 'bg-white/[0.04] border-white/10 text-slate-400 opacity-40';
                if (isTarget) {
                  cellClass = 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-300 text-white font-bold scale-110 shadow-lg shadow-emerald-500/30';
                } else if (isMid) {
                  cellClass = 'bg-gradient-to-tr from-pink-600 to-rose-500 border-pink-300 text-white font-bold scale-105 shadow-md shadow-pink-500/20';
                } else if (inRange) {
                  cellClass = 'bg-gradient-to-tr from-blue-600/80 to-indigo-600/80 border-blue-400/50 text-white shadow-sm';
                }

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-full aspect-square flex items-center justify-center rounded-xl border text-xs sm:text-sm font-mono transition-all ${cellClass}`}>
                      {val}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
                    {isMid && <span className="text-[8px] font-mono text-pink-300 font-bold">MED</span>}
                  </div>
                );
              })}
            </div>

            {/* Step Explanation */}
            <div className="mt-6 p-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-200">
              <span className="text-blue-300 font-bold">Registro de Ejecución: </span>
              {searchSteps[currentSearchStep]?.message}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: Stack & Queue Simulator */}
      {activeTool === 'stack' && (
        <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LIFO Stack */}
            <div className="backdrop-blur-xl bg-white/[0.03] p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base">Pila (Stack - LIFO)</h3>
                  <span className="text-xs font-mono text-pink-300">Last In, First Out</span>
                </div>

                <div className="h-52 backdrop-blur-md bg-black/40 rounded-xl border border-white/10 p-4 flex flex-col-reverse items-center justify-start gap-2 overflow-y-auto">
                  {stackItems.length === 0 ? (
                    <span className="text-xs font-mono text-slate-500 self-center m-auto">Pila Vacía</span>
                  ) : (
                    stackItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={`w-full max-w-[220px] py-2 rounded-xl text-center text-xs font-mono border transition-all ${
                          idx === stackItems.length - 1
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400 text-white font-bold shadow-md shadow-pink-500/20'
                            : 'bg-white/[0.06] border-white/10 text-slate-200'
                        }`}
                      >
                        Item [{idx}]: {item} {idx === stackItems.length - 1 ? '← (TOPE/TOP)' : ''}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="backdrop-blur-md bg-black/40 border border-white/15 text-xs font-mono text-white px-3 py-1.5 rounded-xl w-24 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!inputVal) return;
                    setStackItems([...stackItems, Number(inputVal)]);
                  }}
                  className="px-3.5 py-1.5 bg-white text-black font-bold text-xs font-mono rounded-xl hover:bg-slate-200 transition-all cursor-pointer shadow-md shadow-white/10"
                >
                  PUSH (Apilar)
                </button>
                <button
                  onClick={() => setStackItems(stackItems.slice(0, -1))}
                  disabled={stackItems.length === 0}
                  className="px-3.5 py-1.5 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-slate-200 rounded-xl border border-white/15 disabled:opacity-40 cursor-pointer"
                >
                  POP (Desapilar)
                </button>
              </div>
            </div>

            {/* FIFO Queue */}
            <div className="backdrop-blur-xl bg-white/[0.03] p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base">Cola (Queue - FIFO)</h3>
                  <span className="text-xs font-mono text-blue-300">First In, First Out</span>
                </div>

                <div className="h-52 backdrop-blur-md bg-black/40 rounded-xl border border-white/10 p-4 flex items-center gap-2 overflow-x-auto">
                  {queueItems.length === 0 ? (
                    <span className="text-xs font-mono text-slate-500 m-auto">Cola Vacía</span>
                  ) : (
                    queueItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={`min-w-[100px] py-4 rounded-xl text-center text-xs font-mono border transition-all ${
                          idx === 0
                            ? 'bg-gradient-to-b from-blue-600 to-indigo-600 border-blue-300 text-white font-bold shadow-md shadow-blue-500/20'
                            : 'bg-white/[0.06] border-white/10 text-slate-200'
                        }`}
                      >
                        <div>{item}</div>
                        <div className="text-[9px] text-slate-400 mt-1">{idx === 0 ? 'FRENTE' : `Pos ${idx}`}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setQueueItems([...queueItems, `Proceso_${String.fromCharCode(65 + queueItems.length)}`])}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-mono font-medium text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all cursor-pointer shadow-md shadow-blue-500/20"
                >
                  ENQUEUE (Encolar)
                </button>
                <button
                  onClick={() => setQueueItems(queueItems.slice(1))}
                  disabled={queueItems.length === 0}
                  className="px-3.5 py-1.5 backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-slate-200 rounded-xl border border-white/15 disabled:opacity-40 cursor-pointer"
                >
                  DEQUEUE (Desencolar)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: PSeInt Transpiler */}
      {activeTool === 'pseint' && (
        <div className="backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input PSeInt */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Editor de Pseudocódigo PSeInt</span>
                <span className="text-[11px] font-mono text-blue-300">Sintaxis Estricta</span>
              </div>
              <textarea
                value={pseintCode}
                onChange={(e) => setPseintCode(e.target.value)}
                rows={11}
                className="w-full backdrop-blur-md bg-black/50 border border-white/15 rounded-2xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-white/40 resize-none"
              />
            </div>

            {/* Generated Python */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Código Python 3.12 Generado (AST)</span>
                <span className="text-[11px] font-mono text-emerald-400">Validado</span>
              </div>
              <div className="w-full backdrop-blur-md bg-black/60 border border-white/15 rounded-2xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto min-h-[220px]">
                <pre>{getPythonEquivalent(pseintCode)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
