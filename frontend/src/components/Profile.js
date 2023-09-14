import { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useLocation } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState("");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const location = useLocation();

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

  
  return (
    <div className="profile">
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
        {JSON.stringify(filteredGames)}
        {filteredGames.map((games, i) => (
          <div key={i} className="games-item">
            <h3>{games.Name}</h3>
            <p>{games.Price}</p>
            <p>{games.Description}</p>
            <img src={games.Image} alt={games.Name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
