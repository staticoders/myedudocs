import { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';


const UpdateCourse = () => {

    const id = useParams()
    console.log(id);

    const [Courses, setCourses] = useState({
        cname: "",
        cinstructor: "",
        cdur: 0,
        clesson: 0,
        cskill_level: "",
        clanguage: "",
        c_category: "",
        cprice: 0,
        cimage: null,
        cdesc: "",
        cvdolink: "",
    });
    useEffect(() => {
        fetch(`${url}/course/courseDetails/${id.id}`)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data.course);
            })
            .catch((error) => {
                console.error("Error fetching Courses:", error);

            });
    }, []);

    console.log(Courses);


    const [teachersName, SetTeachersName] = useState([])
    useEffect(() => {
        fetch(`${url}/allteachersName`) // Update with your backend URL
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


    // update course function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourses((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setCourses((prev) => ({
            ...prev,
            cimage: file,
        }));
    };

    const UpdateCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in Courses) {
            formData.append(key, Courses[key]);
        }

        try {
            await axios.put(`${url}/course/updateCourse/${id.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success("Course Updated Successfully");

            setTimeout(() => {
                window.location.href = "/manage-courses";
            }, 2000);
        } catch (error) {
            message.error("Error Encountered !! Course Not Updated");
            console.error(error);
        }
    };

    // Get user from local storage
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
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <h4 className="page-title">Dashboard/Update Course</h4>
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
                                    <form onSubmit={UpdateCourse} encType="multipart/form-data" className="bg-light p-5 shadow-sm rounded">
                                        <div className="form-group">
                                            <label htmlFor="cname">Course Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Course Name"
                                                id="cname"
                                                className="form-control"
                                                name="cname"
                                                value={Courses.cname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cinstructor">Course Instructor</label>
                                            <select
                                                className="form-select"
                                                name="cinstructor"
                                                value={Courses.cinstructor}
                                                onChange={handleChange}
                                            >
                                                {teachersName.map((teacher) => (
                                                    <option key={teacher.tname} value={teacher.tname}>
                                                        {teacher.tname}
                                                    </option>
                                                ))}
                                                <option key="Admin" value="Admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label htmlFor="cdur">Duration Of The Course</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Duration Of The Course"
                                                id="cdur"
                                                className="form-control"
                                                name="cdur"
                                                value={Courses.cdur}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="clesson">Total Lessons</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Total Lessons Of The Course"
                                                id="clesson"
                                                className="form-control"
                                                name="clesson"
                                                value={Courses.clesson}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cskill_level">Required Skill Level</label>
                                            <select
                                                className="form-select"
                                                name="cskill_level"
                                                value={Courses.cskill_level}
                                                onChange={handleChange}
                                            >
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Intermidiate">Intermidiate</option>
                                            </select>
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label htmlFor="clanguage">Language Of The Course</label>
                                            <select
                                                className="form-select"
                                                name="clanguage"
                                                value={Courses.clanguage}
                                                onChange={handleChange}
                                            >
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label htmlFor="c_category">Category Of The Course</label>
                                            <select
                                                className="form-select"
                                                name="c_category"
                                                value={Courses.c_category}
                                                onChange={handleChange}
                                            >
                                                <option value="Science">Science</option>
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
                                            <input
                                                type="number"
                                                placeholder="Enter Price Of The Course"
                                                id="cprice"
                                                className="form-control"
                                                name="cprice"
                                                value={Courses.cprice}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cimage">Course Image</label>
                                            <input
                                                type="file"
                                                id="cimage"
                                                className="form-control"
                                                name="cimage"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cprice">Video Link Of The Course</label>
                                            <input
                                                type="text"
                                                placeholder="Video Link Of The Course"
                                                id="cvdolink"
                                                className="form-control"
                                                name="cvdolink"
                                                value={Courses.cvdolink}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cdesc">Course Description</label>
                                            <textarea
                                                id="cdesc"
                                                className="form-control"
                                                name="cdesc"
                                                rows={5}
                                                value={Courses.cdesc}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-lg-12 mt-4">
                                            <button className="bg_btn bt" type="submit" name="submit">
                                                Update Course
                                            </button>
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

export default UpdateCourse;

