import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders without crashing and displays the expected static content', () => {
    render(<AboutSection />);

    // Assert pillars are present - using getAllByText since titles might appear multiple times
    expect(screen.getAllByText('Mentalidad Estructural').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rigor Algorítmico').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Código Limpio y Fundamentado').length).toBeGreaterThan(0);
  });

  it('allows interaction with the pillars without crashing', async () => {
    const user = userEvent.setup();
    render(<AboutSection />);

    // Click on a pillar to simulate selection
    const pillarElements = screen.getAllByText('Rigor Algorítmico');
    await user.click(pillarElements[0]);

    // If it doesn't crash, the test passes
    // Ensure the element is still in the document
    expect(screen.getAllByText('Rigor Algorítmico').length).toBeGreaterThan(0);
  });
});
