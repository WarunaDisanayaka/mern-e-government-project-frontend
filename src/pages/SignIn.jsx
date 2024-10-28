import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/external-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login failed.');
                setSuccessMessage('');
            } else {
                const data = await response.json();
                setSuccessMessage("Login successful!");
                setErrorMessage('');
                // You might want to store the token in local storage
                localStorage.setItem('token', data.token); // assuming your API returns a token
                localStorage.setItem('userId', data.id);

                // Optionally, redirect to another page after successful login
                // window.location.href = '/dashboard'; // example redirect
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-header text-center">
                    <h4>Login</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
