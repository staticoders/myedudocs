import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import url from '../../url';

const Dashboard = () => {


  const Navigate = useNavigate();


  // Get user from local storage
  interface User {
    name?: string;
    aname?: string;
    tname?: string;
  }

  const [loginUser, setLoginuser] = useState<User>({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])




  // preventing admin to access dashboard if they are not looged in 
  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in ! First Log in to your account", 7)
      Navigate('/admin-login')
    }
  }, [Navigate])


  // all users 
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/count/getAllStudents`) // Update with your backend URL
      .then((response) => response.json())
      .then((data: TeachersData) => {
        setUsers(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // setLoading(false);
      });
  }, []);



  // all teachers 
  interface TeachersData {
    teacherCount: number;
  }

  const [teachers, setTeachers] = useState<TeachersData>({ teacherCount: 0 });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/count/getAllTeachers`) // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // setLoading(false);
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
          <Sidebar />

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
                        {/* <form className="d-flex">
                    <div className="input-group">
                      <input type="text" className="form-control form-control-light" id="dash-daterange" />
                      <span className="input-group-text bg-primary border-primary text-white">
                      <i class="fa-solid fa-calendar"></i>
                      </span>
                    </div>
                    <a href="javascript: void(0);" className="btn btn-primary ms-2">
                      <i className="mdi mdi-autorenew" />
                    </a>
                    <a href="javascript: void(0);" className="btn btn-primary ms-1">
                    <i class="fa-solid fa-gauge"></i>
                    </a>
                  </form> */}
                      </div>
                      <h4 className="page-title">Dashboard</h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-5 col-lg-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card widget-flat">
                          <div className="card-body">
                            <div className="float-end">
                              <i className="fa-solid fa-users"></i>
                            </div>
                            <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Students</h5>
                            <h3 className="mt-3 mb-3">{users.userCount}</h3>
                            <p className="mb-0 text-muted">
                              {/* <span className="text-success me-2">5.27%</span>
                        <span className="text-nowrap">Since last month</span> */}
                            </p>
                          </div> {/* end card-body*/}
                        </div> {/* end card*/}
                      </div> {/* end col*/}
                      <div className="col-sm-6">
                        <div className="card widget-flat">
                          <div className="card-body">
                            <div className="float-end">
                              <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Course Enrolled</h5>
                            <h3 className="mt-3 mb-3">0</h3>
                            <p className="mb-0 text-muted">
                              {/* <span className="text-danger me-2"> 1.08%</span>
                        <span className="text-nowrap">Since last month</span> */}
                            </p>
                          </div> {/* end card-body*/}
                        </div> {/* end card*/}
                      </div> {/* end col*/}
                    </div> {/* end row */}
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card widget-flat">
                          <div className="card-body">
                            <div className="float-end">
                              <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                            <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Revenue</h5>
                            <h3 className="mt-3 mb-3">$0</h3>
                            <p className="mb-0 text-muted">
                              {/* <span className="text-danger me-2"> 7.00%</span>
                        <span className="text-nowrap">Since last month</span> */}
                            </p>
                          </div> {/* end card-body*/}
                        </div> {/* end card*/}
                      </div> {/* end col*/}
                      <div className="col-sm-6">
                        <div className="card widget-flat">
                          <div className="card-body">
                            <div className="float-end">
                              <i className="fa-solid fa-users"></i>
                            </div>
                            <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Teachers</h5>
                            <h3 className="mt-3 mb-3">{teachers.teacherCount}</h3>
                            <p className="mb-0 text-muted">
                              {/* <span className="text-success me-2">5.27%</span>
                        <span className="text-nowrap">Since last month</span> */}
                            </p>
                          </div> {/* end card-body*/}
                        </div> {/* end card*/}
                      </div> {/* end col*/}
                    </div> {/* end row */}
                  </div> {/* end col */}
                  <div className="col-xl-7 col-lg-6">
                    <div className="card card-h-100">
                      <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Projections Vs Actuals</h4>
                        <div className="dropdown">
                          <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-chart-simple"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            {/* item*/}
                            <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                            {/* item*/}
                            <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                            {/* item*/}
                            <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                            {/* item*/}
                            <a href="javascript:void(0);" className="dropdown-item">Action</a>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <div dir="ltr">
                          <div id="high-performing-product" className="apex-charts" data-colors="#727cf5,#91a6bd40" />
                        </div>
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div> {/* end col */}
                </div>
                {/* end row */}

                {/* end row */}
                <div className="row">
                  <div className="col-xl-12 col-lg-12 order-lg-2 order-xl-1">
                    <div className="card">
                      <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Top Selling Course</h4>

                      </div>
                      <div className="card-body pt-0">
                        <div className="table-responsive">
                          <table className="table table-centered table-nowrap table-hover mb-0">
                            <tbody>
                              <tr>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">ASOS Ridley High Waist</h5>
                                  <span className="text-muted font-13">07 April 2018</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$79.49</h5>
                                  <span className="text-muted font-13">Price</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">82</h5>
                                  <span className="text-muted font-13">Quantity</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$6,518.18</h5>
                                  <span className="text-muted font-13">Amount</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">Marco Lightweight Shirt</h5>
                                  <span className="text-muted font-13">25 March 2018</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$128.50</h5>
                                  <span className="text-muted font-13">Price</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">37</h5>
                                  <span className="text-muted font-13">Quantity</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$4,754.50</h5>
                                  <span className="text-muted font-13">Amount</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">Half Sleeve Shirt</h5>
                                  <span className="text-muted font-13">17 March 2018</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$39.99</h5>
                                  <span className="text-muted font-13">Price</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">64</h5>
                                  <span className="text-muted font-13">Quantity</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$2,559.36</h5>
                                  <span className="text-muted font-13">Amount</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">Lightweight Jacket</h5>
                                  <span className="text-muted font-13">12 March 2018</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$20.00</h5>
                                  <span className="text-muted font-13">Price</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">184</h5>
                                  <span className="text-muted font-13">Quantity</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$3,680.00</h5>
                                  <span className="text-muted font-13">Amount</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">Marco Shoes</h5>
                                  <span className="text-muted font-13">05 March 2018</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$28.49</h5>
                                  <span className="text-muted font-13">Price</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">69</h5>
                                  <span className="text-muted font-13">Quantity</span>
                                </td>
                                <td>
                                  <h5 className="font-14 my-1 fw-normal">$1,965.81</h5>
                                  <span className="text-muted font-13">Amount</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div> {/* end table-responsive*/}
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div> {/* end col*/}


                  {/* end col */}
                </div>
                {/* end row */}
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

export default Dashboard;
