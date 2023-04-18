import { render, screen } from '@testing-library/react';
import App from '../App';

test('rendered App has expected heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/TravelFlow/i);
  expect(linkElement).toBeInTheDocument();
});
