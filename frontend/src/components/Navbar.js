import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ logoutHandler }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(userInfo);
    setName(parsedUser.Name);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">
          <img
            src="https://i.ytimg.com/vi/a8jfAp7woJk/maxresdefault.jpg"
            alt="Cards of Commerce"
            className="dashboard-image"
          />
          <p className="dashboard-title">Cards of Commerce</p>
        </Link>
      </div>
      <div className="navbar-links">
        <div className="nav-links">
          <Link to="/pokemon">Pokemon</Link>
          <Link to="/yu-gi-oh">Yu-Gi-Oh</Link>
          <Link to="/magic">Magic</Link>
        </div>
      </div>
      <div className="navbar-buttons">
        <div className="nav-buttons">
          <Link to="/profile">{name}</Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
