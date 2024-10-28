import React, { useState } from 'react';
import SideBar from '../components/Admin/SideBar';
import TopBar from '../components/Admin/TopBar';

const AddDistrict = () => {
    const [districtName, setDistrictName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!districtName.trim()) {
            setErrorMessage('District name is required.');
            setSuccessMessage(''); // Clear any previous success message
            return;
        }

        // Clear error and success messages if the name is valid
        setErrorMessage('');
        setSuccessMessage('');

        // Prepare the data to be sent to the backend
        const districtData = { name: districtName };

        // Send POST request to the backend
        fetch('http://localhost:3001/api/districts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(districtData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "District name already exists (case-insensitive)") {
                    // Display specific error message for duplicate district name
                    setErrorMessage('District name already exists.');
                } else if (data.error) {
                    // Handle other backend errors
                    setErrorMessage(data.error);
                } else {
                    // If the district is successfully added, display a success message
                    setSuccessMessage('District added successfully.');
                    setDistrictName(''); // Reset the form
                }
            })
            .catch((error) => {
                // Handle any network or unexpected errors
                console.error('Error adding district:', error);
                setErrorMessage('There was an error adding the district. Please try again.');
            });
    };


    return (
        <div>
            <body id="page-top">
                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/*  <!-- Sidebar --> */}
                    <SideBar />
                    {/*  <!-- End of Sidebar --> */}

                    {/*  <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/*  <!-- Main Content --> */}
                        <div id="content">
                            {/*  <!-- Topbar --> */}
                            <TopBar />
                            {/*  <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">
                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Add District</h1>
                                </div>

                                {/*  <!-- Content Row --> */}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">District Details</h6>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="districtName">District Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="districtName"
                                                            value={districtName}
                                                            onChange={(e) => setDistrictName(e.target.value)}
                                                            placeholder="Enter District Name"
                                                        />
                                                    </div>

                                                    {/* Display error message if validation fails */}
                                                    {errorMessage && (
                                                        <div className="alert alert-danger">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {/* Display success message if the district is added */}
                                                    {successMessage && (
                                                        <div className="alert alert-success">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <button type="submit" className="btn btn-primary">
                                                        Add District
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*   <!-- /.container-fluid --> */}
                        </div>
                        {/*   <!-- End of Main Content --> */}

                        {/* <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto"></div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}
                    </div>
                    {/*  <!-- End of Content Wrapper --> */}
                </div>
                {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
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

export default AddDistrict;
