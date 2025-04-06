import React,{useEffect, useState} from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import Topbar from './Topbar';
const TeacherDashboard = () => {


  const Navigate = useNavigate();


   // Get user from local storage
    interface User {
      name?: string;
      tname?: string;
      aname?: string;
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
        message.success("Logged out successfully", 5)
        Navigate('/teacher-login')
      }

    
              useEffect(() => {
                if (!localStorage.getItem('edudocs')) {
                  message.warning("You are not already logged in ! First Log in to your account", 7)
                  Navigate('/teacher-login')
                }
              }, [Navigate])


    return (
       <>
       
       <div>
  {/* Begin page */}
  <div className="wrapper">
    {/* ========== Topbar Start ========== */}
    <div className="navbar-custom">
     <Topbar />

    </div>
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
                      <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Customers</h5>
                      <h3 className="mt-3 mb-3">36,254</h3>
                      <p className="mb-0 text-muted">
                        <span className="text-success me-2">5.27%</span>
                        <span className="text-nowrap">Since last month</span>
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
                      <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Orders</h5>
                      <h3 className="mt-3 mb-3">5,543</h3>
                      <p className="mb-0 text-muted">
                        <span className="text-danger me-2"> 1.08%</span>
                        <span className="text-nowrap">Since last month</span>
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
                      <h3 className="mt-3 mb-3">$6,254</h3>
                      <p className="mb-0 text-muted">
                        <span className="text-danger me-2"> 7.00%</span>
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </div> {/* end card-body*/}
                  </div> {/* end card*/}
                </div> {/* end col*/}
                <div className="col-sm-6">
                  <div className="card widget-flat">
                    <div className="card-body">
                      <div className="float-end">
                      <i className="fa-solid fa-arrow-up-right-dots"></i>
                      </div>
                      <h5 className="text-muted fw-normal mt-0" title="Growth">Growth</h5>
                      <h3 className="mt-3 mb-3">+ 30.56%</h3>
                      <p className="mb-0 text-muted">
                        <span className="text-success me-2"> 4.87%</span>
                        <span className="text-nowrap">Since last month</span>
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
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <h4 className="header-title">Revenue</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-dollar-sign"></i>
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
                  <div className="chart-content-bg">
                    <div className="row text-center">
                      <div className="col-sm-6">
                        <p className="text-muted mb-0 mt-3">Current Week</p>
                        <h2 className="fw-normal mb-3">
                          <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1" />
                          <span>$58,254</span>
                        </h2>
                      </div>
                      <div className="col-sm-6">
                        <p className="text-muted mb-0 mt-3">Previous Week</p>
                        <h2 className="fw-normal mb-3">
                          <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1" />
                          <span>$69,524</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="dash-item-overlay d-none d-md-block" dir="ltr">
                    <h5>Today's Earning: $2,562.30</h5>
                    <p className="text-muted font-13 mb-3 mt-2">Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                      Etiam rhoncus...</p>
                    <a href="javascript: void(0);" className="btn btn-outline-primary">View Statements
                    <i className="fa-brands fa-usps"></i>
                    </a>
                  </div>
                  <div dir="ltr">
                    <div id="revenue-chart" className="apex-charts mt-3" data-colors="#727cf5,#0acf97" />
                  </div>
                </div> {/* end card-body*/}
              </div> {/* end card*/}
            </div> {/* end col*/}
            <div className="col-lg-4">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <h4 className="header-title">Revenue By Location</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-location-crosshairs"></i>
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
                  <div className="mb-4 mt-3">
                    <div id="world-map-markers" style={{height: 217}} />
                  </div>
                  <h5 className="mb-1 mt-0 fw-normal">New York</h5>
                  <div className="progress-w-percent">
                    <span className="progress-value fw-bold">72k </span>
                    <div className="progress progress-sm">
                      <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                  <h5 className="mb-1 mt-0 fw-normal">San Francisco</h5>
                  <div className="progress-w-percent">
                    <span className="progress-value fw-bold">39k </span>
                    <div className="progress progress-sm">
                      <div className="progress-bar" role="progressbar" style={{width: '39%'}} aria-valuenow={39} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                  <h5 className="mb-1 mt-0 fw-normal">Sydney</h5>
                  <div className="progress-w-percent">
                    <span className="progress-value fw-bold">25k </span>
                    <div className="progress progress-sm">
                      <div className="progress-bar" role="progressbar" style={{width: '39%'}} aria-valuenow={39} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                  <h5 className="mb-1 mt-0 fw-normal">Singapore</h5>
                  <div className="progress-w-percent mb-0">
                    <span className="progress-value fw-bold">61k </span>
                    <div className="progress progress-sm">
                      <div className="progress-bar" role="progressbar" style={{width: '61%'}} aria-valuenow={61} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div> {/* end card-body*/}
              </div> {/* end card*/}
            </div> {/* end col*/}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <h4 className="header-title">Top Selling Products</h4>
                  <a href="javascript:void(0);" className="btn btn-sm btn-light">Export <i className="mdi mdi-download ms-1" /></a>
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
            <div className="col-xl-3 col-lg-6 order-lg-1">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <h4 className="header-title">Total Sales</h4>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-dollar-sign"></i>
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
                  <div id="average-sales" className="apex-charts mb-4 mt-2" data-colors="#727cf5,#0acf97,#fa5c7c,#ffbc00" />
                  <div className="chart-widget-list">
                    <p>
                    <i className="fa-solid fa-square"></i> Direct
                      <span className="float-end">$300.56</span>
                    </p>
                    <p>
                    <i className="fa-solid fa-square"></i> Affilliate
                      <span className="float-end">$135.18</span>
                    </p>
                    <p>
                    <i className="fa-solid fa-square"></i> Sponsored
                      <span className="float-end">$48.96</span>
                    </p>
                    <p className="mb-0">
                    <i className="fa-solid fa-square"></i> E-mail
                      <span className="float-end">$154.02</span>
                    </p>
                  </div>
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

export default TeacherDashboard;
