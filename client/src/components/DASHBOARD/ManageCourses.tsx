    import { useEffect, useState } from 'react';
    import { Table, Button, message, Space,Modal } from 'antd'
    import { useNavigate } from 'react-router-dom'
    import axios from 'axios';

    import Sidebar from './Sidebar';
    import Topbar from './Topbar';
    import Sidebar2 from './Sidebar2';
    import url from '../../url';


    interface Course {
    _id: string;
    title: string;
    short_desc: string;
    long_desc: string;
    price: string;
    duration: string;
    teacher_id: string;
    coverphoto: string;
    language: string;
    skill_level: string;
    }

    const ManageCourses = () => {



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

        // all courses 


    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'delete' | 'approve' | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);


    // Fetch courses
    useEffect(() => {
        fetch(`${url}/course/allCourses`)
        .then((response) => response.json())
        .then((data) => {
            setCourses(data.courses);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching Courses:", error);
            message.error("Failed to fetch courses");
            setLoading(false);
        });
    }, []);


    // Open modal handler
    const showModal = (type: 'delete' | 'approve', course: Course) => {
        setSelectedCourse(course);
        setModalType(type);
        setIsModalOpen(true);
    };


    // Modal confirmation handler
    const handleOk = async () => {
        if (!selectedCourse || !modalType) return;
        try {
        if (modalType === "delete") {
            await axios.delete(`https://api.myedudocs.in/api/v1/course/deleteCourse/${selectedCourse._id}`);
            message.success("Course deleted");
            setCourses(courses.filter(c => c._id !== selectedCourse._id));
        } else if (modalType === "approve") {
            await axios.put(`https://api.myedudocs.in/api/v1/course/UpdateCourseApprovalStatus/${selectedCourse._id}`);
            message.success("Course approved");
            // Optional: Refresh or update the state there if needed
        }
        } catch (err) {
        message.error("Action failed");
        } finally {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedCourse(null);
        }
    };


    // Modal cancel handler
    const handleCancel = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedCourse(null);
    };


    //table columns
    const columns = [
        {
        title: "Course ID",
        dataIndex: "_id",
        key: "_id",
        },
        {
        title: "Course Name",
        dataIndex: "title",
        key: "title",
        },
        {
        title: "Instructor",
        dataIndex: "short_desc",
        key: "short_desc",
        },
        {
        title: "Duration",
        dataIndex: "long_desc",
        key: "long_desc",
        },
        {
        title: "Price",
        dataIndex: "price",
        key: "price",
        },
        {
        title: "Language",
        dataIndex: "language",
        key: "language",
        },
        {
        title: "Skill Level",
        dataIndex: "skill_level",
        key: "skill_level",
        },
        {
        title: "Actions",
        key: "actions",
        render: (_: any, record: Course) => (
            <Space>
            <a href={`/CourseDetails/${record._id}`}>
                <Button>View</Button>
            </a>
            <a href={`/updateCourse/${record._id}`}>
                <Button type="default">Edit</Button>
            </a>
            <Button danger onClick={() => showModal('delete', record)}>Delete</Button>
            {'aname' in loginUser && (
                <Button type="primary" onClick={() => showModal('approve', record)}>Approve</Button>
            )}
            </Space>
        )
        }
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
                                        <div style={{ padding: 24 }}>
        <h2>All Courses</h2>
        <Table
            dataSource={courses}
            columns={columns}
            loading={loading}
            rowKey="_id"
            scroll={{ x: "max-content" }}
        />

        {/* Reusable Modal for Delete / Approve */}
        <Modal
            open={isModalOpen}
            title={
            modalType === 'delete'
                ? "Delete Course"
                : modalType === 'approve'
                ? "Approve Course"
                : ""
            }
            onOk={handleOk}
            onCancel={handleCancel}
            okText={modalType === 'delete' ? "Delete" : "Approve"}
            okButtonProps={{ danger: modalType === 'delete' }}
        >
            {modalType && selectedCourse && (
            <p>
                Are you sure you want to{" "}
                <strong>{modalType}</strong>{" "}
                course <strong>{selectedCourse.title}</strong>?
            </p>
            )}
        </Modal>
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

    export default ManageCourses;
