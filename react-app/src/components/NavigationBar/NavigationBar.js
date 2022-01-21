import React from 'react';
import { useDispatch, useHistory } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';

import "./Navigation.css"
const NavBar = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());

  };

  return (
    <nav className="Navbar">
      <div >
        <NavLink className="Brand_Title" to="/" exact={true} activeClassName="active">
        <div className="Brand_Title_part1">War:</div>
        <div className="Brand_Title_part2">The Card Game</div>
        </NavLink>
      </div>

      <div className="Navbar_Login_SignUp_Container">
        <div className="Navbar_Login_SignUp_Container_Com" >
          <NavLink className="Navbar_Login_SignUp_Container_Navlink" to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div className="Navbar_Login_SignUp_Container_Com">
          <div className="Navbar_Login_SignUp_Container_Navlink" onClick={onLogout}>Logout</div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
