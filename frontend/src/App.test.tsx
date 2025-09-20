import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Luni app', () => {
  render(<App />);
  const luniElement = screen.getByText(/Luni/i);
  expect(luniElement).not.toBeNull();
});
