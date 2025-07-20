import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        
        <Link to="/" className="navbar-brand">
          LumiSkin AI
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/profile">Profilim</Link></li>
          {/* <li><Link to="/about">Hakkında</Link></li>*/}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;