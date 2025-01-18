import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/StartPage.css'; // Add external CSS for styling

const StartPage = ({ setEmail }) => {
    const [email, setEmailInput] = useState('');
    const navigate = useNavigate();

    const handleStart = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        setEmail(email); // Pass email to the parent/state
        navigate('/quiz');
    };

    return (
        <div className="start-page">
            <div className="welcome-container">
                <h1>Welcome to the Quiz</h1>
                <p className="description">Test your knowledge and have fun!</p>
            </div>
            <div className="email-container">
                <input
                    type="email"
                    className="email-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <button className="start-button" onClick={handleStart}>Start Quiz</button>
            </div>
        </div>
    );
};

export default StartPage;
