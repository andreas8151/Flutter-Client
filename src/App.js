//Dependencies
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//Global context
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
//Style
import "./sass/App.scss";
//Components
import Dummy from "./pages/Dummy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <header className="Appheader">
          <h1>TravelFlow</h1>
          <Navbar>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/user/:username">Profile</Link>
            <Link to="/feed"></Link>
          </Navbar>
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:username" element={<Dummy />} />
          <Route path="/feed" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
