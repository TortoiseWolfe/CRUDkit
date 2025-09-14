import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CaptainShipCrewWithNPC from './CaptainShipCrewWithNPC';

describe('CaptainShipCrewWithNPC', () => {
  it('renders without crashing', () => {
    render(<CaptainShipCrewWithNPC />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: Add more specific tests
});
