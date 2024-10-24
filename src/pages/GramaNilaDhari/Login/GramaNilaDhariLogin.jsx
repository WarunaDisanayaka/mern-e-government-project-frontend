import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './gramaNilaDhariLogin.css'; // Assuming you'll add custom CSS here

const GramaNilaDhariLogin = () => {
    const [email, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3001/api/grama-niladhari/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,  // Use the correct field name based on API requirements
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                console.log('Login successful:', data);

                // Save the token in local storage or state (if needed)
                localStorage.setItem('token', data.token);

                // Redirect to /gramaniladhari
                navigate('/gramaniladhari');
            } else {
                // Show error message
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <>
            <section className="login-section d-flex align-items-center justify-content-center">
                <Container className="text-center">
                    <Row className="justify-content-center">
                        <Col lg="4" md="6" sm="8" xs="10">
                            <h2 className="mb-4">Grama Nildhari Login</h2> {/* Added title */}

                            {error && <p className="text-danger text-center">{error}</p>} {/* Show error message */}
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-4">
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            placeholder="Email or Phone"
                                            required
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmailOrPhone(e.target.value)}
                                        />
                                    </div>
                                </FormGroup>

                                <FormGroup className="mb-4">
                                    <div className="input-group">
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </FormGroup>

                                <Button color="primary" className="w-100" type="submit" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default GramaNilaDhariLogin;
