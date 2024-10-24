import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

const AddDivisions = () => {
    const [divisionName, setDivisionName] = useState('');
    const [divisionNumber, setDivisionNumber] = useState('');
    const [districtId, setDistrictId] = useState(''); // State for selected district
    const [districts, setDistricts] = useState([]); // State for districts
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch districts when component mounts
    useEffect(() => {
        fetch('http://localhost:3001/api/districts')
            .then((response) => response.json())
            .then((data) => {
                setDistricts(data); // Set the fetched districts to state
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
                setErrorMessage('Error fetching districts.');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!divisionName || !divisionNumber || !districtId) {
            setErrorMessage('Please fill out all fields.');
            setSuccessMessage('');
            return;
        }

        // Clear previous error and success messages
        setErrorMessage('');
        setSuccessMessage('');

        // Prepare data to be sent to the backend
        const divisionData = {
            name: divisionName,
            division_number: divisionNumber,
            district_id: districtId, // Include district_id in the request
        };

        // Send POST request to the backend
        fetch('http://localhost:3001/api/grama-niladhari', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(divisionData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Grama Niladhari Division name or division number already exists (case-insensitive)") {
                    setErrorMessage('Grama Niladhari Division name or division number already exists.');
                } else if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setSuccessMessage('Division added successfully.');
                    setDivisionName(''); // Reset form
                    setDivisionNumber('');
                    setDistrictId(''); // Reset district selection
                }
            })
            .catch((error) => {
                console.error('Error adding division:', error);
                setErrorMessage('There was an error adding the division. Please try again.');
            });
    };

    return (
        <div>
            <body id="page-top">
                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <SideBar />
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <TopBar />
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Add Grama Niladhari Division</h1>
                                </div>

                                {/* Content Row */}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Division Details</h6>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="divisionName">Grama Niladhari Division Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="divisionName"
                                                            value={divisionName}
                                                            onChange={(e) => setDivisionName(e.target.value)}
                                                            placeholder="Enter Division Name"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="divisionNumber">Division Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="divisionNumber"
                                                            value={divisionNumber}
                                                            onChange={(e) => setDivisionNumber(e.target.value)}
                                                            placeholder="Enter Division Number"
                                                        />
                                                    </div>

                                                    {/* District Selection */}
                                                    <div className="form-group">
                                                        <label htmlFor="districtSelect">Select District</label>
                                                        <select
                                                            id="districtSelect"
                                                            className="form-control"
                                                            value={districtId}
                                                            onChange={(e) => setDistrictId(e.target.value)}
                                                        >
                                                            <option value="">Select a district</option>
                                                            {districts.map((district) => (
                                                                <option key={district.id} value={district.id}>
                                                                    {district.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Display error message if validation fails */}
                                                    {errorMessage && (
                                                        <div className="alert alert-danger">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {/* Display success message if division is added */}
                                                    {successMessage && (
                                                        <div className="alert alert-success">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <button type="submit" className="btn btn-primary">
                                                        Add Division
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}

                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto"></div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}

                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/* Logout Modal*/}
                <div
                    className="modal fade"
                    id="logoutModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Ready to Leave?
                                </h5>
                                <button
                                    className="close"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Select "Logout" below if you are ready to end your current
                                session.
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <a className="btn btn-primary" href="login.html">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default AddDivisions;
