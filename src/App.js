//Dependencies
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//Global context
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { UsersProvider } from "./contexts/UsersContext";
//Style
import "./sass/App.scss";
//Components
import Dummy from "./pages/Dummy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navbar/Navbar";
import Users from "./pages/Users";
import Feed from "./pages/Feed";

function App() {
  return (
    <AuthenticationProvider>
      <UsersProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:username" element={<Dummy />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </AuthenticationProvider>
  );
}

export default App;
