import { useEffect, useState } from 'react';
import { message } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';


const UpdateCourseContent = () => {




    const id = useParams()
    console.log(id);

    interface CourseContent {
        content_subject: string;
        content_category: string;
        content: string;
        [key: string]: any; // for any additional dynamic fields
    }

    const [Courses, setCourses] = useState<CourseContent>({
        content_subject: '',
        content_category: '',
        content: ''
    });
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/course/courseContentDetails/${id.id}`)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data.contents);
            })
            .catch((error) => {
                console.error("Error fetching Courses:", error);

            });
    }, []);

    console.log(Courses);

    // update course function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourses((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const UpdateCourseContent = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in Courses) {
            formData.append(key, Courses[key]);
        }

        try {
            await axios.put(`http://localhost:8080/api/v1/course/UpdateCourseContent/${id.id}`, formData,);
            message.success(" Content Updated Successfully");
            setTimeout(() => {
                window.location.href = "/manage-courses-content";
            }, 2000);
        } catch (error) {
            message.error("Error Encountered !! Content Not Updated");
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
                                    <form onSubmit={UpdateCourseContent} className="bg-light p-5 shadow-sm rounded">
                                        <div className="form-group">
                                            <label htmlFor="content_subject">Content Subject</label>
                                            <input type="text" placeholder="Subject Of the Content" id="content_subject" className=" form-control" name="content_subject" value={Courses.content_subject}
                                                onChange={handleChange} required={true} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="content_category">Content Category</label>
                                            <input type="text" placeholder="Category of the Content" id="content_category" className="form-control" name="content_category" value={Courses.content_category}
                                                onChange={handleChange} required={true} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="content">Main Content</label>
                                            <textarea className='form-control' name="content" id="content" value={Courses.content}
                                                onChange={handleChange} required={true}></textarea>
                                        </div>

                                        <input type="hidden" name="author" value={loginUser.tname} />

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

export default UpdateCourseContent;

