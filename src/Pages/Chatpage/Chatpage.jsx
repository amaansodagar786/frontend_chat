import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "../../Componants/Chatbox/ChatBox";
import ChatList from "../../Componants/Chatlist/ChatList";  
import MessageInput from "../../Componants/Messageinput/MessageInput";
import "./Chatpage.scss";

const socket = io("https://backend-chat-app-5uae.onrender.com");

const Chatpage = () => {
    const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
    const [selectedUser, setSelectedUser] = useState(null); // Selected user to chat with
    const [messages, setMessages] = useState([]); // Chat messages

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); // Assuming user details are stored in localStorage
        if (user) {
            setCurrentUser(user);
            socket.emit("userConnected", user._id);
        }

        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = (content) => {
        if (!currentUser || !selectedUser) return;

        const messageData = {
            senderId: currentUser._id,
            receiverId: selectedUser._id,
            content,
        };

        socket.emit("sendMessage", messageData);

        // Add message to local state
        setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
    };

    return (
        <div className="chat-page">
            <ChatList 
                currentUser={currentUser} 
                onSelectUser={setSelectedUser} 
            />
            <div className="chat-container">
                {selectedUser ? (
                    <>
                        <ChatBox 
                            messages={messages.filter(
                                (msg) =>
                                    (msg.senderId === currentUser._id &&
                                        msg.receiverId === selectedUser._id) ||
                                    (msg.senderId === selectedUser._id &&
                                        msg.receiverId === currentUser._id)
                            )}
                            selectedUser={selectedUser}
                        />
                        <MessageInput onSendMessage={handleSendMessage} />
                    </>
                ) : (
                    <div className="no-chat-selected">Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
};

export default Chatpage;