import React, { useEffect, useRef } from "react";
import "./ChatBox.scss";

const ChatBox = ({ messages, selectedUser, currentUser }) => {
    const chatEndRef = useRef(null); // Ref to the last message

    // Scroll to the bottom when messages update
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                            msg.senderId === currentUser.id ? "sent" : "received"
                        }`}
                    >
                        <p className="content">{msg.content}</p>
                        <span className="timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
                {/* Empty div to act as the scroll target */}
                <div ref={chatEndRef}></div>
            </div>
        </div>
    );
};

export default ChatBox;
