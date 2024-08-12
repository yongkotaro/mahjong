import React, { useState } from 'react';
import './Navbar.css';
import { MenuRounded, ClearRounded, ModeNightRounded, LightModeRounded } from '@mui/icons-material';
import logo_dark from '../../assets/logo_dark.png';
import logo_light from '../../assets/logo_light.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav>
      <a href='/' className='logo'>
        <img src={logo_light} alt='' />
      </a>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <ClearRounded /> : <MenuRounded />}
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li className='nav-item'>
          <a href='#about' onClick={closeMenu}>About</a>
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


export default Navbar