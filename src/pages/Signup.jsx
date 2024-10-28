import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setErrorMessage('');

        const userData = {
            name,
            email,
            phone,
            password
        };

        try {
            const response = await fetch('http://localhost:3001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Signup failed.');
                setSuccessMessage('');
            } else {
                const data = await response.json();
                setSuccessMessage("Account created successfully!");
                setErrorMessage('');
                // Optionally, you can reset the form fields after success
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-header text-center">
                    <h4>Sign Up</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <div className="alert alert-danger mt-2">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="alert alert-success mt-2">
                                {successMessage}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
