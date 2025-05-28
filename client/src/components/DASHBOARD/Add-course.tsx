import { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button, Stack } from "@mui/material";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';

const AddCourse = () => {



    interface Teacher {
        tname: string;
    }

    const [teachersName, SetTeachersName] = useState<Teacher[]>([])

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/allteachersName") // Update with your backend URL
            .then((response) => response.json())
            .then((data) => {
                SetTeachersName(data.teachers);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching teachers:", error);
                // setLoading(false);
            });
    }
        , [])

    console.log(teachersName);


    // add course function



    const addCourse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);


        try {
            await axios.post('http://localhost:8080/api/v1/course/addCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success("Course Added Successfully")
            setInterval(() => {
                window.location.href = "/manage-courses"
            }
                , 2000)

        } catch (error) {
            message.error("Error Encountered !! Course Not Added")
            console.log(error);
        }
    }


    // Get user from local storage
    const [loginUser, setLoginuser] = useState<{ name?: string, tname?: string, aname?: string }>({})
    useEffect(() => {
        const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
        if (user) {
            setLoginuser(user)
        }
    }, [])


    var link = null;
    if ("tname" in loginUser) {
        link = <Sidebar2 />;
    } 
     if ("aname" in loginUser) {
        link = <Sidebar />;
     }

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
                                    <div className="col-10">
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <h4 className="page-title">Dashboard/Add Course</h4>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <a href='/manage-courses' className="btn btn-outline-warning mt-3">Manage Course</a>
                                        </div>
                                    </div>
                                </div>


                                {/* end row */}
                            </div>
                            {/* container */}
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 p-5">
                                    <form onSubmit={addCourse} encType="multipart/form-data" className="bg-light p-5 shadow-sm rounded">
                                        <div className="form-group">
                                            <label htmlFor="cname">Course Name</label>
                                            <input type="text" placeholder="Enter Course Name" id="cname" className=" form-control" name="cname" required={true} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email-address">Course Instructor</label>

                                            {"aname" in loginUser ? (
                                                <select className="form-select" aria-label="Default select example" name="cinstructor">
                                                    {teachersName.map((teacher) => (
                                                        <option key={teacher.tname} value={teacher.tname}>{teacher.tname}</option>
                                                    ))}
                                                    <option key={"Admin"} value={"Admin"}>Admin</option>
                                                </select>
                                            ) : (
                                                <select className="form-select" aria-label="Default select example" name="cinstructor">
                                                    <option key={loginUser.tname} value={loginUser.tname}>{loginUser.tname}</option>
                                                </select>
                                            )}

                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="cdur">Duration Of The Course</label>
                                            <input type="number" placeholder="Enter Duration Of The Course" id="cdur" className="form-control" name="cdur" required={true} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clesson">Total Lessons</label>
                                            <input type="number" placeholder="Enter Total Lessons Of The Course" id="clesson" className="form-control" name="clesson" required={true} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cskill_level">Required Skill Level</label>
                                            <select className="form-select" aria-label="Default select example" name="cskill_level">
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Intermidiate">Intermidiate</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="clanguage">Language Of The Course</label>
                                            <select className="form-select" aria-label="Default select example" name="clanguage">
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="c_category">Category Of The Course</label>
                                            <select className="form-select" aria-label="Default select example" name="c_category">
                                                <option value="English">Science</option>
                                                <option value="Arts">Arts</option>
                                                <option value="Apptitude">Apptitude</option>
                                                <option value="Reasoing">Reasoing</option>
                                                <option value="English">English</option>
                                                <option value="Quant">Quant</option>
                                                <option value="General Knowledge">General Knowledge</option>
                                                <option value="Current Affairs">Current Affairs</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="cprice">Price Of The Course</label>
                                            <input type="number" placeholder="Enter Price Of The Course" id="cprice" className="form-control" name="cprice" required={true} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cimage">Course Image</label>
                                            <input type="file" id="cimage" className="form-control" name="cimage" required={true} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cvdolink">Course Video Link</label>
                                            <input type="text" id="cvdolink" className="form-control" name="cvdolink" required={true} />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="cdesc">Course Description</label>
                                            <textarea id="cdesc" className="form-control" name="cdesc" rows={5} required={true} />
                                        </div>



                                        <div className="form-group col-lg-12">
                                            <button className="bg_btn bt" type="submit" name="submit">Add Now</button>
                                        </div>
                                    </form>
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

export default AddCourse;
