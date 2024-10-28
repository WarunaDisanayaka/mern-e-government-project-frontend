import React from 'react';
import html2pdf from 'html2pdf.js';

const Certificate = () => {
    const downloadPDF = () => {
        const element = document.getElementById('certificate');
        html2pdf(element, {
            margin: 1,
            filename: 'certificate_of_residence_and_character.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        });
    };

    return (
        <div>
            <style>
                {`
                    body {
                        font-family: 'Noto Sans', sans-serif;
                        margin: 40px;
                        background-color: #f4f4f4;
                    }

                    h1 {
                        text-align: center;
                        font-size: 20px;
                        font-weight: 100;
                        margin-bottom: 40px;
                    }

                    h2 {
                        text-align: center;
                        font-size: 14px;
                        margin-bottom: 30px;
                        font-weight: normal;
                    }

                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border: 1px solid #ccc;
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .form-group {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        position: relative;
                    }

                    .form-group .label-group {
                        width: 35%;
                    }

                    .label-group label {
                        font-weight: 100;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                    }

                    .value {
                        font-weight: 100;
                        width: 60%;
                        padding: 5px;
                        text-align: left;
                    }

                    .line {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background: #000;
                    }

                    .form-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        border-bottom: 1px solid black;
                    }

                    .form-row .form-group {
                        position: relative;
                        flex: 0 0 48%;
                    }
                `}
            </style>

            <div className="container" id="certificate">
                <h1>
                    ග්‍රාම නිලධාරී විසින් නිකුත් කරන පදිංචිය පිළිබඳ සහතිකය <br />
                    Certificate on Residence and Character issued by the Grama Niladhari
                </h1>

                {/* Divisional Secretary's Division */}
                <div className="form-group">
                    <div className="label-group">
                        <label>ප්‍රාදේශීය ලේකම් කොට්ඨාසය</label>
                        <label>Divisional Secretary's Division</label>
                    </div>
                    <div className="value" id="divSecDivision">Colombo West</div>
                    <div className="line"></div>
                </div>

                {/* Repeat the form structure here as shown in HTML */}

                <div className="download-button">
                    <button onClick={downloadPDF}>Download as PDF</button>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
