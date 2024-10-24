import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const AllUsers = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // For the selected user
    const [isModalOpen, setIsModalOpen] = useState(false); // For handling modal visibility

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [selectedUser, setSelectedUser] = useState({
        full_name: "",
        address: "",
        nic: "",
        is_srilankan: false,
        income: "",
        family_members: "",
        father_name: "",
        father_address: "",
        religion: "",
        gender: "",
        language: "",
        grama_niladhari_division: "",
        is_receiving_benefits: false,
        current_jobs: ""
    });
    // Fetch users from API
    useEffect(() => {
        axios.get('http://localhost:3001/api/all')
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
        // Set the selected user data and open the modal
        setSelectedUser(user);
        setIsModalOpen(true);

    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSave = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Make the API call to update the user
        axios.put(`http://localhost:3001/api/${selectedUser.id}`, selectedUser)
            .then(response => {
                // Update userDetails array with the modified user data
                const updatedUsers = userDetails.map(user =>
                    user.id === selectedUser.id ? response.data : user // Use the updated user from the response
                );
                setUserDetails(updatedUsers);
                setSuccessMessage("User updated successfully!");
                setErrorMessage('');
                setIsModalOpen(false); // Close the modal after saving
            })
            .catch(err => {
                setErrorMessage("Failed to update user.");
                setSuccessMessage('');
                console.error(err);
            });
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("Before Change: ", selectedUser);

        setSelectedUser((prevUser) => {
            const updatedUser = {
                ...prevUser,
                [name]: type === 'checkbox' ? checked : value,
            };
            console.log("After Change: ", updatedUser);
            return updatedUser;
        });
    };



    const handleDelete = (index) => {
        const updatedUsers = userDetails.filter((_, i) => i !== index);
        setUserDetails(updatedUsers);
    };

    // Filter users based on the search term
    const filteredUsers = userDetails.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.father_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    <h1 className="h3 mb-0 text-gray-800">User Details</h1>
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
                                                <th>Full Name</th>
                                                <th>Address</th>
                                                <th>NIC</th>
                                                <th>Father Name</th>
                                                <th>Religion</th>
                                                <th>Gender</th>
                                                <th>Is Sri Lankan?</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9">No users found</td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.full_name}</td>
                                                        <td>{user.address}</td>
                                                        <td>{user.nic}</td>
                                                        <td>{user.father_name}</td>
                                                        <td>{user.religion}</td>
                                                        <td>{user.gender}</td>
                                                        <td>{user.is_srilankan ? 'Yes' : 'No'}</td>
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

                {/* Modal for updating user */}
                {isModalOpen && (
                    <div className="modal show" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document" style={{ maxHeight: "80vh", maxWidth: "50rem", overflowY: "auto" }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update User</h5>
                                    <button type="button" className="close" onClick={handleModalClose}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleModalSave}>
                                        <div className="row">
                                            {/* First Column */}
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="fullName">Full Name <br /> සම්පූර්ණ නම </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fullName"
                                                        name="full_name"
                                                        value={selectedUser?.full_name || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Full Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Address <br /> ලිපිනය </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        name="address"
                                                        value={selectedUser?.address || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Address"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="nic">NIC <br /> ජාතික හැදුනුම්පත් අංකය </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nic"
                                                        name="nic"
                                                        value={selectedUser?.nic || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter NIC"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="isSriLankan">Is Sri Lankan? <br /> ශ්‍රී ලාංකිකද?</label>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="isSriLankan"
                                                            name="is_srilankan"
                                                            checked={selectedUser?.is_srilankan || false}
                                                            onChange={(e) =>
                                                                setSelectedUser((prevUser) => ({
                                                                    ...prevUser,
                                                                    isSriLankan: e.target.checked,
                                                                }))
                                                            }
                                                        />
                                                        <label className="form-check-label" htmlFor="isSriLankan">
                                                            Yes
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="income">Income <br /> ආදායම </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="income"
                                                        name="income"
                                                        value={selectedUser?.income || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Income"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="familyMembers">No of Members in Family <br /> පවුලේ සාමාජිකයින් ගණන </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="familyMembers"
                                                        name="family_members"
                                                        value={selectedUser?.family_members || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Number of Family Members"
                                                    />
                                                </div>
                                            </div>

                                            {/* Second Column */}
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="fatherName">Father Name <br /> පියාගේ නම </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fatherName"
                                                        name="father_name"
                                                        value={selectedUser?.father_name || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Father's Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fatherAddress">Father Address <br /> පියාගේ ලිපිනය </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fatherAddress"
                                                        name="father_address"
                                                        value={selectedUser?.father_address || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Father's Address"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="religion">Religion <br /> ආගම </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="religion"
                                                        name="religion"
                                                        value={selectedUser?.religion || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Religion"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="gender">Gender <br /> ස්ත්‍රී/පුරුෂ භාවය </label>
                                                    <select
                                                        className="form-control"
                                                        id="gender"
                                                        name="gender"
                                                        value={selectedUser?.gender || ""}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="language">Language <br /> භාෂාව </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="language"
                                                        name="language"
                                                        value={selectedUser?.language || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Language"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="gramaNiladhariDivision">Grama Niladhari Division <br /> ග්‍රාම නිලධාරී වසම </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="gramaNiladhariDivision"
                                                        name="grama_niladhari_division"
                                                        value={selectedUser?.grama_niladhari_division || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Grama Niladhari Division"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="isReceivingBenefits">Is Receiving Benefits? <br /> ප්‍රතිලාභ ලබාදෙනවාද? </label>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="isReceivingBenefits"
                                                            name="is_receiving_benefits"
                                                            checked={selectedUser?.is_receiving_benefits || false}
                                                            onChange={(e) =>
                                                                setSelectedUser((prevUser) => ({
                                                                    ...prevUser,
                                                                    isReceivingBenefits: e.target.checked,
                                                                }))
                                                            }
                                                        />
                                                        <label className="form-check-label" htmlFor="isReceivingBenefits">
                                                            Yes
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="currentJobs">Current Job <br /> වර්තමාන රැකියාව </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="currentJobs"
                                                        name="current_jobs"
                                                        value={selectedUser?.current_jobs || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Current Jobs"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Error and Success Messages */}
                                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default AllUsers;
