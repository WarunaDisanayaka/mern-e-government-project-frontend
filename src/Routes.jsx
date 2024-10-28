import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddDistrict from './pages/AddDistrict';
import AddDivisions from './pages/AddDivisions';
import AddUserDetails from './pages/GramaNilaDhari/AddUserDetails';
import AdminHome from './pages/Admin/AdminHome';
import CreateAccount from './pages/Admin/CreateAccount';
import AllUsers from './pages/GramaNilaDhari/AllUsers';
import CharacterCertificate from './pages/GramaNilaDhari/CharacterCertificate';
import EditUserDetails from './pages/GramaNilaDhari/EditUserDetails';
import Home from './pages/GramaNilaDhari/Home';
import Login from './pages/Login/Login';
import GramaNilaDhariLogin from './pages/GramaNilaDhari/Login/GramaNilaDhariLogin';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AllAccounts from './pages/Admin/Accounts/AllAccounts';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import UserHome from './pages/User/UserHome';
import RequestCertification from './pages/User/RequestCertification';
import MyRequests from './pages/User/MyRequests';
import Certificate from './pages/GramaNilaDhari/Certificate/Certificate';
import IncomeCertificate from './pages/GramaNilaDhari/IncomeCertificate';
import AllCertificateRequests from './pages/GramaNilaDhari/AllCertificateRequests';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* <Route path="/" element={<GramaNilaDhariLogin />} /> */}
                <Route path="/login" element={<GramaNilaDhariLogin />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user-home" element={<UserHome />} />


                {/* Admin routes */}
                <Route path="/admin-home" element={<AdminHome />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/all-accounts" element={<AllAccounts />} />

                <Route path="/request-certificate" element={<RequestCertification />} />
                <Route path="/my-requests" element={<MyRequests />} />

                <Route path="/certificate" element={<Certificate />} />
                <Route path="/all-certificate-requests" element={<AllCertificateRequests />} />


                {/* Protected routes */}
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/add-district" element={<ProtectedRoute><AddDistrict /></ProtectedRoute>} />
                <Route path="/add-divisions" element={<ProtectedRoute><AddDivisions /></ProtectedRoute>} />
                <Route path="/add-user-details" element={<ProtectedRoute><AddUserDetails /></ProtectedRoute>} />
                <Route path="/all-users" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
                <Route path="/edit-user/:id" element={<ProtectedRoute><EditUserDetails /></ProtectedRoute>} />
                <Route path="/generate-character-certificate" element={<ProtectedRoute><CharacterCertificate /></ProtectedRoute>} />
                <Route path="/generate-income-certificate" element={<ProtectedRoute><IncomeCertificate /></ProtectedRoute>} />

                <Route path="/gramaniladhari" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
