import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from '../../App'
import Navbar from '../../components/Navbar';

test('renders navbar with wisible link children', () => {
  render(<App><Navbar>
    <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  </Navbar></App>);
  const loginLink = screen.getByText(/Login/i);
  expect(loginLink).toBeInTheDocument();
});
