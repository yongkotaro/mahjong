import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { MenuRounded, ClearRounded } from '@mui/icons-material';
import logo_dark from '../../assets/logo_dark.png';
import logo_light from '../../assets/logo_light.png';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={menuOpen ? 'open' : ''}>
      <a href='#home' className='logo'>
        <img src={logo_light} alt='Logo' />
      </a>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <ClearRounded /> : <MenuRounded />}
      </div>
      <ul ref={menuRef} className={menuOpen ? "open" : "close"}>
        <li className='nav-item'>
          <a href='#about' onClick={closeMenu}>About</a>
        </li>
        <li className='nav-item'>
          <a href='#home' onClick={closeMenu}>Home</a>
        </li>
        <li className='nav-item'>
          <a href='#links' onClick={closeMenu}>Links</a>
        </li>
        <li className='nav-item'>
          <a href='#contact' onClick={closeMenu}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

