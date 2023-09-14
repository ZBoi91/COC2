import React, { useEffect, Fragment, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import "../Dashboard.css";
import Navbar from "../Navbar";
import SearchBar from "../Searchbar.js";

const Magic = ({ setAuth }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]); // Store the filtered games

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:5000/auth/logout");
    console.log(res);
    setAuth(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/coc");
        const resdata = await res.json();
        setGames(resdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = games.filter((game) => game.Games === "MTG");
    setFilteredGames(filtered);
  }, [games]);

  const handleSearch = (query) => {
    const filtered = games.filter((game) =>
      game.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <Fragment>
      <Navbar logoutHandler={logoutHandler} />
      <SearchBar handleSearch={handleSearch} />
      <div className="game-grid">
        {filteredGames.map((game, i) => (
          <div key={i} className="game-item">
            <h3>{game.Name}</h3>
            <p>{game.Price}</p>
            <img src={game.Image} alt={game.Name} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Magic;
