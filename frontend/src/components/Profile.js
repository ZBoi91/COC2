import { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";

const Profile = ({ setAuth }) => {
  const [user, setUser] = useState("");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

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
        // setFilteredGames(resdata); // Initialize the filtered games with all games
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // put location.pathname back into [] if crash

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(user);
    setUser(parsedUser);
  }, [games]);

  useEffect(() => {
    const filter = games.filter((item) => item.SellerID === user.UserID);
    setFilteredGames(filter);
  }, [games]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/COC/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
      });

      if (response.status === 200) {
        const newGames = filteredGames.filter((game) => game.CardsID !== id);
        setFilteredGames(newGames);
      } else {
        console.error(
          "Failed to delete the card. HTTP status:",
          response.status
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile">
      <Navbar logoutHandler={logoutHandler} />
      <div className="sidebar">
        <h3>{user.Name}</h3>
        <p>{user.Email}</p>
        <p>{user.Location}</p>
        <p>{user.role}</p>
        <Link to="/messages">Inbox</Link>
        <Link to="/postnewcard">Add listing</Link>
      </div>
      <div className="listItem">
        <h2>Listing</h2>
        {filteredGames.map((games, i) => (
          <div key={i} className="games-item">
            <h3>{games.Name}</h3>
            <p>{games.Price}</p>
            <p>{games.Description}</p>
            <img
              src={games.Image}
              alt={games.Name}
              style={{ maxWidth: "100px", height: "100px", maxHeight: "150px" }}
            />
            <button onClick={() => handleDelete(games.CardsID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
