import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom whenever the messages array changes
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            const message = {
                text: messageInput,
                timestamp: Date.now(),
            };

            setMessages([...messages, message]);
            setMessageInput(''); // Clear the input box after sending
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (text) => {
        const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>').replace(/\n/g, '<br>');
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message" dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}></div>
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
                <button id="sendButton" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
