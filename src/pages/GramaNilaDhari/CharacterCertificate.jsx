import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import { font } from '../../fonts/font'; // Adjust the path based on your project structure

const CharacterCertificate = () => {
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
                                <h1 className="h3 mb-0 text-gray-800">Generate Certifications</h1>
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
                                                        <div className="form-group">
                                                            <label htmlFor="nic">NIC <br /> ජාතික හැදුනුම්පත් අංකය </label>
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
                                                            <label htmlFor="age">Age <br /> වයස</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="age"
                                                                value={age}
                                                                onChange={(e) => setAge(e.target.value)}
                                                                placeholder="Enter Age"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="civilStatus">Civil Status <br /> විවාහක/අවිවාහක බව</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="civilStatus"
                                                                value={civilStatus}
                                                                onChange={(e) => setCivilStatus(e.target.value)}
                                                                placeholder="Enter Civil Status"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="sinceWhen">Since When <br /> ගමේ පදිංචි කාලය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="sinceWhen"
                                                                value={sinceWhenGn}
                                                                onChange={(e) => setSinceWhenGn(e.target.value)}
                                                                placeholder="Enter Since When"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="purposeOfCertificate">Purpose of Certificate <br /> සහතිකය අවශ්‍ය කරන කාරණය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="purposeOfCertificate"
                                                                value={purposeOfCertificate}
                                                                onChange={(e) => setPurposeOfCertificate(e.target.value)}
                                                                placeholder="Enter Purpose of Certificate"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="purposeOfCertificate">Other matters <br />වෙනත් කරුණු </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="purposeOfCertificate"
                                                                value={remarks}
                                                                onChange={(e) => setRemarks(e.target.value)}
                                                                placeholder="Enter other matters"
                                                            />
                                                        </div>

                                                    </div>
                                                    {/* Column 2 */}
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="district">District <br /> දිස්ත්‍රික්කය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="district"
                                                                value={district}
                                                                onChange={(e) => setDistrict(e.target.value)}
                                                                placeholder="Enter District"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="divisionalSecDivision">Divisional Secretary's Division <br /> ප්‍රාදේශීය ලේකම් කොට්ඨාශය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="divisionalSecDivision"
                                                                value={divisionalSecDivision}
                                                                onChange={(e) => setDivisionalSecDivision(e.target.value)}
                                                                placeholder="Enter Division"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="gnDivision">Grama Niladhari Division and Number <br /> ග්‍රාම නිලධාරී කොට්ඨාසය සහ අංකය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="gnDivision"
                                                                value={gnDivision}
                                                                onChange={(e) => setGnDivision(e.target.value)}
                                                                placeholder="Enter GN Division"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="knownToGn">Known to GN <br /> ඉල්ලුම්කරු/කාරිය පෞද්ගලිකව හදුනන්නේද?</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="knownToGn"
                                                                value={knownToGn}
                                                                onChange={(e) => setKnownToGn(e.target.value)}
                                                                placeholder="Known to GN"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="knownToGn">If So, Since when <br /> හදුනන්නේනම් කොපමණ කලක සිටද?</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="If So, Since when                                                                "
                                                                value={IfSo}
                                                                onChange={(e) => setIfSo(e.target.value)}
                                                                placeholder="If So, Since when                                                                "
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="sinceWhenGn">Grama Niladhari Division Period <br /> ග්‍රාම නිලධාරි කොට්ඨාසයේ පදිංචිව සිටි කාලය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="sinceWhenGn"
                                                                value={periodOfResidence}
                                                                onChange={(e) => setPeriodOfResidence(e.target.value)}
                                                                placeholder="Enter Grama Niladhari Duration"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="natureOfEvidence">Nature of Other Evidence <br /> පදිංචිව සිටි කාලය ඔප්පු කිරීම සඳහා වෙනත් සාක්ෂිවල ස්වභාවය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="natureOfEvidence"
                                                                value={natureOfEvidence}
                                                                onChange={(e) => setNatureOfEvidence(e.target.value)}
                                                                placeholder="Enter Nature of Evidence"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="hasRecord">Has the Applicant Been Convicted? <br /> ඉල්ලුම්කරු/ඉල්ලුම්කාරිය වරදකරු කර තිබේද?</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="hasRecord"
                                                                value={hasRecord}
                                                                onChange={(e) => setHasRecord(e.target.value)}
                                                                placeholder="Enter Yes/No"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="publicInterest">Any Public or Social Interest? <br /> පොදු වැඩ, සමාජ සේවා වැඩ ආදිය සම්බන්ධයෙන් ඔහු/ඇය උනන්දුයිද?</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="publicInterest"
                                                                value={publicInterest}
                                                                onChange={(e) => setPublicInterest(e.target.value)}
                                                                placeholder="Enter Yes/No"
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="isSriLankan">Is Sri Lankan <br /> ශ්‍රී ලාංකිකයෙක්ද?</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="isSriLankan"
                                                                value={isSriLankan}
                                                                onChange={(e) => setIsSriLankan(e.target.value)}
                                                                placeholder="Enter Yes/No"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="occupation">Occupation <br /> දැනට කරන රස්සාව</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="occupation"
                                                                value={occupation}
                                                                onChange={(e) => setOccupation(e.target.value)}
                                                                placeholder="Enter Occupation"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="occupation">His/her character <br /> ඔහුගේ/ඇයගේ චරිතය</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="occupation"
                                                                value={character}
                                                                onChange={(e) => setCharacter(e.target.value)}
                                                                placeholder="Enter character nature"
                                                            />
                                                        </div>

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

export default CharacterCertificate;
