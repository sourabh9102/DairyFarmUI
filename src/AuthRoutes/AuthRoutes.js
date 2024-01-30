import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarForm from '../features/NavbarForm/NavbarForm'
import FrontPageForm from '../features/FrontPage/FrontPageForm'
import Stats from '../features/FrontPage/Stats'
import Testimonials from '../features/FrontPage/Testimonials'
import Footer from '../features/FrontPage/Footer'
import Login from '../features/LoginForm/Login'
import UserProfile from '../features/UserProfile/UserProfile'
import Registration from '../features/RegistrationForm/Registration';
import EmailVerify from '../features/EmailVerify/EmailVerify';
import ForgotPass from '../features/ForgotPassword/ForgotPass';
import EmailConfirm from '../features/ForgotPassword/EmailConfirm';
import ProductList from '../features/Product/ProductList';
import UpdateProfile from '../features/UserProfile/UpdateProfile';
import PasswordReset from '../features/UserProfile/PasswordReset';
import EditProfile from '../features/UserProfile/EditProfile';


function AuthRoutes() {
    return (
        <>
            <Router>
                <NavbarForm />
                <FrontPageForm />
                <FrontPageForm />
                <Stats />
                <Testimonials />
                <Footer />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/emailverify" element={<EmailVerify />} />
                    <Route path='/forgotPass' element={<ForgotPass />} />
                    <Route path='/emailConfirm' element={<EmailConfirm />} />
                    <Route path='/product' element={<ProductList />} />
                    <Route path='/updateProfile' element={<UpdateProfile />} />
                    <Route path='/changePass' element={<PasswordReset />} />
                    <Route path='/editprofile' element={<EditProfile />} />
                </Routes>
            </Router>
        </>
    )
}

export default AuthRoutes