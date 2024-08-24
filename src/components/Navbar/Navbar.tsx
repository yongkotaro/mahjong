import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { MenuRounded, ClearRounded } from '@mui/icons-material';
import logo_dark from '../../assets/logo_dark.png';
import logo_light from '../../assets/logo_light.png';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);

  const handleScroll = () => {
    const header = document.getElementById('header');
    if (header) {
      const headerBottom = header.getBoundingClientRect().bottom;
      setScrolledPastHeader(headerBottom <= 100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${menuOpen ? 'open' : ''} ${scrolledPastHeader ? 'over-highlights' : ''}`}>
      <a href='#home' className='logo'>
        <img src={scrolledPastHeader ? logo_light : logo_dark} alt='Logo' className="logo-image" />
      </a>
      <div
        className={`menu-icon ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
      >
        {menuOpen ? <ClearRounded /> : <MenuRounded />}
      </div>
      <ul id="nav-menu" className={menuOpen ? "open" : "close"}>
        <li className='nav-item'><a href='#highlights' onClick={() => setMenuOpen(false)}>Highlights</a></li>
        <li className='nav-item'><a href='#more' onClick={() => setMenuOpen(false)}>Resources</a></li>
        <li className='nav-item'><a href='#contact' onClick={() => setMenuOpen(false)}>Contact</a></li>
      </ul>
    </nav>
  );
};
