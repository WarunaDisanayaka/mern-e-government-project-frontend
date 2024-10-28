import React, { useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const IncomeCertificate = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [nic, setNic] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fatherAddress, setFatherAddress] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [incomeSources, setIncomeSources] = useState({
        properties: '',
        businesses: '',
        job: '',
        vehicles: '',
        other: '',
        total: '',
        propertyIncome: '',
        propertyTotal: '',
        deedNo: '',
        ownerName: '',
        businessLocation: '',
        registrationNo: '',
        natureOfBusiness: '',
        salesTax: '',
        jobLocation: '',
        designation: '',
    });


    const handleGeneratePDF = () => {
        const certificateData = {
            fullName,
            address,
            nic,
            fatherName,
            monthlyIncome,
            annualIncome,
            ...incomeSources,
        };

        // Use this data to populate the HTML
        window.open(`income.html?${new URLSearchParams(certificateData)}`);
        console.log(certificateData)
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        const divisionId = localStorage.getItem('division_id');
        if (!divisionId) {
            // setErrorMessage('Division ID not found in local storage');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/api/${nic}/${divisionId}`);
            const data = response.data;
            if (data) {
                setFullName(data.full_name || '');
                setAddress(data.address || '');
                setNic(data.nic || '');
                setFatherName(data.father_name || '');
                setFatherAddress(data.father_address || '');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            // setErrorMessage('No data found for this NIC');
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
                            <h1 className="h3 mb-0 text-gray-800">Generate Income Certificate</h1>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">User Details</h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSearch}>
                                        <div className="form-group">
                                            <label htmlFor="searchNIC">Search by NIC</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="searchNIC"
                                                value={nic}
                                                onChange={(e) => setNic(e.target.value)}
                                                placeholder="Enter NIC"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-4">Search</button>
                                    </form>

                                    <form onSubmit={handleGeneratePDF}>
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name / සම්පූර්ණ නම</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address / ලිපිනය</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="monthlyIncome">Applicant's Monthly Income / අයදුම්කරුගේ මාසික ආදායම</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="monthlyIncome"
                                                value={monthlyIncome}
                                                onChange={(e) => setMonthlyIncome(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="annualIncome">Applicant's Annual Income / අයදුම්කරුගේ වාර්ෂික ආදායම</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="annualIncome"
                                                value={annualIncome}
                                                onChange={(e) => setAnnualIncome(e.target.value)}
                                            />
                                        </div>

                                        {/* Income Sources */}
                                        <div className="form-group">
                                            <label>Income Sources / ආදායම් ලැබෙන මාර්ග</label>
                                            <div className="form-group">
                                                <label htmlFor="fromProperties">From Properties (වගාව)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fromProperties"
                                                    value={incomeSources.properties}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, properties: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fromBusinesses">From Businesses (ව්‍යාපාර)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fromBusinesses"
                                                    value={incomeSources.businesses}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, businesses: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fromJob">From Job (රැකියාව)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fromJob"
                                                    value={incomeSources.job}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, job: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fromVehicles">From Vehicles (වාහන)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fromVehicles"
                                                    value={incomeSources.vehicles}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, vehicles: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fromOtherSources">Other Sources (වෙනත් ආකාරයන්)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fromOtherSources"
                                                    value={incomeSources.other}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, other: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="totalIncome">Total (එකතුව)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="totalIncome"
                                                    value={incomeSources.total}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, total: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>If from property / දේපළ වලින් නම්</label>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="propertyIncome">From Properties (වගාව)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="propertyIncome"
                                                            value={incomeSources.propertyIncome}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, propertyIncome: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="propertyTotal">Total (ප්‍රමාණය)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="propertyTotal"
                                                            value={incomeSources.propertyTotal}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, propertyTotal: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="deedNo">Deed No (ඔප්පු අංකය)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="deedNo"
                                                            value={incomeSources.deedNo}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, deedNo: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="ownerName">Owner name (අයිතිකරුගේ නම)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="ownerName"
                                                            value={incomeSources.ownerName}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, ownerName: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>If from businesses / ව්‍යාපාර වලින් නම්</label>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="businessLocation">Location (පිහිටි ස්ථානය)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="businessLocation"
                                                            value={incomeSources.businessLocation}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, businessLocation: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="registrationNo">Registration No (ලියාපදිංචි අංකය)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="registrationNo"
                                                            value={incomeSources.registrationNo}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, registrationNo: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Nature of Business :- Hotel / Tea Shop / Retail Shop / Pharmacy / Wholesale Trade / Tourist Trade / Fairs / Other <br /> ව්‍යාපාරයේ ස්වභාවය :- හෝටලයක්/ තේ කඩයක් / සිල්ලර කඩයක් / ෆාමසියක් / තොග වෙළදාමක් / සංචාරක වෙළදාමක් / පොළවල් වල / වෙනත්  / ව්‍යාපාර වලින් නම්</label>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="natureOfBusiness"
                                                    value={incomeSources.natureOfBusiness}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, natureOfBusiness: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Amount of sales tax paid for the previous quarter <br /> පසුගිය කාර්තුවට ගෙවා ඇති පිරිවැටුම් බදු මුදල</label>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="salesTax"
                                                    value={incomeSources.salesTax}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, salesTax: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>If from job / රැකියාවෙන් නම්</label>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="jobLocation">Location (රැකියාව)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="jobLocation"
                                                            value={incomeSources.jobLocation}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, jobLocation: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="designation">Designation (තනතුර)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="designation"
                                                            value={incomeSources.designation}
                                                            onChange={(e) => setIncomeSources({ ...incomeSources, designation: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label>Name of Vehicle Nature of Vehicle - Lorry / Three Wheeler / Van / Tractor / Truck Vehicle Number <br /> වාහන වලින් නම් වාහනයේ ස්වභාවය - ලොරි රථය / ත්‍රී වීලරය / වෑන් රථය / ට්‍රැක්ටරය / ට්‍රක්‌ රථය වාහන අංකය   </label>

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="properties"
                                                    value={incomeSources.properties}
                                                    onChange={(e) => setIncomeSources({ ...incomeSources, properties: e.target.value })}
                                                />
                                            </div>
                                        </div>


                                        <button type="submit" className="btn btn-primary">Generate PDF</button>
                                    </form>
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
