import React, { useContext , useEffect } from 'react';
import './Home.scss';
import { Button } from '@mui/material'; // Import Material UI Button
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection
import { AuthContext } from "../../Context/AuthContext"; // Adjust path as needed
import Resume from "../../Items/Resume.pdf"; // Adjust path as needed

const Home = () => {

  const { isAuthenticated } = useContext(AuthContext); // Use context
  const navigate = useNavigate(); // Initialize the navigate function

  


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token on Home page:", token);
}, []);

  const handleChatPageRedirect = () => {
    navigate('/chat'); // Redirect to chat page
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Intro Section */}
        <section className="intro">
          <h1>Welcome to My Chat App</h1>
          <p>
            Hi, I'm <strong>Amaan</strong>, a passionate full-stack developer. This real-time chat application
            is built with the MERN stack to demonstrate my skills. Let's dive into the features!
          </p>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Real-time messaging with Socket.IO</li>
            <li>User authentication with JWT</li>
            <li>Permanent chat history storage in MongoDB</li>
            <li>Responsive and user-friendly interface</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>Contact Me</h2>
          <div className="contact-icons">
            <a href="https://wa.me/918401273528" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} color='green' />
            </a>

            <a href="mailto:sodagaramaan@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope size={30} color='black' />
            </a>
            <a href="www.linkedin.com/in/amaan-sodagar-67b640215" target="_blank" >
              <FaLinkedin size={30} color='blue' />
            </a>
            <a href="https://github.com/amaansodagar786" target="_blank" >
              <FaGithub size={30} color='black' />
            </a>
          </div>
        </section>

        {/* Resume Section */}
        
         <section className="resume">
          <a href={Resume} download="Resume-Amaan Sodagar.pdf">
            <Button className="resume-btn">Resume</Button>
          </a>
        </section>



        {/* Chat Page Button */}
        <section className="chatpage">
          <Button
            
            
            onClick={handleChatPageRedirect}
            className="chat-btn"
          >
            Go to Chat Page
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Home;
