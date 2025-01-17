import React, { useContext } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">ChatApp</Link>
      </div>
      <div className="navbar__links">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/chat">Chat</Link>
            <button className="navbar__logout" onClick={logout}>
              <FiLogOut style={{ backgroundColor: 'white' }} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
