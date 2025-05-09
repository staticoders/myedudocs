import React from 'react';

const Sidebar = () => {
    return (
        <div>
               <div className="leftside-menu">
            {/* Brand Logo Light */}
            <a href="index.html" className="logo logo-light">
              <span className="logo-lg">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo.png" alt="logo" />
              </span>
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="small logo" />
              </span>
            </a>
            {/* Brand Logo Dark */}
            <a href="index.html" className="logo logo-dark">
              <span className="logo-lg">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark.png" alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark-sm.png" alt="small logo" />
              </span>
            </a>
            {/* Sidebar Hover Menu Toggle Button */}
            <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
              <i className="ri-checkbox-blank-circle-line align-middle" />
            </div>
            {/* Full Sidebar Menu Close Button */}
            <div className="button-close-fullsidebar">
              <i className="ri-close-fill align-middle" />
            </div>
            {/* Sidebar */}
            <div className="h-100" id="leftside-menu-container" data-simplebar>
              {/* Leftbar User */}
              <div className="leftbar-user">
                <a href="pages-profile.html">
                  <img src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg" alt="user-image" height={42} className="rounded-circle shadow-sm" />
                  <span className="leftbar-user-name mt-2">Dominic Keller</span>
                </a>
              </div>
              {/*- Sidemenu */}
              <ul className="side-nav">
                {/* <li className="side-nav-title">Navigation</li> */}
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="/admin-dashboard" aria-expanded="false" aria-controls="sidebarDashboards" className="side-nav-link">
                    <i className="fa-solid fa-house-user"></i>

                    <span> Dashboard Overview </span>
                  </a>

                </li>


                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" className="side-nav-link">
                    <i className="bi bi-person-badge"></i>
                    <span> User Management </span>
                    {/*  */}
                  </a>
                  <div className="collapse" id="sidebarEcommerce">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-teachers">👨‍🏫 Manage Teachers</a>
                      </li>
                      <li>
                        <a href="/manage-students">🎓 Manage Students</a>
                      </li>
                      <li>
                        <a href="/manage-roles">🛡️ Role & Permission Management </a>
                      </li>
                      <li>
                        <a href="/manage-user-access">🔒 User Access Control</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" className="side-nav-link">
                    <i className="bi bi-people"></i>
                    <span> Course & Class Management </span>

                  </a>
                  <div className="collapse" id="sidebarEmail">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-courses">📚 Manage Courses</a>
                      </li>
                      <li>
                        <a href="/add-courses">➕ Add Courses</a>
                      </li>

                      <li>
                        <a href="/review-course-content">📖 Review Course Content</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" className="side-nav-link">
                    <i className="bi bi-pencil-square"></i>
                    <span> Manage Exams </span>

                  </a>
                  <div className="collapse" id="sidebarProjects">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/create-exams">📝 Create & Schedule Exams</a>
                      </li>
                      <li>
                        <a href="/create-exams">📝 Create Exams Category</a>
                      </li>
                      <li>
                        <a href="/create-exams">📚 Manage All Exams</a>
                      </li>
                      <li>
                        <a href="/students-reports">📊 Exam Reports </a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" className="side-nav-link">
                    <i className="bi bi-broadcast"></i>
                    <span> Manage Live Sessions </span>

                  </a>
                  <div className="collapse" id="sidebarTasks">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/create-live-sessions">📅 Create New Live Sessions </a>
                      </li>
                      <li>
                        <a href="/assign-teachers-for-live-sessions">🎯 Assign Teachers</a>
                      </li>
                      {/* <li>
                        <a href="apps-tasks.html">📍 Select Course/Class</a>
                      </li>
                      <li>
                        <a href="apps-tasks.html">⏰ Set Date & Time</a>
                      </li> */}
                      <li>
                        <a href="/generate-meetings">🔗 Generate Meeting Links</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* <li className="side-nav-title"></li> */}


                {/* <li className="side-nav-title">Components</li> */}
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" className="side-nav-link">
                    <i className="bi bi-person-check"></i>
                    <span>Manage Admissions</span>

                  </a>
                  <div className="collapse" id="sidebarBaseUI">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-all-admissions"> 📚 Manage all Admissions</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                    <i className="bi bi-bell"></i>
                    <span> Jobs Notifications </span>

                  </a>
                  <div className="collapse" id="sidebarExtendedUI">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/post-job">📌 Post a Job</a>
                      </li>
                      <li>
                        <a href="/manage-jobs"> 📂 Manage All Jobs</a>
                      </li>
                      <li>
                        <a href="/add-job-categories">📌 Create Job Categories</a>
                      </li>
                      <li>
                        <a href="/create-job-subcategories">📌 Create Job Subcategories</a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" className="side-nav-link">
                    <i className="bi bi-credit-card"></i>
                    <span> Manage Payments </span>

                  </a>
                  <div className="collapse" id="sidebarIcons">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-all-payments">📂 All Payments</a>
                      </li>
                      <li>
                        <a href="/all-dues">📌 Dues</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarCharts" aria-expanded="false" aria-controls="sidebarCharts" className="side-nav-link">
                    <i className="bi bi-cart-check"></i>
                    <span> Manage All orders </span>

                  </a>
                  <div className="collapse" id="sidebarCharts">
                    <ul className="side-nav-second-level">
                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="" aria-expanded="false" aria-controls="sidebarApexCharts">
                          <span> 📚 All Course Purchased </span>
                        </a>
                      </li>
                      <li>
                        <a href="/total-ebooks">📘 Ebooks Purchases</a>
                      </li>
                      <li>
                        <a href="/total-pdfs">📄 PDFs Purchases</a>
                      </li>

                      <li>
                        <a href="/refunds/calcellation">🔄 Refund & Cancellation Requests</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" className="side-nav-link">
                    <i className="bi bi-book-half"></i>
                    <span> Books / Pdfs </span>

                  </a>
                  <div className="collapse" id="sidebarForms">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/uploads-ebooks">📤 Upload Ebooks</a>
                      </li>
                      <li>
                        <a href="/uploads-pdfs">📤 Upload Pdfs</a>
                      </li>
                      <li>
                        <a href="/uploads-dpps">📤 Upload Dpps</a>
                      </li>
                      <li>
                        <a href="/uploads-dpps">📤 Upload Complementary Test Series</a>
                      </li>
                      <li>
                        <a href="/manage-ebooks">📄 Manage All Ebooks</a>
                      </li>
                      <li>
                        <a href="/manage-pdfs">📄 Manage All Pdfs</a>
                      </li>
                      <li>
                        <a href="/manage-dpps">📄 Manage All Dpps</a>
                      </li>
                      <li>
                        <a href="/uploads-dpps">📄 Manage Test Series</a>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
              {/*- End Sidemenu */}
              <div className="clearfix" />
            </div>
          </div>
        </div>
    );
}

export default Sidebar;
