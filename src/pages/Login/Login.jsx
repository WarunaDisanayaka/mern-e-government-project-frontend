import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you'll add custom CSS here

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const userType = "passenger"; // Add userType with default value
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors
        setLoading(false); // Set to false after authentication
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
                                            placeholder="Email"
                                            required
                                            className="form-control"
                                            value={emailOrPhone}
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

export default Login;
