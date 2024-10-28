import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../../components/Admin/SideBar';
import TopBar from '../../../components/Admin/TopBar';
import './allAccounts.css'

const AllAccounts = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState({
        id: "",
        email: "",
        phone: "",
        division_id: "",
        password: "" // Add password to selectedUser state
    });
    const [divisionId, setDivisionId] = useState('');
    const [password, setPassword] = useState('');

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

    useEffect(() => {
        axios.get('http://localhost:3001/api/all-accounts')
            .then(response => {
                setUserDetails(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser({ // Reset selectedUser state
            id: "",
            email: "",
            phone: "",
            division_id: "",
            password: ""
        });
    };

    const handleModalSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/update/${selectedUser.id}`, selectedUser)
            .then(response => {
                const updatedUsers = userDetails.map(user =>
                    user.id === selectedUser.id ? response.data : user
                );
                setUserDetails(updatedUsers);
                setSuccessMessage("Account updated successfully!");
                setErrorMessage('');
                setIsModalOpen(false);
            })
            .catch(err => {
                setErrorMessage("Failed to update account.");
                setSuccessMessage('');
                console.error(err);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleDelete = (index) => {
        const updatedUsers = userDetails.filter((_, i) => i !== index);
        setUserDetails(updatedUsers);
    };

    const filteredUsers = userDetails.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <h1 className="h3 mb-0 text-gray-800">Account Details</h1>
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
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5">No accounts found</td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => handleUpdateClick(user)}
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => handleDelete(index)}
                                                            >
                                                                Delete
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

            {/* Custom Modal */}
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <h2>Update Account</h2>
                        <form onSubmit={handleModalSave}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={selectedUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={selectedUser.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Division ID:
                                <input
                                    type="text"
                                    name="division_id"
                                    value={selectedUser.division_id}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}

                                />
                            </label>

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
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllAccounts;
