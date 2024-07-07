// AppRouter.js
import React, { useState,useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import BookDetail from "../BookComponent/BookDetail";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import "./AppRouter.css"
import { DarkModeProvider,DarkModeContext  } from '../DarkModeContext';
import WriteBook from '../WriterComponent/WriteBook';
const AppRouter = () => {
  const [navActive, setNavActive] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const handleToggle = () => {
    setNavActive(!navActive);
  };
 

  return (
    <Router>
      <div>
        <nav className={`navbar ${navActive ? 'active' : ''}`}>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </button>
          <div className="navbar-logo">
          </div>
          <div className="navbar-toggle" onClick={handleToggle}>
            &#9776; {/* Unicode character for hamburger menu */}
          </div>
          
          <ul className={`navbar-links ${navActive ? 'active' : ''}`}>
            
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "active" : ""} 
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "active" : ""} 
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "active" : ""} 
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write/:bookId/:chapterId" element={<WriteBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>

  );
};

export default AppRouter;