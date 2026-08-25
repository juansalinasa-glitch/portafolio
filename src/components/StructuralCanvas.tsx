import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Eye, Activity, Cpu } from 'lucide-react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label: string;
  tension: number;
}

interface Edge3D {
  from: number;
  to: number;
  weight: number;
}

export const StructuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeMode, setActiveMode] = useState<'lattice' | 'tree' | 'cube'>('lattice');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({ nodes: 14, edges: 26, stressAvg: '12.4 MPa', fps: 60 });
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });
  const rotRef = useRef({ x: 0.4, y: 0.6, autoSpeed: 0.008 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    // Define 3D geometries based on mode
    let nodes: Node3D[] = [];
    let edges: Edge3D[] = [];

    const initGeometry = (mode: 'lattice' | 'tree' | 'cube') => {
      nodes = [];
      edges = [];

      if (mode === 'lattice') {
        // Geodesic / Truss Structural Lattice
        const phi = (1 + Math.sqrt(5)) / 2;
        const scale = 75;
        const rawCoords = [
          [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
          [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
          [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ];

        nodes = rawCoords.map((c, i) => ({
          x: c[0] * scale,
          y: c[1] * scale,
          z: c[2] * scale,
          label: `Nódulo [${i}]`,
          tension: 0.3 + (i % 5) * 0.15
        }));

        // Center core nodes
        nodes.push({ x: 0, y: 0, z: 0, label: 'Núcleo Central', tension: 0.95 });
        nodes.push({ x: 0, y: 80, z: 0, label: 'Pilar Superior', tension: 0.8 });

        // Connect nearby nodes (Truss)
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dz = nodes[i].z - nodes[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 185) {
              edges.push({ from: i, to: j, weight: dist });
            }
          }
        }
      } else if (mode === 'tree') {
        // Binary Search Tree in 3D
        const levels = 4;
        let idCounter = 0;

        const buildTree = (depth: number, x: number, y: number, z: number, span: number, parentIndex?: number) => {
          const currentIndex = idCounter++;
          nodes.push({
            x,
            y,
            z,
            label: `Raíz O(log n) L${depth}`,
            tension: 0.2 + depth * 0.2
          });

          if (parentIndex !== undefined) {
            edges.push({ from: parentIndex, to: currentIndex, weight: 1 });
          }

          if (depth < levels) {
            buildTree(depth + 1, x - span, y + 45, z + (depth % 2 === 0 ? 30 : -30), span * 0.55, currentIndex);
            buildTree(depth + 1, x + span, y + 45, z + (depth % 2 === 0 ? -30 : 30), span * 0.55, currentIndex);
          }
        };

        buildTree(1, 0, -80, 0, 75);
      } else {
        // Hypercube / Matrix architecture
        const s = 65;
        const coords = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
        ];

        nodes = coords.map((c, i) => ({
          x: c[0],
          y: c[1],
          z: c[2],
          label: `Matriz Memoria 0x0${i}`,
          tension: 0.4 + (i % 3) * 0.2
        }));

        const cubeEdges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
          [0, 6], [1, 7], [2, 4], [3, 5] // cross braces
        ];

        cubeEdges.forEach(([f, t]) => {
          edges.push({ from: f, to: t, weight: 1 });
        });
      }

      setMetrics(prev => ({
        ...prev,
        nodes: nodes.length,
        edges: edges.length,
        stressAvg: (nodes.reduce((acc, n) => acc + n.tension, 0) / nodes.length * 20).toFixed(1) + ' MPa'
      }));
    };

    initGeometry(activeMode);

    const render = (now: number) => {
      // FPS calculation
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setMetrics(m => ({ ...m, fps: Math.round((frameCount * 1000) / (now - lastFpsUpdate)) }));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Resize canvas to match display size
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Auto rotation
      if (isPlaying && !mouseRef.current.isDragging) {
        rotRef.current.y += rotRef.current.autoSpeed;
        rotRef.current.x += rotRef.current.autoSpeed * 0.4;
      }

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid & gradient inside the canvas
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle circular radar rings
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.stroke();

      // Transform 3D to 2D
      const rx = rotRef.current.x;
      const ry = rotRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const fov = 340;
      const projectedNodes = nodes.map((n, idx) => {
        // Y rotation
        let x1 = n.x * cosY + n.z * sinY;
        let y1 = n.y;
        let z1 = -n.x * sinY + n.z * cosY;

        // X rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Perspective projection
        const depth = z2 + 300;
        const scale = fov / Math.max(depth, 50);
        const px = cx + x2 * scale;
        const py = cy + y2 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          tension: n.tension,
          label: n.label,
          originalIndex: idx
        };
      });

      // Draw structural connecting lines (Edges)
      edges.forEach(edge => {
        const p1 = projectedNodes[edge.from];
        const p2 = projectedNodes[edge.to];
        if (!p1 || !p2) return;

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + 150) / 280));
        const avgTension = (p1.tension + p2.tension) / 2;

        // Pulse effect along beams
        const pulse = Math.sin(now * 0.003 + edge.from) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);

        // Color based on engineering stress
        if (avgTension > 0.6) {
          ctx.strokeStyle = `rgba(153, 27, 27, ${alpha * (0.6 + pulse * 0.4)})`;
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = `rgba(182, 196, 255, ${alpha * 0.45})`;
          ctx.lineWidth = 1.0;
        }
        ctx.stroke();

        // Traveling data packet along high-tension edges
        if (avgTension > 0.5 && isPlaying) {
          const t = ((now * 0.001 * (0.8 + avgTension)) % 1);
          const packetX = p1.px + (p2.px - p1.px) * t;
          const packetY = p1.py + (p2.py - p1.py) * t;
          ctx.fillStyle = '#ffb4ac';
          ctx.beginPath();
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Sort nodes by Z for depth rendering
      const sortedNodes = [...projectedNodes].sort((a, b) => a.z - b.z);

      // Draw structural nodes
      sortedNodes.forEach(p => {
        const radius = Math.max(2.5, 4.5 * p.scale);
        const isHovered = selectedNode === p.label;

        // Outer glow on critical nodes
        if (p.tension > 0.6 || isHovered) {
          ctx.fillStyle = 'rgba(153, 27, 27, 0.35)';
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main node core
        ctx.fillStyle = p.tension > 0.6 ? '#ffb4ac' : '#dce1fb';
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = p.tension > 0.6 ? '#991b1b' : '#1e293b';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw structural node labels on closest nodes
        if (p.z > 30 || isHovered) {
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillText(`N[${p.originalIndex}]`, p.px + radius + 4, p.py + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeMode, selectedNode]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDragging = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseRef.current.isDragging) return;
    const dx = e.clientX - mouseRef.current.lastX;
    const dy = e.clientY - mouseRef.current.lastY;

    rotRef.current.y += dx * 0.008;
    rotRef.current.x += dy * 0.008;

    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDragging = false;
  };

  const resetRotation = () => {
    rotRef.current = { x: 0.4, y: 0.6, autoSpeed: 0.008 };
  };

  return (
    <div className="w-full h-full relative flex flex-col backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-white/15 overflow-hidden group shadow-2xl">
      {/* Top Bar / Status */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between z-10 text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="font-mono font-medium text-[11px] tracking-wide text-slate-300">ESTRUCTURA LÓGICA 3D</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
          <span>NODOS: {metrics.nodes}</span>
          <span>VÍNCULOS: {metrics.edges}</span>
          <span className="text-purple-300">TENSIÓN: {metrics.stressAvg}</span>
          <span className="hidden sm:inline text-slate-500">{metrics.fps} FPS</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 cursor-grab active:cursor-grabbing min-h-[280px]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Floating Controls inside Canvas */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* Mode Switcher */}
          <div className="pointer-events-auto flex items-center backdrop-blur-xl bg-black/40 rounded-2xl p-1 border border-white/15 gap-1 shadow-lg">
            <button
              onClick={() => setActiveMode('lattice')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-xl transition-all ${
                activeMode === 'lattice' ? 'bg-white text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Celosía Reticular
            </button>
            <button
              onClick={() => setActiveMode('tree')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-xl transition-all ${
                activeMode === 'tree' ? 'bg-white text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Árbol Binario
            </button>
            <button
              onClick={() => setActiveMode('cube')}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-xl transition-all ${
                activeMode === 'cube' ? 'bg-white text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz 3D
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-1 backdrop-blur-xl bg-black/40 rounded-2xl p-1 border border-white/15 shadow-lg">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pausar rotación' : 'Reanudar rotación'}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={resetRotation}
              title="Centrar vista"
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Rotación libre interactiva (Arrastrar cursor)</span>
        <span className="text-blue-300">PUCV • Depto. Informática</span>
      </div>
    </div>
  );
};
