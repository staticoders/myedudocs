import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';

import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
const TeacherDashboard = () => {


  const Navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'grade', headerName: 'Grade', width: 130 },
    { field: 'attendance', headerName: 'Attendance %', width: 160 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <span style={{ color: params.value === 'Good' ? 'green' : 'red' }}>
          {params.value}
        </span>
      )
    }
  ];

  const rows = [
    { id: 1, name: 'Alice Johnson', grade: 'A', attendance: 96, status: 'Good' },
    { id: 2, name: 'Mark Smith', grade: 'C', attendance: 75, status: 'Needs Work' },
    { id: 3, name: 'Sara Lee', grade: 'B+', attendance: 88, status: 'Good' },
  ];

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
                      <h4 className="page-title">Dashboard</h4>
                    </div>
                  </div>
                </div>

                {/* end row */}

                {/* end row */}

                {/* end row */}
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <div className="float-end">
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <h5 className="text-muted fw-normal mt-0" title="Number of Customers">My Students</h5>
                        <h3 className="mt-3 mb-3">0</h3>
                        <p className="mb-0 text-muted">
                          {/* <span className="text-success me-2">5.27%</span>
                        <span className="text-nowrap">Since last month</span> */}
                        </p>
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div>
                  <div className="col-md-3">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <div className="float-end">
                          <i className="fa-solid fa-book"></i>
                        </div>
                        <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Course Assigned To Me</h5>
                        <h3 className="mt-3 mb-3">0</h3>
                        <p className="mb-0 text-muted">

                        </p>
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div>
                  <div className="col-md-3">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <div className="float-end">
                          <i className="fa-solid fa-calendar-alt"></i>
                        </div>
                        <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Upcomming Classes</h5>
                        <h3 className="mt-3 mb-3">$0</h3>
                        <p className="mb-0 text-muted">
                          {/* <span className="text-danger me-2"> 7.00%</span>
                        <span className="text-nowrap">Since last month</span> */}
                        </p>
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div>
                  <div className="col-md-3">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <div className="float-end">
                          <i className="fa-solid fa-bell"></i>
                        </div>
                        <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Notification</h5>
                        <h3 className="mt-3 mb-3">0</h3>
                        <p className="mb-0 text-muted">
                          {/* <span className="text-success me-2">5.27%</span>
                        <span className="text-nowrap">Since last month</span> */}
                        </p>
                      </div> {/* end card-body*/}
                    </div> {/* end card*/}
                  </div>
                </div>
              </div>
              {/* container */}
            </div>
            {/* content */}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Quick Stats</h2>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      checkboxSelection
                    />
                  </div>
                </div>
              </div>
            </div>
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

export default TeacherDashboard;
