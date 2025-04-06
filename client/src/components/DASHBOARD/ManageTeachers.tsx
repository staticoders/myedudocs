import  { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const ManageTeachers = () => {


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

    // all teachers 
    interface TeachersData {
        teacherCount: number;
    }

    const [teachers, setTeachers] = useState<TeachersData>({ teacherCount: 0 });
    // const [loading, setLoading] = useState(true);
    const [teacherCount, setteacherCount] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/count/getAllTeachers") // Update with your backend URL
            .then((response) => response.json())
            .then((data) => {
                setTeachers(data);
                if (Array.isArray(data.Teachers)) {
                    setTeachers(data.Teachers);
                    setteacherCount(data.teacherCount)
                } else {
                    console.error("teachers is not an array:", data.Teachers);
                }
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Teachers:", error);
                // setLoading(false);
            });
    }, []);

    console.log(teachers);


    // Datagrid
    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        { field: "tname", headerName: "Name", width: 200 },
        { field: "temail", headerName: "Email", width: 200 },
        { field: "tphn", headerName: "Phone", width: 200 },
        { field: "tspecialization", headerName: "Specialization", width: 200 },
        { field: "texp", headerName: "Experience(In Years)", width: 200 },
        { field: "Status", headerName: "Status", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 300,
            renderCell: (params: any) => (
                <Stack direction="row" spacing={1}>
                    <a className='btn btn-primary' href={`/teacherProfile/${params.row._id}`} style={{ textDecoration: 'none', color: 'primary' }}>View</a>
                    {/* <Button variant="contained" color="secondary" size="small" >Edit</Button> */}
                    <Button onClick={
                      async () => {
                        try {
                            const response = await axios.delete(`http://localhost:8080/api/v1/deleteTeacher/${params.row._id}`);
                            // console.log(response.data); // Handle success response
                            message.success("Teacher Deleted Successfully", 4)
                            // window.location.reload()
                            setTimeout(() => {
                                window.location.reload(); // Reloads the current page
                            }, 4000);
                        } catch (error) {
                            console.error(error); // Handle error response
                            message.error("Error Deleting Teacher", 4)
                        }
                    }
                    } variant="contained" color="error" size="small" >Delete</Button>
                    <Button onClick={
                      async () => {
                        try {
                            const response = await axios.put(`http://localhost:8080/api/v1/updateTeacherStatus/${params.row._id}`);
                            //console.log(response.data); // Handle success response
                            message.success("Teacher Approved Successfully ! He Is Now Verified", 4)
                            setTimeout(() => {
                                window.location.reload(); // Reloads the current page
                            }, 4000);
                            // window.location.reload()
                        } catch (error) {
                            console.error(error); // Handle error response
                            message.error("Error Approving Teacher", 4)
                        }
                    }
                    } variant="contained" color="success" size="small" >Approve</Button>
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

                                            </div>
                                            <h4 className="page-title">Dashboard/Teacher Management</h4>
                                            <span>Total Teachers : {teacherCount}</span>
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
                                            rows={Array.isArray(teachers) ? teachers.map((teacher, index) => ({ ...teacher, id: index + 1 })) : []}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 5 },
                                                },
                                            }}
                                            paginationModel={{ page: 0, pageSize: 5 }}
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

export default ManageTeachers;
