import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/User/SideBar';
import TopBar from '../../components/User/TopBar';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noData, setNoData] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://localhost:3001/api/certification-requests/user/${userId}`)
            .then(response => {
                if (response.data.message === "No certification requests found for this user.") {
                    setNoData(true);
                    setRequests([]);
                } else {
                    setRequests(response.data);
                    setNoData(false);
                }
                setLoading(false);
            })
            .catch(err => {
                if (!err.response || err.response.status >= 500) {
                    setError("An error occurred. Please try again later.");
                } else {
                    setError(null); // Clear error if it’s a "No data" case
                }
                setLoading(false);
            });
    }, [userId]);

    const handleUpdateClick = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/certification-requests/${selectedRequest.id}`, selectedRequest)
            .then(response => {
                const updatedRequests = requests.map(req =>
                    req.id === selectedRequest.id ? response.data : req
                );
                setRequests(updatedRequests);
                setSuccessMessage("Request updated successfully!");
                setErrorMessage('');
                setIsModalOpen(false);
            })
            .catch(err => {
                setErrorMessage("Failed to update request.");
                setSuccessMessage('');
                console.error(err);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRequest(prevRequest => ({ ...prevRequest, [name]: value }));
    };

    const handleDelete = (index) => {
        const updatedRequests = requests.filter((_, i) => i !== index);
        setRequests(updatedRequests);
    };

    const filteredRequests = requests.filter(request =>
        request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.nic?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (noData) return <div>No certification requests found for this user.</div>;

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
                                    <h1 className="h3 mb-0 text-gray-800">Certification Requests</h1>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: "300px" }}
                                    />
                                </div>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRequests.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8">No requests found</td>
                                                </tr>
                                            ) : (
                                                filteredRequests.map((request, index) => (
                                                    <tr key={request.id}>
                                                        <td>{request.id}</td>
                                                        <td>{request.name}</td>
                                                        <td>{request.nic}</td>
                                                        <td>{request.phone}</td>
                                                        <td>{request.certificate_type}</td>
                                                        <td>{request.reason}</td>
                                                        <td>{request.status}</td>
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

export default MyRequests;
