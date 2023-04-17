//Dependencies
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//Style
import './App.css';
//Components
import Dummy from './pages/Dummy'

function App() {
  return (
    <BrowserRouter>
      <header className='Appheader'>

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
