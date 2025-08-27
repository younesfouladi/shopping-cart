import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/navbar/navbar';

// Mock the navbar components
vi.mock('../src/components/navbar/DesktopNavbar', () => ({
  default: () => <div data-testid="desktop-navbar">Desktop Navbar</div>
}));

vi.mock('../src/components/navbar/MobileNavbar', () => ({
  default: () => <div data-testid="mobile-navbar">Mobile Navbar</div>
}));

describe('Navbar Component', () => {
  it('renders both desktop and mobile navbar components', () => {
    render(<Navbar />);

    expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
  });

  it('wraps components in nav element', () => {
    render(<Navbar />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement.tagName).toBe('NAV');
  });

  it('renders mobile navbar before desktop navbar', () => {
    render(<Navbar />);

    const navElement = screen.getByRole('navigation');
    const children = Array.from(navElement.children);
    
    expect(children[0]).toHaveAttribute('data-testid', 'mobile-navbar');
    expect(children[1]).toHaveAttribute('data-testid', 'desktop-navbar');
  });

  it('contains exactly two child components', () => {
    render(<Navbar />);

    const navElement = screen.getByRole('navigation');
    expect(navElement.children).toHaveLength(2);
  });
});