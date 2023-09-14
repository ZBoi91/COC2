import React, { Fragment, useState, useRef, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile";
import Pokemon from "./components/CardsPages/Pokemon";
import YuGiOh from "./components/CardsPages/YuGiOh";
import Magic from "./components/CardsPages/Magic";
import Messages2 from "./components/Messages/Messages2";
import PostNewCard from "./components/PostNewCard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  function ProfilePage({ match }) {
    const userId = match.params.userId;
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch(`/api/users/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }, [userId]);
  }

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/login" // Remove 'exact' since 'exact' isn't needed when using 'Routes'
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" /> // Change from <redirect to="/dashboard" />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/register" // Remove 'exact'
              element={
                isAuthenticated ? (
                  <Navigate to="/login" /> // Change from <redirect to="login" />
                ) : (
                  <Register setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/dashboard" // Remove 'exact'
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" /> // Change from <redirect to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" /> // Change from <redirect to="/login" />
                )
              }
            />
            <Route
              path="/pokemon"
              element={
                isAuthenticated ? (
                  <Pokemon setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" /> // Change from <redirect to="/login" />
                )
              }
            />
            <Route
              path="/yu-gi-oh"
              element={
                isAuthenticated ? (
                  <YuGiOh setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" /> // Change from <redirect to="/login" />
                )
              }
            />
            <Route
              path="/magic"
              element={
                isAuthenticated ? (
                  <Magic setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" /> // Change from <redirect to="/login" />
                )
              }
            />
            <Route
              path="/messages"
              element={
                isAuthenticated ? (
                  <Messages setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/messages2"
              element={
                isAuthenticated ? (
                  <Messages2 setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/postnewcard"
              element={
                isAuthenticated ? (
                  <PostNewCard setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
