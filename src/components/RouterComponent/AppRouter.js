import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from '../Home';
import MyBooks from '../MyBooks';
import About from '../About';
import Contact from '../Contact';
import BookDetail from "../BookComponent/BookDetail";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Login from '../userMgmtComponent/Login';
import './AppRouter.css';
import { DarkModeProvider, DarkModeContext } from '../DarkModeContext';
import WriteBook from '../WriterComponent/WriteBook';
import Signup from '../userMgmtComponent/Signup';

const AppRouter = () => {
  const [navActive, setNavActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleToggle = () => {
    setNavActive(!navActive);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  };

  return (
    <Router>
      <div>
        <nav className={`navbar ${navActive ? 'active' : ''}`}>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </button>
          <div className="navbar-logo">
          <img href="%PUBLIC_URL%/logo.png" />
          </div>
          <div className="navbar-toggle" onClick={handleToggle}>
            &#9776;
          </div>
          
          <ul className={`navbar-links ${navActive ? 'active' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            </li>
            {isLoggedIn ? (
            <li>
              <NavLink to="/MyBooks" className={({ isActive }) => isActive ? "active" : ""}>MyBooks</NavLink>
            </li>
            ):""}
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <a to="/logout" onClick={handleLogout} className={({ isActive }) => isActive ? "active" : ""}>Logout</a>
              </li>
            ) : (
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? "" : "active"}>Login</NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/write/:bookId/:chapterId" element={<WriteBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
