import  { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';

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
    tspecialization:String;
    texp:String;
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
  const [teacher, setTeacher] = useState<User>({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/teacherProfile/${id}`) // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data.teacher);
      })
      .catch((error) => {
        console.error("Error fetching Teacher:", error);
      });
  }, []);

  console.log(teacher);

  return (
    <>

      <div>
        {/* Begin page */}
        <div className="wrapper">
          {/* ========== Topbar Start ========== */}
          <Topbar />
          {/* ========== Topbar End ========== */}
          {/* ========== Left Sidebar Start ========== */}
           <Sidebar2/>
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
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <p className='userlogo'>{teacher.tname}</p>
                </div>
                <span className='d-flex justify-content-center'>Teacher Since :{new Date(teacher.updatedAt).toLocaleDateString()}</span>
                <div className="col-md-12">
                  <div className="card mt-3 shadow-sm">
                    <div className="card-body user-card">
                      <h5 className="card-title">Teacher Details</h5>
                      <p className="card-text"><b>Teacher's Name:</b> {teacher.tname}</p>
                      <p className="card-text"><b>Teacher's Email:</b> {teacher.temail}</p>
                      <p className="card-text"><b>Teacher's Contact:</b> {teacher.tphn}</p>
                      <p className="card-text"><b>Teacher's Specialization:</b> {teacher.tspecialization}</p>
                      <p className="card-text"><b>Teacher's Experience:</b> {teacher.texp} Years</p>
                      <p className="card-text"><b> At MyEdudocs Since :</b> {new Date(teacher.updatedAt).toLocaleDateString()}</p>
                      <p className="card-text"><b>Verification Status:</b> {teacher.Status}</p>

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
