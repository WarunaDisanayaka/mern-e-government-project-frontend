import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './gramaNilaDhariLogin.css';

const GramaNilaDhariLogin = () => {
    const [email, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/grama-niladhari/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                console.log('Login successful:', data);

                // Save the token and division_id in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('division_id', data.user.division_id);

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
            setLoading(false);
        }
    };

    return (
        <section className="login-section d-flex align-items-center justify-content-center">
            <Container className="text-center">
                <Row className="justify-content-center">
                    <Col lg="4" md="6" sm="8" xs="10">
                        <h2 className="mb-4">Grama Nildhari Login</h2>

                        {error && <p className="text-danger text-center">{error}</p>}
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
    );
};

export default GramaNilaDhariLogin;
