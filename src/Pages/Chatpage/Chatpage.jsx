import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "../../Componants/Chatbox/ChatBox";
import ChatList from "../../Componants/Chatlist/ChatList";  
import MessageInput from "../../Componants/Messageinput/MessageInput";
import axios from "axios";
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

    // Fetch messages for selected user
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser && currentUser) {
                try {
                    const { data } = await axios.get(
                        `https://backend-chat-app-5uae.onrender.com/messages/${selectedUser._id}`,
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                        }
                    );
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, currentUser]);

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
                            messages={messages}
                            selectedUser={selectedUser}
                            currentUser={currentUser}
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
