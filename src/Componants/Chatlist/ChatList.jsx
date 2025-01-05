import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatList.scss";

const ChatList = ({ currentUser, onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("https://backend-chat-app-5uae.onrender.com/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(data); // Set all fetched users directly
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (currentUser) fetchUsers();
    }, [currentUser]);

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
