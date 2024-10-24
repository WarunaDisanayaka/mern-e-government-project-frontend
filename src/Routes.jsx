import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddDistrict from './pages/AddDistrict';
import AddDivisions from './pages/AddDivisions';
import AddUserDetails from './pages/AddUserDetails';
import AdminHome from './pages/Admin/AdminHome';
import CreateAccount from './pages/Admin/CreateAccount';
import AllUsers from './pages/AllUsers';
import CharacterCertificate from './pages/CharacterCertificate';
import EditUserDetails from './pages/EditUserDetails';
import Home from './pages/Home';
import Login from './pages/Login/Login';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-district" element={<AddDistrict />} />
                <Route path="/add-divisions" element={<AddDivisions />} />
                <Route path="/add-user-details" element={<AddUserDetails />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/edit-user/:id" element={<EditUserDetails />} />

                <Route path="/generate-character-certificate" element={<CharacterCertificate />} />

                <Route path="/admin" element={<AdminHome />} />
                <Route path="/create-account" element={<CreateAccount />} />



            </Routes>
        </Router>
    );
};

export default AppRoutes;
