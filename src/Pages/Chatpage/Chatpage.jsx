import React, { useEffect, useState } from "react";
import socket from "../../Componants/Socket/Socket"; // Adjust the path based on your folder structure
import ChatBox from "../../Componants/Chatbox/ChatBox";
import ChatList from "../../Componants/Chatlist/ChatList";
import MessageInput from "../../Componants/Messageinput/MessageInput";
import axios from "axios";
import "./Chatpage.scss";

const Chatpage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    // Fetching the current user and emitting socket event
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUser(user);
            console.log("Current user set:", user);
            socket.emit("userConnected", user._id);
        }

        // Socket listener for incoming messages
        socket.on("receiveMessage", (message) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, message]);
        });

        // Cleanup on component unmount to avoid memory leaks
        return () => {
            console.log("Cleaning up socket listener...");
            socket.off("receiveMessage");
        };
    }, []); // Run once on component mount

    // Log the currentUser when it's updated
    useEffect(() => {
        if (currentUser) {
            console.log("Current user in Chatpage:", currentUser);
        }
    }, [currentUser]);  // Runs when currentUser is updated

    // Fetching messages when selectedUser or currentUser is available
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser && currentUser) {
                try {
                    console.log(`Fetching messages for user ${selectedUser.username}`);
                    const { data } = await axios.get(
                        `https://backend-chat-app-qoti.onrender.com/messages/${selectedUser._id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );
                    console.log("Fetched messages:", data);
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser, currentUser]);  // Runs when selectedUser or currentUser changes

    // Real-time message handling
    useEffect(() => {
        console.log("Setting up real-time socket listener...");
        
        // Socket listener for incoming messages
        socket.on("receiveMessage", (message) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, message]);
        });

        // Cleanup on component unmount or when dependencies change
        return () => {
            console.log("Cleaning up socket listener...");
            socket.off("receiveMessage");
        };
    }, [currentUser, selectedUser]); // Re-run if currentUser or selectedUser changes

    const handleSendMessage = (content) => {
        if (!currentUser || !selectedUser) {
            console.error("Cannot send message: Missing currentUser or selectedUser");
            return;
        }

        // Validate and log the IDs
        if (!currentUser.id || !selectedUser._id) {
            console.error("Invalid user IDs:", {
                currentUserId: currentUser?.id,
                selectedUserId: selectedUser?._id,
            });
            return;
        }

        const messageData = {
            senderId: currentUser.id,
            receiverId: selectedUser._id,
            content,
        };

        // Log the payload for debugging
        console.log("Payload to send:", messageData);

        // Emit the message to the server
        socket.emit("sendMessage", messageData, (response) => {
            if (response.success) {
                console.log("Message sent successfully:", messageData);
                setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
            } else {
                console.error("Message failed to send. Server response:", response);
            }
        });
    };

    return (
        <div className="chat-page">
            <ChatList currentUser={currentUser} onSelectUser={setSelectedUser} />
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
