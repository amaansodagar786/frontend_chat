import React, { useEffect, useRef } from "react";
import "./ChatBox.scss";

const ChatBox = ({ messages, selectedUser, currentUser }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        console.log("Full Messages Array:", messages);
        console.log("Selected User:", selectedUser);
        console.log("Current User:", currentUser);

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
                {messages.map((msg, index) => {
                   
                    // const senderId =  msg.sender  ; // Adjust as needed
                    const senderId = msg.senderId || msg.sender; // Handle both cases
                   
                    console.log(
                        `Message ${index}: SenderId ${
                            msg.sender || senderId ||'Unknown'
                        }, CurrentUserId ${currentUser.id}`
                      );
                      

                    return (
                        <div
                            key={index}
                            className={`message ${
                                senderId === currentUser.id ? "sent" : "received"
                            }`}
                        >
                            <p className="content">{msg.content}</p>
                            <span className="timestamp">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    );
                })}
                <div ref={chatEndRef}></div>
            </div>
        </div>
    );
};

export default React.memo(ChatBox);
