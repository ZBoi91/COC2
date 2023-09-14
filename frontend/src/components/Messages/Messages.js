import React, { useEffect, Fragment, useState } from "react";
import "../Dashboard.css";
import Navbar from "../Navbar";
import Messages2 from "./Messages2";
import { Link } from "react-router-dom";

const Messages = ({ setAuth }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [message, setMessage] = useState([]);
  const [filteredMessage, setFilteredMessage] = useState([]);
  const jwtTokenKey = "JWTToken";
  const getJWT = localStorage.getItem(jwtTokenKey);
  const currentUserID = 13;

  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout");
      console.log("Logout response:", res);
      setAuth(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/message", {
          headers: {
            Authorization: `Bearer ${getJWT}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const responseData = await res.json(); // Parse the response data once
        console.log(responseData);

        const uniqueUsers = [
          ...new Set(responseData.map((message) => message.SenderID)),
        ];
        const usersData = uniqueUsers.map((SenderID) => ({
          id: SenderID,
          // Add other user information here, such as name, from your API response
        }));

        console.log("Fetched users:", usersData);
        setUsers(usersData);
        setMessage(responseData); // Set the message state with the parsed data
        setFilteredMessage(responseData);

        // Set the messages state with all chat messages
        setMessages(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getJWT]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJWT}`,
        },
        body: JSON.stringify({
          ChatID: currentUserID,
          SenderID: currentUserID, // Set SenderID to the current user's ID
          MessageContent: messageContent,
        }),
      });
      if (res.ok) {
        console.log("Message added");

        // Fetch the updated messages from the server
        const updatedMessagesResponse = await fetch(
          "http://localhost:5000/api/message",
          {
            headers: {
              Authorization: `Bearer ${getJWT}`,
            },
          }
        );

        if (!updatedMessagesResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${updatedMessagesResponse.status}`
          );
        }

        const updatedMessagesData = await updatedMessagesResponse.json();
        console.log(updatedMessagesData);

        // Update the state with the new messages
        setMessages(updatedMessagesData);
        setFilteredMessage(updatedMessagesData);

        // Clear the message input field
        setMessageContent("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Fragment>
      <Navbar logoutHandler={logoutHandler} />
      <div className="messages-grid">
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="user-item"
            >
              {user.Name}
            </div>
          ))}
        </div>
        <div className="chat-area">
          {selectedUser && <Messages2 user={selectedUser} />}
        </div>
        {/* Message input area at the bottom */}
        <div className="message-input">
          {/* Input field for typing and sending messages */}
          <input
            type="text"
            placeholder="Type your message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="message-grid">
        {filteredMessage &&
          filteredMessage
            .slice() // Create a shallow copy of the array to avoid mutating the original array
            .sort((a, b) => a.MessageID - b.MessageID) // Sort by MessageID
            .map((message, i) => (
              <div key={i} className="message-item">
                <Link to={`/profile/${message.UserID}`}>
                  <h2>{message.Name}</h2>
                </Link>
                <p>{message.MessageContent}</p>
              </div>
            ))}
      </div>
    </Fragment>
  );
};

export default Messages;
