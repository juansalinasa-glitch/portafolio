import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';

describe('Header component', () => {
  const mockSetActiveTab = vi.fn();
  const mockScrollTo = vi.fn();
  const mockScrollIntoView = vi.fn();
  const mockGetElementById = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock window.scrollTo
    window.scrollTo = mockScrollTo;

    // Mock document.getElementById
    document.getElementById = mockGetElementById;

    // Default mock implementation for getElementById returning an element with scrollIntoView
    mockGetElementById.mockImplementation((id: string) => {
      if (id === 'about' || id === 'skills' || id === 'contact') {
        return { scrollIntoView: mockScrollIntoView } as unknown as HTMLElement;
      }
      return null;
    });
  });

  it('renders the brand logo and text correctly', () => {
    render(<Header activeTab="overview" setActiveTab={mockSetActiveTab} />);
    expect(screen.getByText('Juan Salinas')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Header activeTab="overview" setActiveTab={mockSetActiveTab} />);
    expect(screen.getByText('Sobre Mí')).toBeInTheDocument();
    expect(screen.getByText('Competencias')).toBeInTheDocument();
    expect(screen.getByText('Laboratorio')).toBeInTheDocument();
    expect(screen.getByText('Malla PUCV')).toBeInTheDocument();
    expect(screen.getByText('CLI')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('calls setActiveTab and scrolls to top when brand logo is clicked', () => {
    render(<Header activeTab="about" setActiveTab={mockSetActiveTab} />);
    const logoButton = screen.getByText('Juan Salinas').closest('button');
    expect(logoButton).toBeInTheDocument();

    fireEvent.click(logoButton!);

    expect(mockSetActiveTab).toHaveBeenCalledWith('overview');
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('calls setActiveTab and scrolls into view when a section link like "Sobre Mí" is clicked', () => {
    render(<Header activeTab="overview" setActiveTab={mockSetActiveTab} />);
    const aboutButton = screen.getByText('Sobre Mí');

    fireEvent.click(aboutButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith('about');
    expect(mockGetElementById).toHaveBeenCalledWith('about');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('calls setActiveTab and scrolls to top when a non-section link like "Laboratorio" is clicked', () => {
    render(<Header activeTab="overview" setActiveTab={mockSetActiveTab} />);
    const labButton = screen.getByText('Laboratorio');

    fireEvent.click(labButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith('lab');
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('toggles mobile menu and renders mobile links', () => {
    render(<Header activeTab="overview" setActiveTab={mockSetActiveTab} />);

    // Initially mobile menu links might not be visible (desktop ones are, but the drawer is hidden)
    // Actually we can check for "Inicio" which is only in the mobile menu drawer in this component's data
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument();

    const toggleButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(toggleButton);

    // After click, "Inicio" should be visible
    expect(screen.getByText('Inicio')).toBeInTheDocument();

    // Clicking a link inside the mobile menu should close the menu
    const inicioButton = screen.getByText('Inicio');
    fireEvent.click(inicioButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith('overview');
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Drawer should be closed
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
  });
});
