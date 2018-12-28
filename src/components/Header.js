import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <NavLink to="/" exact className="item" activeClassName="active"> HOME </NavLink>
      <NavLink to="/about/CHOIMINJI" className="item" activeClassName="active"> ABOUT </NavLink>
      <NavLink to="/posts" className="item" activeClassName="active"> POSTS </NavLink>
    </div>
  );
};

export default Header;