import { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';

const ManageCoursesContent = () => {



    const Navigate = useNavigate();



    // Get user from local storage
    const [loginUser, setLoginuser] = useState<{ name?: string, tname?: string, aname?: string }>({})
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

    // all Users 
    interface UsersData {
        userCount?: number;
    }

    const [courseContent, setcourseContent] = useState<UsersData>({});

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/course/allCourseContent")
            .then((response) => response.json())
            .then((data) => {
                setcourseContent(data.result);
            })
            .catch((error) => {
                console.error("Error fetching Courses:", error);

            });
    }, []);


    var link = null;
    if ("tname" in loginUser) {
        link = <Sidebar2 />;
    } 
     if ("aname" in loginUser) {
        link = <Sidebar />;
     }




    const columns = [ 
        { field: "_id", headerName: "Course ID", width: 200 },
        { field: "content_subject", headerName: "Subject", width: 200 },
        { field: "content_category", headerName: "Category", width: 200 },
        { field: "content", headerName: "Content", width: 200 },
        { field: "author", headerName: "Author", width: 200 },
        { field: "approved", headerName: "Published Status", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 300,
            renderCell: (params: any) => (
                <Stack direction="row" spacing={1}>
                    <a className='btn btn-primary' href={`/content-details/${params.row._id}`} style={{ textDecoration: 'none', color: 'primary' }}>View</a>
                    {"tname" in loginUser && (
                        <a className="btn btn-info" href={`/updateCourse-content/${params.row._id}`} style={{ textDecoration: 'none', color: 'primary' }}>Edit</a>
                    )}
                    <Button onClick={
                        async () => {
                            try {
                                const response = await axios.delete(`http://localhost:8080/api/v1/course/deleteCourseContent/${params.row._id}`);
                                // console.log(response.data); // Handle success response
                                message.success("Content Deleted Successfully", 4)
                                // window.location.reload()
                                setTimeout(() => {
                                    window.location.reload(); // Reloads the current page
                                }, 4000);
                            } catch (error) {
                                console.error(error); // Handle error response
                                message.error("Error Deleting Content", 4)
                            }
                        }
                    } variant="contained" color="error" size="small" >Delete</Button>
                    {"aname" in loginUser && (
                        <Button
                            onClick={
                                async () => {
                                    try {
                                        const response = await axios.put(`http://localhost:8080/api/v1/course/updateStatus/${params.row._id}`);
                                        // console.log(response.data); // Handle success response
                                        message.success("Course Content Approved Successfully", 4)
                                        // window.location.reload()
                                        setTimeout(() => {
                                            window.location.reload(); // Reloads the current page
                                        }, 4000);
                                    } catch (error) {
                                        console.error(error); // Handle error response
                                        message.error("Error occured in Course Content Approved ", 4)
                                    }
                                }
                            }
                            variant="contained"
                            color="success"
                            size="small"
                        >
                            Approve
                        </Button>
                    )}
                </Stack>
            ),
        },

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
                                    <div className="col-md-10">
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <h4 className="page-title">Dashboard/Course Management</h4>
                                            {/* <span>Total Student :{UsersCount.userCount}</span> */}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <a className="btn btn-outline-success mt-3" href='/add-courses'>Add Course</a>

                                        </div>
                                    </div>
                                </div>


                                {/* end row */}
                            </div>
                            {/* container */}
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{ height: 400, width: "100%" }}>
                                        <DataGrid
                                            rows={Array.isArray(courseContent) ? courseContent.map((content, index) => ({ ...content, id: index + 1 })) : []}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 5 },
                                                },
                                            }}
                                            pagination
                                            pageSizeOptions={[5, 10, 20]}
                                        />
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

export default ManageCoursesContent;
