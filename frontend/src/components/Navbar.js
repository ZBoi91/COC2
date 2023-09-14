import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          <h2>Dashboard</h2>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/pokemon">Pokemon</Link>
        <Link to="/yu-gi-oh">Yu-Gi-Oh</Link>
        <Link to="/magic">Magic</Link>
      </div>
      <div className="navbar-buttons">
        <Link to="/profile">{name}</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
