import React from 'react';
import './Home.scss';
import { Button } from '@mui/material'; // Import Material UI Button
import { FaLinkedin, FaGithub, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleResumeRedirect = () => {
    window.location.href = '/path/to/your/resume.pdf'; // Change this to the actual resume link
  };

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
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} color='blue' />
            </a>
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} color='black' />
            </a>
          </div>
        </section>

        {/* Resume Section */}
        <section className="resume">
          <Button
            
            
            onClick={handleResumeRedirect}
            className="resume-btn"
          >
            Resume
          </Button>
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
