import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

const EditUserDetails = () => {
    const { id } = useParams(); // Get the user ID from the URL parameters
    const [userData, setUserData] = useState({
       
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/${id}`); // Adjust this endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Set the state with the fetched data
                setUserData({
                    fullName: data.full_name,
                    address: data.address,
                    nic: data.nic,
                    fatherName: data.father_name,
                    fatherAddress: data.father_address,
                    religion: data.religion,
                    gender: data.gender,
                    isSriLankan: data.is_srilankan,
                    income: data.income,
                    familyMembers: data.family_members,
                    language: data.language,
                    gramaNiladhariDivision: data.grama_niladhari_division,
                    isReceivingBenefits: data.is_receiving_benefits,
                    currentJobs: data.current_jobs,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setErrorMessage('Failed to load user data.');
            }
        };

        fetchUserData();
    }, [id]); // Fetch user data whenever the id changes

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'fullName', 'address', 'nic', 'fatherName',
            'fatherAddress', 'religion', 'gender',
            'income', 'familyMembers', 'language',
            'gramaNiladhariDivision', 'currentJobs'
        ];

        for (let field of requiredFields) {
            if (!userData[field]) {
                setErrorMessage('Please fill out all fields.');
                return;
            }
        }

        // Clear previous error message
        setErrorMessage('');

        // Prepare data to be sent to the backend
        const userDataToUpdate = {
            full_name: userData.fullName,
            address: userData.address,
            nic: userData.nic,
            father_name: userData.fatherName,
            father_address: userData.fatherAddress,
            religion: userData.religion,
            gender: userData.gender,
            is_srilankan: userData.isSriLankan,
            income: parseFloat(userData.income),
            family_members: parseInt(userData.familyMembers, 10),
            language: userData.language,
            grama_niladhari_division: userData.gramaNiladhariDivision,
            is_receiving_benefits: userData.isReceivingBenefits,
            current_jobs: userData.currentJobs,
        };

        try {
            const response = await fetch(`http://localhost:3001/api/update/${userData.nic}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToUpdate),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.message === "User with this NIC already exists") {
                setErrorMessage("User with this NIC already exists.");
            } else {
                // Clear form fields on successful submission
                setUserData({
                    fullName: '',
                    address: '',
                    nic: '',
                    fatherName: '',
                    fatherAddress: '',
                    religion: '',
                    gender: '',
                    isSriLankan: true,
                    income: '',
                    familyMembers: '',
                    language: '',
                    gramaNiladhariDivision: '',
                    isReceivingBenefits: false,
                    currentJobs: '',
                });
                setSuccessMessage('User updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setErrorMessage('There was an error updating the user. Please try again.');
        }
    };

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
                                    <h1 className="h3 mb-0 text-gray-800">Edit User Details</h1>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">User Details</h6>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        {/* First Column */}
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fullName">Full Name <br /> සම්පූර්ණ නම </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fullName"
                                                                    name="fullName"
                                                                    value={userData.fullName}
                                                                    onChange={handleChange}
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
                                                                    value={userData.address}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Address"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="nic">NIC <br />ජාතික හැදුනුම්පත් අංකය </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="nic"
                                                                    name="nic"
                                                                    value={userData.nic}
                                                                    onChange={handleChange}
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
                                                                        name="isSriLankan"
                                                                        checked={userData.isSriLankan}
                                                                        onChange={handleChange}
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
                                                                    value={userData.income}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Income"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="familyMembers">No of Members in Family <br /> පවුලේ සාමාජිකයින් ගණන </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="familyMembers"
                                                                    name="familyMembers"
                                                                    value={userData.familyMembers}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Number of Family Members"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Second Column */}
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fatherName">Father Name <br /> අකුණු නම </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fatherName"
                                                                    name="fatherName"
                                                                    value={userData.fatherName}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Father's Name"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="fatherAddress">Father Address <br /> අකුණු ලිපිනය </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fatherAddress"
                                                                    name="fatherAddress"
                                                                    value={userData.fatherAddress}
                                                                    onChange={handleChange}
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
                                                                    value={userData.religion}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Religion"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="gender">Gender <br /> ලිංගය </label>
                                                                <select
                                                                    className="form-control"
                                                                    id="gender"
                                                                    name="gender"
                                                                    value={userData.gender}
                                                                    onChange={handleChange}
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
                                                                    value={userData.language}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Language"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="gramaNiladhariDivision">Grama Niladhari Division <br /> ග්‍රාම නිලධාරී දිවිශාසිත </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="gramaNiladhariDivision"
                                                                    name="gramaNiladhariDivision"
                                                                    value={userData.gramaNiladhariDivision}
                                                                    onChange={handleChange}
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
                                                                        name="isReceivingBenefits"
                                                                        checked={userData.isReceivingBenefits}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <label className="form-check-label" htmlFor="isReceivingBenefits">
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="currentJobs">Current Jobs <br /> වර්තමාන රැකියා </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="currentJobs"
                                                                    name="currentJobs"
                                                                    value={userData.currentJobs}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Current Jobs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Error and Success Messages */}
                                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                                                    <button type="submit" className="btn btn-primary">Update User</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserDetails;
