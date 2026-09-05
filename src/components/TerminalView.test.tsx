import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TerminalView } from './TerminalView';

describe('TerminalView Component', () => {
  it('renders the initial welcome message', () => {
    render(<TerminalView />);
    expect(screen.getByText(/JUAN SALINAS CLI/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingeniería Estructural en Código/i)).toBeInTheDocument();
  });

  const typeAndSubmitCommand = async (command: string) => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Escribe 'help'/i);
    await user.type(input, `${command}{enter}`);
  };

  it('handles "help" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('help');
    expect(screen.getByText('COMANDOS DISPONIBLES:')).toBeInTheDocument();
    expect(screen.getByText(/Muestra la biografía/i)).toBeInTheDocument();
  });

  it('handles "about" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('about');
    expect(screen.getByText(/Juan Salinas — Estudiante de Ingeniería Civil/i)).toBeInTheDocument();
  });

  it('handles "skills" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('skills');
    expect(screen.getByText('COMPETENCIAS TÉCNICAS:')).toBeInTheDocument();
  });

  it('handles "pucv" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('pucv');
    expect(screen.getByText('PONTIFICIA UNIVERSIDAD CATÓLICA DE VALPARAÍSO')).toBeInTheDocument();
    expect(screen.getByText(/Ingeniería Civil en Informática/i)).toBeInTheDocument();
  });

  it('handles "tree" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('tree');
    expect(screen.getByText(/quicksort\.py/)).toBeInTheDocument();
    expect(screen.getByText(/binary_search\.py/)).toBeInTheDocument();
  });

  it('handles "run quicksort" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('run quicksort');
    expect(screen.getByText(/RUNNING QUICKSORT/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorted OK/i)).toBeInTheDocument();
  });

  it('handles "run sort" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('run sort');
    expect(screen.getByText(/RUNNING QUICKSORT/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorted OK/i)).toBeInTheDocument();
  });

  it('handles "run binarysearch" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('run binarysearch');
    expect(screen.getByText(/RUNNING BINARY SEARCH/i)).toBeInTheDocument();
    expect(screen.getByText(/3 comparisons/i)).toBeInTheDocument();
  });

  it('handles "run search" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('run search');
    expect(screen.getByText(/RUNNING BINARY SEARCH/i)).toBeInTheDocument();
    expect(screen.getByText(/3 comparisons/i)).toBeInTheDocument();
  });

  it('handles "run" command with unknown algorithm', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('run nonexistential');
    expect(screen.getByText(/Error: Algoritmo desconocido 'nonexistential'/i)).toBeInTheDocument();
  });

  it('handles "contact" command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('contact');
    expect(screen.getByText(/juan.salinas.a@mail.pucv.cl/i)).toBeInTheDocument();
    expect(screen.getByText(/github.com\/juansalinasa-glitch/i)).toBeInTheDocument();
  });

  it('handles "clear" command by removing all history including welcome message', async () => {
    render(<TerminalView />);
    expect(screen.getByText(/JUAN SALINAS CLI/i)).toBeInTheDocument();
    await typeAndSubmitCommand('clear');
    expect(screen.queryByText(/JUAN SALINAS CLI/i)).not.toBeInTheDocument();
  });

  it('handles "clear" command using the clear button', async () => {
    render(<TerminalView />);
    const user = userEvent.setup();
    expect(screen.getByText(/JUAN SALINAS CLI/i)).toBeInTheDocument();
    const clearBtn = screen.getByRole('button', { name: /Limpiar Consola/i });
    await user.click(clearBtn);
    expect(screen.queryByText(/JUAN SALINAS CLI/i)).not.toBeInTheDocument();
  });

  it('handles unknown command', async () => {
    render(<TerminalView />);
    await typeAndSubmitCommand('gibberish');
    expect(screen.getByText(/Comando no reconocido: 'gibberish'/i)).toBeInTheDocument();
  });

  it('does nothing when input is empty or only whitespace', async () => {
    render(<TerminalView />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/Escribe 'help'/i);
    await user.type(input, '   {enter}');
    // Only the welcome message should be in the terminal output
    const historyEntries = screen.queryAllByText(/salinas@pucv:~\$/i);
    // 2 elements correspond to the prompt for input and the actual user command history which starts with 1 welcome entry
    expect(historyEntries.length).toBe(2);
  });

  it('handles suggested command chips', async () => {
    render(<TerminalView />);
    const user = userEvent.setup();
    const helpChip = screen.getByRole('button', { name: 'help' });
    await user.click(helpChip);
    const input = screen.getByPlaceholderText(/Escribe 'help'/i);
    expect(input).toHaveValue('help');
  });
});