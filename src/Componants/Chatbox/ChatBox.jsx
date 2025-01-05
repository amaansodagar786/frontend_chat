const ChatBox = ({ messages, selectedUser, currentUser }) => {
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
                            msg.senderId === currentUser._id ? "sent" : "received"
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
