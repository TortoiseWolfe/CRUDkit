import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DraggableDice from './DraggableDice';

describe('DraggableDice', () => {
  it('renders without crashing', () => {
    render(<DraggableDice />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: Add more specific tests
});
