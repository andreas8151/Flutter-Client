//Dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Style
import "./sass/App.scss";
//Components
import Dummy from "./pages/Dummy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthenticationProvider } from "./contexts/Authentication";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <header className="Appheader">
          <h1>TravelFlow</h1>
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:username" element={<Dummy />} />
          <Route path="/feed" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
