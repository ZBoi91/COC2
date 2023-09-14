import React, { Component } from "react";

class Messages2 extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: "",
    };
  }

  handleChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { messages, newMessage } = this.state;

    // Add the new message to the messages array
    this.setState({
      messages: [...messages, { text: newMessage, sender: "You" }],
      newMessage: "",
    });
  };

  render() {
    const { messages, newMessage } = this.state;

    return (
      <div className="chat-box">
        <div className="message-list">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "You" ? "user" : "other"
              }`}
            >
              <span className="sender">{message.sender}: </span>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Messages2;
