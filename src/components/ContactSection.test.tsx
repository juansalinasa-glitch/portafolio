import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('validates empty fields and prevents submission', () => {
    render(<ContactSection />);

    const submitButton = screen.getByRole('button', { name: /enviar mensaje estructurado/i });

    // Attempt submission with empty fields
    fireEvent.click(submitButton);

    // Since the fields are empty, the form should not have changed state
    // We can verify this by checking that the success message isn't shown
    expect(screen.queryByText(/mensaje preparado con éxito/i)).not.toBeInTheDocument();
  });

  it('allows submission when fields are valid', async () => {
    render(<ContactSection />);

    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText(/ej: sofía ramírez/i), {
      target: { value: 'Test Name' },
    });

    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/describe los requerimientos/i), {
      target: { value: 'Test message content' },
    });

    const submitButton = screen.getByRole('button', { name: /enviar mensaje estructurado/i });
    fireEvent.click(submitButton);

    // Verify success state is shown
    expect(screen.getByText(/mensaje preparado con éxito/i)).toBeInTheDocument();

    // Fast-forward timers for setTimeout
    vi.advanceTimersByTime(1000);

    // Verify mailto logic
    expect(window.location.href).toContain('mailto:juan.salinas.a@mail.pucv.cl');
    expect(window.location.href).toContain('Test%20Name');
    expect(window.location.href).toContain('test%40example.com');
  });

  it('handles email copy functionality', async () => {
    render(<ContactSection />);

    const copyButton = screen.getByTitle('Copiar correo');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('juan.salinas.a@mail.pucv.cl');
  });
});
