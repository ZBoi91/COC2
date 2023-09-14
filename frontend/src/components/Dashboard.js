import React, { useEffect, Fragment, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "./Navbar";
import SearchBar from "./Searchbar.js";

const Dashboard = ({ setAuth }) => {
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
        setFilteredGames(resdata); // Initialize the filtered games with all games
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Handle search functionality
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
      {/* Add the SearchBar component */}
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <div className="game-grid">
                {filteredGames &&
                  filteredGames.map((game, i) => (
                    <div key={i} className="game-item">
                      <Link to={"/profile"}>
                        <h2>{game.Name}</h2>
                      </Link>
                      <p>{game.Price}</p>
                      <img src={game.Image} alt={game.Name} />
                    </div>
                  ))}
              </div>
            </Fragment>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default Dashboard;
