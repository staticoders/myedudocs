import { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import Sidebar from './Sidebar';
import url from '../../url';

const TeacherProfile = () => {


  const Navigate = useNavigate();


  // Get user from local storage
  interface User {
    name?: string;
    aname?: string;
    tname?: string;
    temail?: string;
    tphn?: string;
    Status?: string;
    tspecialization: String;
    texp: String;
    updatedAt?: string;
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
  const [teacher, setTeacher] = useState<User>({
    name: '',
    aname: '',
    tname: '',
    temail: '',
    tphn: '',
    Status: '',
    tspecialization: '',
    texp: ''
  })

  useEffect(() => {
    fetch(`${url}/teacherProfile/${id}`) // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data.teacher);
      })
      .catch((error) => {
        console.error("Error fetching Teacher:", error);
      });
  }, []);

  // console.log(teacher);  // Get user from local storage
  const [loginUser, setLoginuser] = useState<{ name?: string, tname?: string, aname?: string }>({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])


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
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center mb-3">
                  <h2 className="display-6 fw-bold text-primary">{teacher.tname}</h2>
                  <p className="text-muted">
                    <i className="bi bi-calendar-check me-2"></i>
                    Teacher Since: {new Date(teacher.updatedAt ?? '').toLocaleDateString()}
                  </p>
                </div>

                <div className="col-md-6 offset-md-1">
                  <div className="card shadow-lg border-0 rounded-4 teacher-card">
                    <div className="card-body p-5 bg-light rounded-4">
                      <h4 className="card-title mb-4 text-secondary fw-bold">
                        <i className="bi bi-person-vcard-fill me-2"></i> Teacher Details
                      </h4>
                      <ul className="list-unstyled lh-lg">
                        <li><i className="bi bi-person-fill me-2 text-primary"></i><strong>Name:</strong> {teacher.tname}</li>
                        <li><i className="bi bi-envelope-fill me-2 text-info"></i><strong>Email:</strong> {teacher.temail}</li>
                        <li><i className="bi bi-telephone-fill me-2 text-success"></i><strong>Contact:</strong> {teacher.tphn}</li>
                        <li><i className="bi bi-award-fill me-2 text-warning"></i><strong>Specialization:</strong> {teacher.tspecialization}</li>
                        <li><i className="bi bi-briefcase-fill me-2 text-dark"></i><strong>Experience:</strong> {teacher.texp} Years</li>
                        <li><i className="bi bi-building-check me-2 text-muted"></i><strong>MyEduDocs Since:</strong> {new Date(teacher.updatedAt ?? '').toLocaleDateString()}</li>
                        <li><i className="bi bi-shield-check me-2 text-success"></i><strong>Verification Status:</strong> {teacher.Status}</li>
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

export default TeacherProfile;
