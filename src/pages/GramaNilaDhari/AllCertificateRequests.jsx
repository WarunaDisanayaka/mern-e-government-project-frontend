import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const AllCertificateRequests = () => {
    const [certificateRequests, setCertificateRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateStatusMessage, setUpdateStatusMessage] = useState("");

    // Fetch certification requests from API based on division_id from local storage
    useEffect(() => {
        const divisionId = localStorage.getItem('division_id'); // Get division_id from local storage
        if (divisionId) {
            axios.get(`http://localhost:3001/api/certification-requests/division/${divisionId}`)
                .then(response => {
                    setCertificateRequests(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setError("Division ID not found in local storage.");
            setLoading(false);
        }
    }, []);

    // Filter certification requests based on the search term
    const filteredRequests = certificateRequests.filter(request =>
        request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.certificate_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to update the status of a certificate request
    const updateStatus = (id, newStatus) => {
        axios.put(`http://localhost:3001/api/certification-requests/${id}`, { status: newStatus })
            .then(response => {
                setCertificateRequests(certificateRequests.map(request =>
                    request.id === id ? { ...request, status: newStatus } : request
                ));
                setUpdateStatusMessage(`Status updated to "${newStatus}" for request ID ${id}`);
            })
            .catch(err => {
                setError(err.message);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div id="page-top">
                <div id="wrapper">
                    <SideBar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar />
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Certificate Requests</h1>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: "300px" }}
                                    />
                                </div>
                                {updateStatusMessage && <div className="alert alert-success">{updateStatusMessage}</div>}
                                <div className="container-fluid">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>NIC</th>
                                                <th>Phone</th>
                                                <th>Certificate Type</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Updated At</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRequests.length === 0 ? (
                                                <tr>
                                                    <td colSpan="10">No requests found</td>
                                                </tr>
                                            ) : (
                                                filteredRequests.map(request => (
                                                    <tr key={request.id}>
                                                        <td>{request.id}</td>
                                                        <td>{request.name}</td>
                                                        <td>{request.nic}</td>
                                                        <td>{request.phone}</td>
                                                        <td>{request.certificate_type}</td>
                                                        <td>{request.reason}</td>
                                                        <td>{request.status}</td>
                                                        <td>{new Date(request.created_at).toLocaleString()}</td>
                                                        <td>{new Date(request.updated_at).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => updateStatus(request.id, 'Approved')}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => updateStatus(request.id, 'Rejected')}
                                                            >
                                                                Reject
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
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
            </div>
        </div>
    );
};

export default AllCertificateRequests;
