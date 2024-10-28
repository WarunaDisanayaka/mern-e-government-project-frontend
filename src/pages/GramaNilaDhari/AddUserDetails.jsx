import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const AddUserDetails = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [nic, setNic] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherAddress, setFatherAddress] = useState('');
    const [religion, setReligion] = useState('');
    const [gender, setGender] = useState('');
    const [isSriLankan, setIsSriLankan] = useState(true);
    const [income, setIncome] = useState('');
    const [familyMembers, setFamilyMembers] = useState('');
    const [language, setLanguage] = useState('');
    const [gramaNiladhariDivision, setGramaNiladhariDivision] = useState('');
    const [isReceivingBenefits, setIsReceivingBenefits] = useState(false);
    const [currentJobs, setCurrentJobs] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [gramaNiladhariDivisions, setGramaNiladhariDivisions] = useState([]);

    useEffect(() => {
        // Fetch districts when the component mounts
        fetch('http://localhost:3001/api/districts') // Update the endpoint as needed
            .then((response) => response.json())
            .then((data) => {
                setDistricts(data); // Set the districts state
            })
            .catch((error) => console.error('Error fetching districts:', error));
    }, []);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        // Fetch Grama Niladhari Divisions based on selected district
        fetch(`http://localhost:3001/api/grama-niladhari/${districtId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');

                }
                return response.json();

            })
            .then((data) => {
                if (data.length === 0) {
                    setGramaNiladhariDivisions([]); // No divisions found
                    setGramaNiladhariDivision(''); // Reset selected Grama Niladhari Division
                    setErrorMessage('No Grama Niladhari Divisions found for the selected district.');

                } else {
                    setGramaNiladhariDivisions(data); // Set the Grama Niladhari Divisions state
                    setGramaNiladhariDivision(''); // Reset selected Grama Niladhari Division
                    setErrorMessage(''); // Clear any previous error message
                    console.log(data)

                }
            })
            .catch((error) => {
                console.error('Error fetching Grama Niladhari Divisions:', error);
                setErrorMessage('No Grama Niladhari Divisions found for the selected district.');
            });
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!fullName || !address || !nic || !fatherName || !fatherAddress || !religion || !gender || !income || !familyMembers || !language || !currentJobs) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        // Clear previous error message
        setErrorMessage('');

        // Prepare data to be sent to the backend
        const userData = {
            full_name: fullName,
            address: address,
            nic: nic,
            father_name: fatherName,
            father_address: fatherAddress,
            religion: religion,
            gender: gender,
            is_srilankan: isSriLankan,
            income: parseFloat(income),
            family_members: parseInt(familyMembers, 10),
            language: language,
            grama_niladhari_division: localStorage.getItem('division_id'),
            is_receiving_benefits: isReceivingBenefits,
            current_jobs: currentJobs,
        };

        // Send POST request to the backend
        fetch('http://localhost:3001/api/create', { // Use the provided endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === "User with this NIC already exists") {
                    setErrorMessage("User with this NIC already exists.");
                } else {
                    // Clear form fields on successful submission
                    setFullName('');
                    setAddress('');
                    setNic('');
                    setFatherName('');
                    setFatherAddress('');
                    setReligion('');
                    setGender('');
                    setIsSriLankan(true);
                    setIncome('');
                    setFamilyMembers('');
                    setLanguage('');
                    setGramaNiladhariDivision('');
                    setIsReceivingBenefits(false);
                    setCurrentJobs('');
                    setSuccessMessage('User added successfully!');
                }
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                setErrorMessage('There was an error adding the user. Please try again.');
            });

    };

    return (
        <div>
            <div id="page-top">
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
                                    <h1 className="h3 mb-0 text-gray-800">Add User Details</h1>
                                </div>

                                {/* Content Row */}
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
                                                                    value={fullName}
                                                                    onChange={(e) => setFullName(e.target.value)}
                                                                    placeholder="Enter Full Name"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="address">Address <br /> ලිපිනය </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="address"
                                                                    value={address}
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                    placeholder="Enter Address"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="nic">NIC <br />ජාතික හැදුනුම්පත් අංකය </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="nic"
                                                                    value={nic}
                                                                    onChange={(e) => setNic(e.target.value)}
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
                                                                        checked={isSriLankan}
                                                                        onChange={(e) => setIsSriLankan(e.target.checked)}
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
                                                                    value={income}
                                                                    onChange={(e) => setIncome(e.target.value)}
                                                                    placeholder="Enter Income"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="familyMembers">No of Members in Family <br /> පවුලේ සාමාජිකයින් ගණන </label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id="familyMembers"
                                                                    value={familyMembers}
                                                                    onChange={(e) => setFamilyMembers(e.target.value)}
                                                                    placeholder="Enter Number of Family Members"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="language">Language <br /> භාවිතා කරන භාෂාව  </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="language"
                                                                    value={language}
                                                                    onChange={(e) => setLanguage(e.target.value)}
                                                                    placeholder="Enter Primary Language"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Second Column */}
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor="fatherName">Father's Name <br /> පියාගේ නම </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fatherName"
                                                                    value={fatherName}
                                                                    onChange={(e) => setFatherName(e.target.value)}
                                                                    placeholder="Enter Father's Name"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="fatherAddress">Father's Address <br />පියාගේ ලිපිනය </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fatherAddress"
                                                                    value={fatherAddress}
                                                                    onChange={(e) => setFatherAddress(e.target.value)}
                                                                    placeholder="Enter Father's Address"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="religion">Religion <br /> ආගම </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="religion"
                                                                    value={religion}
                                                                    onChange={(e) => setReligion(e.target.value)}
                                                                    placeholder="Enter Religion"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="gender">Gender <br /> ස්ත්‍රී/පුරුෂ භාවය </label>
                                                                <select
                                                                    className="form-control"
                                                                    id="gender"
                                                                    value={gender}
                                                                    onChange={(e) => setGender(e.target.value)}
                                                                >
                                                                    <option value="">Select Gender</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>



                                                            <div className="form-group">
                                                                <label htmlFor="isReceivingBenefits">Is Receiving Benefits? <br /> ආධාර ලබන්නෙද?</label>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id="isReceivingBenefits"
                                                                        checked={isReceivingBenefits}
                                                                        onChange={(e) => setIsReceivingBenefits(e.target.checked)}
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
                                                                    value={currentJobs}
                                                                    onChange={(e) => setCurrentJobs(e.target.value)}
                                                                    placeholder="Enter Current Jobs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                                    <button type="submit" className="btn btn-primary">Add User</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End of Page Content */}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AddUserDetails;
