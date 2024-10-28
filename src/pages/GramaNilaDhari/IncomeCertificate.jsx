import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import { font } from '../../fonts/font'; // Adjust the path based on your project structure

const IncomeCertificate = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [nic, setNic] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherAddress, setFatherAddress] = useState('');
    const [religion, setReligion] = useState('');
    const [age, setAge] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [isSriLankan, setIsSriLankan] = useState('');
    const [occupation, setOccupation] = useState('');
    const [sinceWhen, setSinceWhen] = useState('');
    const [purposeOfCertificate, setPurposeOfCertificate] = useState('');
    const [signature, setSignature] = useState('');
    const [district, setDistrict] = useState('');
    const [divisionalSecDivision, setDivisionalSecDivision] = useState('');
    const [gnDivision, setGnDivision] = useState('');
    const [knownToGn, setKnownToGn] = useState('');
    const [sinceWhenGn, setSinceWhenGn] = useState('');
    const [natureOfEvidence, setNatureOfEvidence] = useState('');
    const [hasRecord, setHasRecord] = useState('');
    const [publicInterest, setPublicInterest] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchNIC, setSearchNIC] = useState('');
    const [gender, setGender] = useState('');
    const [periodOfResidence, setPeriodOfResidence] = useState('');
    const [purpose, setPurpose] = useState('');
    const [remarks, setRemarks] = useState('');
    const [character, setCharacter] = useState('');
    const [IfSo, setIfSo] = useState('')


    const handleGeneratePDF = () => {
        // Collect the data from state
        const certificateData = {
            fullName,
            address,
            nic,
            fatherName,
            fatherAddress,
            religion,
            age,
            civilStatus,
            isSriLankan,
            occupation,
            sinceWhen,
            purposeOfCertificate,
            district,
            divisionalSecDivision,
            gnDivision,
            knownToGn,
            sinceWhenGn,
            natureOfEvidence,
            hasRecord,
            publicInterest,
            searchNIC,
            gender,
            periodOfResidence,
            purpose,
            remarks,
            character,
            IfSo
        };

        // Use this data to populate the HTML
        window.open(`certificate.html?${new URLSearchParams(certificateData)}`);
        console.log(certificateData)
    };



    const handleSearch = async (e) => {
        e.preventDefault();

        // Get division_id from local storage
        const divisionId = localStorage.getItem('division_id');

        if (!divisionId) {
            setErrorMessage('Division ID not found in local storage');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/${searchNIC}/${divisionId}`);
            const data = response.data;

            // Populate fields only if the data exists in the API response
            if (data) {
                setFullName(data.full_name || '');
                setAddress(data.address || '');
                setNic(data.nic || '');
                setFatherName(data.father_name || '');
                setFatherAddress(data.father_address || '');
                setReligion(data.religion || '');
                setGender(data.gender || '');
                setIsSriLankan(data.is_srilankan === 1);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrorMessage('No data found for this NIC');
        }
    };


    return (
        <div id="page-top">
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Generate  Income Certifications</h1>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">User Details</h6>
                                        </div>
                                        <div className="card-body">
                                            {/* Search NIC */}
                                            <form onSubmit={handleSearch}>
                                                <div className="form-group">
                                                    <label htmlFor="searchNIC">Search by NIC</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="searchNIC"
                                                        value={searchNIC}
                                                        onChange={(e) => setSearchNIC(e.target.value)}
                                                        placeholder="Enter NIC"

                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary mb-4">Search</button>
                                            </form>

                                            {errorMessage && (
                                                <p className="text-danger">{errorMessage}</p>
                                            )}

                                            {/* Main Form */}
                                            <form onSubmit={handleGeneratePDF}>
                                                <div className="row">
                                                    {/* Column 1 */}
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="fullName">Full Name  <br /> සම්පූර්ණ නම </label>
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
                                                            <label htmlFor="address">Address <br /> ලිපිනය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="address"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                placeholder="Enter Address"
                                                            />
                                                        </div>


                                                    </div>
                                                    {/* Column 2 */}
                                                    <div className="col-lg-6">


                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit</button>
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
    );
};

export default IncomeCertificate;
