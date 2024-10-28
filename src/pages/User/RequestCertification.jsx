import React, { useState, useEffect } from 'react';
import SideBar from '../../components/User/SideBar';
import TopBar from '../../components/User/TopBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const RequestCertification = () => {
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [phone, setPhone] = useState('');
    const [certificateType, setCertificateType] = useState('');
    const [reason, setReason] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [gramaNiladhariDivisions, setGramaNiladhariDivisions] = useState([]);
    const [divisionId, setDivisionId] = useState('');
    const [divisionErrorMessage, setDivisionErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
                    setGramaNiladhariDivisions([]);
                    setDivisionId('');
                    setDivisionErrorMessage('No Grama Niladhari Divisions found for the selected district.');
                } else {
                    setGramaNiladhariDivisions(data);
                    setDivisionErrorMessage('');
                }
            })
            .catch((error) => {
                console.error('Error fetching Grama Niladhari Divisions:', error);
                setDivisionErrorMessage('Error fetching Grama Niladhari Divisions. Please try again.');
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve userId from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setErrorMessage("User not logged in. Please log in to submit the request.");
            return;
        }

        const requestData = {
            name,
            nic,
            phone,
            certificateType,
            reason,
            divisionId,
            userId
        };

        try {
            const response = await fetch('http://localhost:3001/api/request-certification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Request failed.');
                setSuccessMessage('');
            } else {
                const data = await response.json();
                setSuccessMessage("Certification request submitted successfully!");
                setErrorMessage('');
                setName('');
                setNic('');
                setPhone('');
                setCertificateType('');
                setReason('');
                setDivisionId('');
                setSelectedDistrict('');
                setGramaNiladhariDivisions([]);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
            console.error("Request error:", error);
        }
    };

    return (
        <body id="page-top">
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Request Certification</h1>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Certification Request Details</h6>
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
                                                    <label htmlFor="nic">NIC</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nic"
                                                        value={nic}
                                                        onChange={(e) => setNic(e.target.value)}
                                                        placeholder="Enter your NIC"
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
                                                    <label htmlFor="certificateType">Certificate Type</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="certificateType"
                                                        value={certificateType}
                                                        onChange={(e) => setCertificateType(e.target.value)}
                                                        placeholder="Enter certificate type"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="reason">Reason for Request</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="reason"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        placeholder="Enter reason for request"
                                                        required
                                                    ></textarea>
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
                                                            value={divisionId}
                                                            onChange={(e) => setDivisionId(e.target.value)}
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
                                                    Submit Request
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
    );
};

export default RequestCertification;
