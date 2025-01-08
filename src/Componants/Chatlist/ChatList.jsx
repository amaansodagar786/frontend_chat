import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatList.scss";

const ChatList = ({ currentUser, onSelectUser }) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        console.log("Current user in ChatList:", currentUser);
    
        if (currentUser) {
            const fetchUsers = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) return console.error("No token found.");
                    const { data } = await axios.get("https://backend-chat-app-qoti.onrender.com/users", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("Fetched users:", data);
                    setUsers(data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };
            fetchUsers();
        }
    }, []);
    
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token on CHATLIST page:", token);
    }, []);

    return (
        <div className="chat-list">
            <h3>Chats</h3>
            {users.length > 0 ? (
                users.map((user) => (
                    <div
                        key={user._id}
                        className="chat-list-item"
                        onClick={() => onSelectUser(user)}
                    >
                        {user.username}
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default ChatList;
