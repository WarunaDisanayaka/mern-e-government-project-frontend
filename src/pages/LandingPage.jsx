// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            {/* Navbar */}
            <nav style={navbarStyle}>
                <h1>Village Management System</h1>
                <div>
                    <Link to="/login" style={linkStyle}>Grama Nila Dhari Login</Link>
                    <Link to="/admin" style={linkStyle}>Admin Login</Link>
                </div>
            </nav>

            {/* Main Content */}
            <header style={headerStyle}>
                <div style={overlayStyle}>
                    <h2>Welcome to the Village Management System</h2>
                    <p>
                        Streamline administrative tasks and improve transparency at the village level.
                        Manage user details, divisions, districts, and much more with ease and efficiency.
                    </p>
                    <Link to="/sign-up" style={buttonStyle}>Get Started</Link>
                </div>
            </header>

            {/* Additional Information Section */}
            <section style={infoSectionStyle}>
                <h3>Features of Our System</h3>
                <ul style={featureListStyle}>
                    <li>🌍 District and Division Management</li>
                    <li>👤 User Account Management</li>
                    <li>📜 Character Certificate Generation</li>
                    <li>🔒 Secure and Easy-to-Use Platform</li>
                </ul>
            </section>
        </div>
    );
};

// Styles
const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2C3E50',
    color: '#ECF0F1',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
};

const linkStyle = {
    color: '#ECF0F1',
    textDecoration: 'none',
    marginLeft: '15px',
    padding: '8px 15px',
    borderRadius: '5px',
    backgroundColor: '#3498DB',
    transition: 'background-color 0.3s',
};

const headerStyle = {
    position: 'relative',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("https://example.com/background-image.jpg")', // Replace with a relevant image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff'
};

const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '600px'
};

const buttonStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    marginTop: '20px',
    backgroundColor: '#E74C3C',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
};

const infoSectionStyle = {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
};

const featureListStyle = {
    listStyleType: 'none',
    padding: 0,
    fontSize: '1.1em',
    color: '#34495E',
};

export default LandingPage;
