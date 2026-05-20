import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app navbar', () => {
  render(<App />);
  expect(screen.getByText(/RotaToy/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Toy/i)).toBeInTheDocument();
  expect(screen.getByText(/Toys List/i)).toBeInTheDocument();
});
