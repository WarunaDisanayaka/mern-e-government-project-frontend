import React, { useState, useEffect } from 'react';
import SideBar from '../../components/Admin/SideBar';
import TopBar from '../../components/Admin/TopBar';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [divisionId, setDivisionId] = useState(''); // Updated to store division ID
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [gramaNiladhariDivisions, setGramaNiladhariDivisions] = useState([]);
    const [divisionErrorMessage, setDivisionErrorMessage] = useState('');

    // Fetch districts on component mount
    useEffect(() => {
        fetch('http://localhost:3001/api/districts')
            .then(response => response.json())
            .then(data => setDistricts(data))
            .catch(error => console.error('Error fetching districts:', error));
    }, []);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        // Fetch Grama Niladhari Divisions based on selected district
        fetch(`http://localhost:3001/api/grama-niladhari/${districtId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setGramaNiladhariDivisions([]); // No divisions found
                    setDivisionId(''); // Reset division id
                    setDivisionErrorMessage('No Grama Niladhari Divisions found for the selected district.');
                } else {
                    setGramaNiladhariDivisions(data); // Set divisions
                    setDivisionErrorMessage(''); // Clear error message
                }
            })
            .catch((error) => {
                console.error('Error fetching Grama Niladhari Divisions:', error);
                setDivisionErrorMessage('Error fetching Grama Niladhari Divisions. Please try again.');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !phone || !selectedDistrict || !divisionId || !password || !confirmPassword) {
            setErrorMessage('Please fill out all fields.');
            setSuccessMessage('');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setSuccessMessage('');
            return;
        }

        // Prepare data to be sent to the backend
        const accountData = {
            email,
            phone,
            division_id: divisionId, // Use division ID instead of name
            password,
        };

        // Send POST request to the backend
        fetch('http://localhost:3001/api/grama-niladhari/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Account already exists (case-insensitive)") {
                    setErrorMessage('Account with this email or phone number already exists.');
                } else if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setSuccessMessage('Account created successfully.');
                    // Reset form
                    setEmail('');
                    setPhone('');
                    setDivisionId(''); // Reset division ID
                    setPassword('');
                    setConfirmPassword('');
                    setSelectedDistrict('');
                }
            })
            .catch((error) => {
                console.error('Error creating account:', error);
                setErrorMessage('There was an error creating the account. Please try again.');
            });
    };

    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <SideBar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar />
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Create Account</h1>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Account Details</h6>
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
                                                            placeholder="Enter Email"
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
                                                            placeholder="Enter Phone Number"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="district">Select District</label>
                                                        <select
                                                            className="form-control"
                                                            id="district"
                                                            value={selectedDistrict}
                                                            onChange={handleDistrictChange}
                                                        >
                                                            <option value="">Select District</option>
                                                            {districts.map((district) => (
                                                                <option key={district.id} value={district.id}>
                                                                    {district.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {divisionErrorMessage && (
                                                        <div className="alert alert-warning">
                                                            {divisionErrorMessage}
                                                        </div>
                                                    )}

                                                    {gramaNiladhariDivisions.length > 0 && (
                                                        <div className="form-group">
                                                            <label htmlFor="divisionName">Select Grama Niladhari Division</label>
                                                            <select
                                                                className="form-control"
                                                                id="divisionName"
                                                                value={divisionId} // Updated to store division ID
                                                                onChange={(e) => setDivisionId(e.target.value)} // Update divisionId
                                                            >
                                                                <option value="">Select Division</option>
                                                                {gramaNiladhariDivisions.map((division) => (
                                                                    <option key={division.id} value={division.id}>
                                                                        {division.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="Enter Password"
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
                                                            placeholder="Confirm Password"
                                                        />
                                                    </div>

                                                    {errorMessage && (
                                                        <div className="alert alert-danger">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {successMessage && (
                                                        <div className="alert alert-success">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <button type="submit" className="btn btn-primary">
                                                        Create Account
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto"></div>
                            </div>
                        </footer>
                    </div>
                </div>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </body>
        </div>
    );
};

export default CreateAccount;
