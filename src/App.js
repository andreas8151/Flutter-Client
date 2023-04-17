//Dependencies
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//Style
import './App.css';
//Components
import Dummy from './pages/Dummy'
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <header className='Appheader'>
        <h1>TravelFlow</h1>
        <Navbar>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/user/:username">Profile</Link>
          <Link to="/feed"></Link>
        </Navbar>


      </header>
      <Routes>
        <Route path="/" element={<Dummy />} />
        <Route path="/login" element={<Dummy />} />
        <Route path="/register" element={<Dummy />} />
        <Route path="/user/:username" element={<Dummy />} />
        <Route path="/feed" element={<Dummy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
