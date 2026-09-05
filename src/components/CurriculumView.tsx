import React, { useState, useCallback } from 'react';
import { ACADEMIC_COURSES } from '../data/portfolioData';
import { AcademicCourse } from '../types';
import { GraduationCap, Clock, Bookmark, Layers, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<AcademicCourse | null>(null);

  const handleCourseClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const code = e.currentTarget.getAttribute('data-code');
    if (code) {
      const course = ACADEMIC_COURSES.find(c => c.code === code);
      if (course) {
        setSelectedCourse(course);
      }
    }
  }, []);

  const filteredCourses = selectedSemester === 'all'
    ? ACADEMIC_COURSES
    : ACADEMIC_COURSES.filter(c => c.semester === selectedSemester);

  const getStatusBadge = (status: AcademicCourse['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 backdrop-blur-md bg-emerald-500/10 border border-emerald-400/25 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 size={12} className="text-emerald-400" /> Aprobada
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-300 backdrop-blur-md bg-blue-500/10 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
            <Clock size={12} className="text-blue-400 animate-pulse" /> Cursando (2do Semestre)
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 backdrop-blur-md bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full">
            <Bookmark size={12} /> Próximo
          </span>
        );
    }
  };

  const getCategoryColor = (category: AcademicCourse['category']) => {
    switch (category) {
      case 'programming': return 'text-blue-300 border-blue-400/30 bg-blue-500/10';
      case 'math': return 'text-purple-300 border-purple-400/30 bg-purple-500/10';
      case 'hardware': return 'text-amber-300 border-amber-400/30 bg-amber-500/10';
      case 'engineering': return 'text-pink-300 border-pink-400/30 bg-pink-500/10';
      default: return 'text-slate-300 border-white/10 bg-white/[0.04]';
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={16} className="text-blue-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
              Plan de Estudios PUCV
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Malla Curricular & Formación
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Ingeniería Civil en Informática — Pontificia Universidad Católica de Valparaíso (Escuela de Ingeniería Informática).
          </p>
        </div>

        {/* Filter */}
        <div className="flex backdrop-blur-xl bg-white/[0.04] p-1.5 rounded-2xl border border-white/15 gap-1 self-start sm:self-auto text-xs font-mono shadow-lg">
          <button
            onClick={() => setSelectedSemester('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedSemester === 'all' ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedSemester(1)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedSemester === 1 ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Semestre 1
          </button>
          <button
            onClick={() => setSelectedSemester(2)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedSemester === 2 ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Semestre 2 (Actual)
          </button>
          <button
            onClick={() => setSelectedSemester(3)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedSemester === 3 ? 'bg-white text-black font-bold shadow-md shadow-white/10' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Semestre 3
          </button>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.code}
            data-code={course.code}
            onClick={handleCourseClick}
            className="backdrop-blur-xl bg-white/[0.04] hover:bg-white/[0.08] p-6 rounded-3xl border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group shadow-xl hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs text-blue-300 font-semibold backdrop-blur-md bg-white/[0.04] px-2.5 py-1 rounded-xl border border-white/10">
                  {course.code}
                </span>
                {getStatusBadge(course.status)}
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors mb-2">
                {course.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {course.description}
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className={`px-2.5 py-1 rounded-xl backdrop-blur-md border ${getCategoryColor(course.category)}`}>
                {course.category.toUpperCase()}
              </span>

              <span className="text-slate-400">
                Semestre {course.semester} • {course.credits} Créditos
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Pillars Card */}
      <div className="backdrop-blur-2xl bg-white/[0.04] p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5">
          <h4 className="font-bold text-white text-base">Fundamentación de la Escuela de Informática PUCV</h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            La formación en la PUCV integra ciencias exactas, rigor en estructuras algorítmicas e ingeniería de software para resolver desafíos tecnológicos complejos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-5 py-2.5 backdrop-blur-md bg-white/[0.05] rounded-2xl border border-white/15">
            <span className="font-mono text-white font-bold text-sm block">PUCV</span>
            <span className="text-[10px] text-blue-300 font-mono tracking-wider">ACREDITADA 7 AÑOS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

