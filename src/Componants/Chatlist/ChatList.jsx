import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatList.scss";

const ChatList = ({ currentUser, onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token in fetchUsers:", token); // Log token
                const { data } = await axios.get("https://backend-chat-app-qoti.onrender.com/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Fetched users:", data); // Log fetched users
                setUsers(data); // Set all fetched users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (currentUser) {
            console.log("Current User in ChatList:", currentUser); // Log current user
            fetchUsers();
        }
    }, [currentUser]);

    // Log users state to debug rendering
    console.log("Users in ChatList:", users);

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
