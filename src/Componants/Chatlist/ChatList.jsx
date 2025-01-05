import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatList.scss";

const ChatList = ({ currentUser, onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("https://backend-chat-app-5uae.onrender.com/users");
                setUsers(data.filter((user) => user._id !== currentUser._id));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (currentUser) fetchUsers();
    }, [currentUser]);

    return (
        <div className="chat-list">
            <h3>Chats</h3>
            {users.map((user) => (
                <div
                    key={user._id}
                    className="chat-list-item"
                    onClick={() => onSelectUser(user)}
                >
                    {user.username}
                </div>
            ))}
        </div>
    );
};

export default ChatList;
