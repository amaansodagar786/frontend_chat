// socket.js
import { io } from "socket.io-client";

const socket = io("https://backend-chat-app-qoti.onrender.com", { transports: ["websocket"] });

export default socket;
