import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
const TeacherOwnProfile = () => {


  const Navigate = useNavigate();

  interface User {
    name?: string;
    aname?: string;
    tname?: string;
    temail?: string;
    tphn?: string;
    Status?: string;
    tspecialization: String;
    texp: String;
    tcity?: string;
  }

  // get Specificuser data from backend 
  const { id } = useParams()
  const [teacher, setTeacher] = useState<User>({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/course/Teacher/MyProfile/${id}`)
      .then(res => res.json())
      .then(data => {
        setTeacher(data.teacher);
      })
      .catch(err => {
        console.error('Error fetching teacher profile:', err);
      });
  }, [id]);

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
          <Sidebar2 />
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
                    <div className="page-title-box">
                      <div className="page-title-right">

                      </div>
                      <h4 className="page-title">My Profile</h4>
                    </div>
                  </div>
                </div>

                {/* end row */}

                {/* end row */}

                {/* end row */}
              </div>

              <div className="container py-5">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="profile-card">
                      <div className="cover"></div>
                      <div className="text-center px-4 pb-4">
                      <img src={`/public${teacher.tprofile}`} className="profile-img" alt="User" />
                        <h4 className="mt-3 mb-0">{teacher.tname}</h4>
                        <p className="text-muted">{teacher.tspecialization} Faculty | {teacher.tcity}</p>
                        <div className="social-icons mb-3">
                          <a href="#"><i className="bi bi-twitter"></i></a>
                          <a href="#"><i className="bi bi-linkedin"></i></a>
                          <a href="#"><i className="bi bi-github"></i></a>
                        </div>

                        <div className="stats mb-4">
                          <div className="stat">
                            <h6>Posts</h6>
                            <p>120</p>
                          </div>
                          <div className="stat">
                            <h6>Followers</h6>
                            <p>3.5K</p>
                          </div>
                          <div className="stat">
                            <h6>Following</h6>
                            <p>180</p>
                          </div>
                        </div>

                        <ul className="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#profile-tab">Profile</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#activity-tab">Activity</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#settings-tab">Settings</button>
                          </li>
                        </ul>

                        <div className="tab-content text-start px-3" id="pills-tabContent">
                          <div className="tab-pane fade show active" id="profile-tab">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item"><strong>Email:</strong> {teacher.temail}</li>
                              <li className="list-group-item"><strong>Phone:</strong> {teacher.tphn}</li>
                              <li className="list-group-item"><strong>Member Since:</strong> {new Date(teacher.updatedAt).toLocaleDateString()}</li>
                              <li className="list-group-item"><strong>Experience:</strong> {teacher.texp}</li>
                              <li className="list-group-item"><strong>Verification Status:</strong> {teacher.Status}</li>
                            </ul>
                          </div>
                          <div className="tab-pane fade" id="activity-tab">
                            <ul className="timeline mt-3">
                              <li>Uploaded a new project: "AI Chatbot"</li>
                              <li>Commented on John's post</li>
                              <li>Started following Emily</li>
                              <li>Updated profile photo</li>
                            </ul>
                          </div>
                          <div className="tab-pane fade" id="settings-tab">
                            <div className="toggle-switch mt-3">
                              <label><strong>Dark Mode</strong></label>
                              <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="darkModeSwitch" />
                              </div>
                            </div>
                            <div className="mt-2">
                              <label><strong>Language:</strong></label>
                              <select className="form-select mt-1">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>French</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <a href={`/teacher/edit-my-profile/${teacher._id}`} className="btn btn-primary mt-4 edit-btn">Edit Profile</a >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* container */}
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

export default TeacherOwnProfile;
