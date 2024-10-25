import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './adminLogin.css';

const AdminLogin = () => {
    const [email, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Predefined admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check if the entered credentials match the predefined ones
        if (email === adminEmail && password === adminPassword) {
            // Simulate successful login
            console.log('Admin login successful');
            localStorage.setItem('token', 'admin-token'); // Save a token (can be a fixed string)
            localStorage.setItem('user_role', 'admin'); // Optionally set a user role

            // Redirect to the admin home page
            navigate('/admin-home');
        } else {
            setError('Invalid admin credentials');
        }

        setLoading(false); // Stop loading spinner
    };

    return (
        <section className="login-section d-flex align-items-center justify-content-center">
            <Container className="text-center">
                <Row className="justify-content-center">
                    <Col lg="4" md="6" sm="8" xs="10">
                        <h2 className="mb-4">Admin Login</h2>

                        {error && <p className="text-danger text-center">{error}</p>}
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="mb-4">
                                <div className="input-group">
                                    <Input
                                        type="text"
                                        placeholder="Email"
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

export default AdminLogin;
