import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const StudentProfile = () => {


  const Navigate = useNavigate();


  // Get user from local storage
  interface User {
    name?: string;
    aname?: string;
    tname?: string;
    email?: string;
    phn?: string;
    Status?: string;
  }

  const [loginUser, setLoginuser] = useState<User>({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])


  // Logout

  const logoutHandler = () => {
    localStorage.removeItem('edudocs')
    message.success("Logged out successfully", 7)
    Navigate('/admin-login')
  }


  // preventing admin to access dashboard if they are not looged in 
  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in ! First Log in to your account", 7)
      Navigate('/admin-login')
    }
  }, [Navigate])



  //get user id from url



  // get Specificuser data from backend 
  const { id } = useParams()
  const [user, setUser] = useState<User>({})

  useEffect(() => {
    fetch(`${url}/userProfile/${id}`) // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);
      });
  }, []);





  return (
    <>

      <div>
        {/* Begin page */}
        <div className="wrapper">
          {/* ========== Topbar Start ========== */}

          <Topbar />

          {/* ========== Topbar End ========== */}
          {/* ========== Left Sidebar Start ========== */}
          {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
          {/* ========== Left Sidebar End ========== */}
          {/* ============================================================== */}
          {/* Start Page Content Here */}
          {/* ============================================================== */}
          <div className="content-page">
            <div className="content">
              {/* Start Content*/}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">

                  </div>
                </div>


                {/* end row */}
              </div>
              {/* container */}
            </div>
            <div className="container mt-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 text-center mb-3">
                  <h2 className="display-6 fw-bold text-primary">{user.name}</h2>
                  <p className="text-muted">
                    <i className="bi bi-calendar-check me-2"></i>
                    Student Since: {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="col-md-6 offset-md-1">
                  <div className="card shadow-lg border-0 rounded-4 student-card">
                    <div className="card-body p-5 bg-light rounded-4">
                      <h4 className="card-title mb-4 text-secondary fw-bold">
                        <i className="bi bi-person-lines-fill me-2"></i> Student Details
                      </h4>
                      <ul className="list-unstyled lh-lg">
                        <li><i className="bi bi-person-fill text-primary me-2"></i><strong>Name:</strong> {user.name}</li>
                        <li><i className="bi bi-envelope-fill text-info me-2"></i><strong>Email:</strong> {user.email}</li>
                        <li><i className="bi bi-telephone-fill text-success me-2"></i><strong>Phone:</strong> {user.phn}</li>
                        <li><i className="bi bi-clock-fill text-warning me-2"></i><strong>Account Created:</strong> {new Date(user.updatedAt).toLocaleDateString()}</li>
                        <li><i className="bi bi-shield-check text-success me-2"></i><strong>Verification Status:</strong> {user.Status}</li>
                        <li><i className="bi bi-journal-check text-secondary me-2"></i><strong>Total Courses Enrolled:</strong> 5</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* content */}
            {/* Footer Start */}
            <footer className="bg-secondary text-light pt-4">
              <div className="container text-center text-md-start p-3">
                <div className="row">
                  {/* About Section */}
                  <div className="col-md-4">
                    <h5 className="fw-bold text-light">About Us</h5>
                    <p className="small">We provide high-quality services and ensure customer satisfaction with innovative solutions.</p>
                  </div>
                  {/* Quick Links in a Single Line */}
                  <div className="col-md-4 text-center">
                    <h5 className="fw-bold text-light">Quick Links</h5>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="/" className="text-decoration-none text-light">Home</a>
                      <a href="/about" className="text-decoration-none text-light">About</a>
                      <a href="/services" className="text-decoration-none text-light">Services</a>
                      <a href="/contact" className="text-decoration-none text-light">Contact</a>
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="col-md-4 text-center text-md-end">
                    <h5 className="fw-bold text-light">Follow Us</h5>
                    <a href="#" className="bg-primary btn btn-outline-light btn-sm me-2"><i className="bi bi-facebook" /></a>
                    <a href="#" className="btn btn-outline-light btn-sm me-2"><i className="bi bi-twitter" /></a>
                    <a href="#" className="bg-danger btn btn-outline-light btn-sm me-2"><i className="bi bi-instagram" /></a>
                    <a href="#" className="bg-primary btn btn-outline-light btn-sm"><i className="bi bi-linkedin" /></a>
                  </div>
                </div>
                <hr className="my-3 text-secondary" />
                {/* Copyright */}
                <div className="text-center pb-3 small">
                  <b> &copy; 2025 MyEdudocs. All Rights Reserved.</b>
                </div>
              </div>
            </footer>

            {/* end Footer */}
          </div>
          {/* ============================================================== */}
          {/* End Page content */}
          {/* ============================================================== */}
        </div>
        {/* END wrapper */}
        {/* Theme Settings */}

      </div>


    </>
  );
}

export default StudentProfile;
