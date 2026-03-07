import { useState, useEffect } from 'react';
import './Navbar.css';
import { MenuRounded, ClearRounded } from '@mui/icons-material';
import logo_dark from '../../assets/logo_dark.png';
import logo_light from '../../assets/logo_light.png';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleScroll = () => {
    const header = document.getElementById('header');
    if (header) {
      const headerBottom = header.getBoundingClientRect().bottom;
      setScrolledPastHeader(headerBottom <= 100);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setMenuOpen(false);
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
        {user ? (
          <li className='nav-item'>
            <li className='nav-item'><a href='#' onClick={handleLogout}>Logout</a></li>
          </li>
        ) : (
          <li className='nav-item'>
            <li className='nav-item'><a href='#' onClick={handleLogin}>Login</a></li>
          </li>
        )}
        <li className='nav-item'><a href='#contact' onClick={() => setMenuOpen(false)}>Contact</a></li>
        <li className='nav-item'><Link to='/terms' className='nav-link' onClick={() => setMenuOpen(false)}>Terms</Link></li>
      </ul>
    </nav>
  );
};
