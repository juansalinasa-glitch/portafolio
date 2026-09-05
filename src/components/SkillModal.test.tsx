import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SkillModal } from './SkillModal';
import { Competency } from '../types';
import React from 'react';

const mockCompetency: Competency = {
  id: 'python',
  name: 'Python Programming',
  iconType: 'python',
  description: 'Python is a high-level, interpreted programming language.',
  tag: 'Backend',
  level: 'Advanced',
  details: {
    longDescription: 'Extensive knowledge of Python.',
    keyConcepts: ['Variables', 'Loops'],
    sampleCode: 'print("Hello, World!")',
    sampleLanguage: 'python',
    pucvCourse: 'INF111',
  }
};

describe('SkillModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders nothing when competency is null', () => {
    const { container } = render(<SkillModal competency={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when competency is provided', () => {
    render(<SkillModal competency={mockCompetency} onClose={vi.fn()} />);

    expect(screen.getByText('Python Programming')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('• Advanced')).toBeInTheDocument();
    expect(screen.getByText('Extensive knowledge of Python.')).toBeInTheDocument();
    expect(screen.getByText('INF111')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Loops')).toBeInTheDocument();
    expect(screen.getByText('print("Hello, World!")')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<SkillModal competency={mockCompetency} onClose={onClose} />);

    // There are two close buttons (Header and Footer)
    const closeButtons = screen.getAllByRole('button');
    // Header Close Button
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Footer Close Button
    const footerCloseBtn = screen.getByText('Cerrar');
    fireEvent.click(footerCloseBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('handles copy to clipboard', async () => {
    render(<SkillModal competency={mockCompetency} onClose={vi.fn()} />);

    const copyButton = screen.getByText('Copiar');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('print("Hello, World!")');
    expect(screen.getByText('Copiado')).toBeInTheDocument();

    // Fast-forward 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });

  it('simulates execution for python competency', () => {
    render(<SkillModal competency={mockCompetency} onClose={vi.fn()} />);

    const executeButton = screen.getByText('Ejecutar Lógica');
    fireEvent.click(executeButton);

    expect(screen.getByText('Ejecutando...')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText('Ejecutar Lógica')).toBeInTheDocument();
    expect(screen.getByText(/EJECUTANDO PYTHON 3.12 INTERPRETER/)).toBeInTheDocument();
  });

  it('simulates execution for algoritmos competency', () => {
    const algCompetency = { ...mockCompetency, id: 'algoritmos' };
    render(<SkillModal competency={algCompetency} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('Ejecutar Lógica'));

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/ANÁLISIS ASINTÓTICO DE QUICKSORT/)).toBeInTheDocument();
  });

  it('simulates execution for logica competency', () => {
    const logCompetency = { ...mockCompetency, id: 'logica' };
    render(<SkillModal competency={logCompetency} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('Ejecutar Lógica'));

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/TABLA DE VERDAD GENERADA AUTOMÁTICAMENTE/)).toBeInTheDocument();
  });

  it('simulates execution for pseint competency', () => {
    const pseintCompetency = { ...mockCompetency, id: 'pseint' };
    render(<SkillModal competency={pseintCompetency} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('Ejecutar Lógica'));

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/EJECUCIÓN PSEINT ESTRUCTURADO/)).toBeInTheDocument();
  });

  it('simulates execution for optimizacion competency', () => {
    const optCompetency = { ...mockCompetency, id: 'optimizacion' };
    render(<SkillModal competency={optCompetency} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('Ejecutar Lógica'));

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/TEST DE ESTRUCTURA DE DATOS PILA LIFO/)).toBeInTheDocument();
  });

  it('simulates execution for default/other competency', () => {
    const defaultCompetency = { ...mockCompetency, id: 'other' };
    render(<SkillModal competency={defaultCompetency} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('Ejecutar Lógica'));

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/GCC COMPILER/)).toBeInTheDocument();
  });
});
