import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever the messages array changes
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = {
        text: messageInput,
        timestamp: new Date(),
      };

      // Update the local state
      setMessages([...messages, message]);
      setMessageInput(""); // Clear the input box after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    const urlPattern =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=_|!:,.;]*[-A-Z0-9+&@#\/%=_|])/gi;
    return text
      .replace(urlPattern, '<a href="$1" target="_blank">$1</a>')
      .replace(/\n/g, "<br>");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Message copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span
              dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
            ></span>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(message.text)}
            >
              📋
            </button>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <textarea
          id="messageInput"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        ></textarea>
        <button id="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
