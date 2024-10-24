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
    const [gender, setGender] = useState('');
    const [isSriLankan, setIsSriLankan] = useState(true);
    const [district, setDistrict] = useState('');
    const [divisionalSecDivision, setDivisionalSecDivision] = useState('');
    const [gnDivision, setGnDivision] = useState('');
    const [knownToGn, setKnownToGn] = useState('');
    const [sinceWhen, setSinceWhen] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [occupation, setOccupation] = useState('');
    const [periodOfResidence, setPeriodOfResidence] = useState('');
    const [purpose, setPurpose] = useState('');
    const [remarks, setRemarks] = useState('');
    const [searchNIC, setSearchNIC] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/api/${searchNIC}`);
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
                // Only fill other fields if they exist in the response
                // The rest of the form fields remain as is
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrorMessage('No data found for this NIC');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const doc = new jsPDF();

        // Add the font to the PDF
        doc.addFileToVFS("NotoSansSinhala-Thin.ttf", font);
        doc.addFont("NotoSansSinhala-Thin.ttf", "NotoSansSinhala-Thin", "normal");
        doc.setFont("NotoSansSinhala-Thin");

        // Title and basic setup
        doc.setFontSize(16);
        doc.text('Certificate of Residence and Character', 105, 10, { align: 'center' });
        doc.setFontSize(10);
        doc.text('Issued by Grama Niladhari', 105, 15, { align: 'center' });

        // Define the line height and starting y-position
        let lineHeight = 8;
        let yPosition = 30;

        // Helper function to draw labeled text with aligned boxes
        const drawLabeledText = (label, value, xLabel, xValue, y) => {
            doc.text(`${label}:`, xLabel, y);
            doc.text(value, xValue, y);
            doc.line(10, y + 2, 200, y + 2); // Draws a horizontal line after each field
        };

        // Content starts here, following the structure of the form
        drawLabeledText('සම්පූර්ණ නම ', fullName, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('ලිපිනය', address, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('ජාතික හැදුනුම්පත් අංකය', nic, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText("Father's Name", fatherName, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText("Father's Address", fatherAddress, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Religion', religion, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Gender', gender, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Is Sri Lankan', isSriLankan ? 'Yes' : 'No', 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('District', district, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText("Divisional Secretary's Division", divisionalSecDivision, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Grama Niladhari Division and Number', gnDivision, 10, 73, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Personally Known to GN', knownToGn, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Since When', sinceWhen, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Civil Status', civilStatus, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Occupation', occupation, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Period of Residence', periodOfResidence, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Purpose of Certificate', purpose, 10, 60, yPosition);
        yPosition += lineHeight;
        drawLabeledText('Remarks', remarks, 10, 60, yPosition);

        // Final Save
        doc.save('user_details_form_style.pdf');
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
                                            <form onSubmit={handleSubmit}>
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
                                                    </div>
                                                    {/* Column 2 */}
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="gender">Gender <br /> ස්ත්‍රී/පුරුෂ භාවය </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="gender"
                                                                value={gender}
                                                                onChange={(e) => setGender(e.target.value)}
                                                                placeholder="Enter Gender"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="district">District <br />දිස්ත්‍රික්කය</label>
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
                                                            <label htmlFor="divisionalSecDivision">Divisional Secretary's Division <br />ප්‍රාදේශීය ලේකම් කොට්ඨාශය</label>
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
                                                            <label htmlFor="gnDivision">GN Division <br />ග්‍රාම නිලධාරි වසම </label>
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
                                                            <label htmlFor="knownToGn">Known to GN</label>
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
                                                            <label htmlFor="sinceWhen">Since When</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="sinceWhen"
                                                                value={sinceWhen}
                                                                onChange={(e) => setSinceWhen(e.target.value)}
                                                                placeholder="Since When"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Download PDF</button>
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
