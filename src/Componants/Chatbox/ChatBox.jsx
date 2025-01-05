import React from "react";
import "./ChatBox.scss";

const ChatBox = ({ messages, selectedUser }) => {
    return (
        <div className="chat-box">
            <div className="chat-header">
                <h3>{selectedUser.username}</h3>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${
                            msg.senderId === selectedUser._id ? "received" : "sent"
                        }`}
                    >
                        <p>{msg.content}</p>
                        <span className="timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;