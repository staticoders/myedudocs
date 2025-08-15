import { useEffect, useState } from 'react';
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const UploadQuestions = () => {



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




    const { examId } = useParams();
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const props = {
        multiple: true,
        beforeUpload: (file) => {
            setFileList(prev => [...prev, file]);
            return false;
        },
        onRemove: (file) => {
            setFileList(prev => prev.filter(f => f.uid !== file.uid));
        },
        fileList
    };

    const handleUpload = async () => {
        if (fileList.length === 0) return message.warning("Please select files first.");
        setUploading(true);

        const formData = new FormData();
        fileList.forEach(file => formData.append("files", file));

        try {
            await axios.post(`${url}/exams/${examId}/upload-questions`, formData);
            message.success("Files uploaded successfully");
            setFileList([]);
        } catch (err) {
            console.error(err);
            message.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };





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
                                            <a className="btn btn-outline-success mt-3" href='/publish-course-content'>Publish Contents</a>

                                        </div>
                                    </div>
                                </div>


                                {/* end row */}
                            </div>
                            {/* container */}
                        </div>
                        <h4>Upload Questions for Exam</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">

                                    <Upload {...props}>
                                        <Button icon={<UploadOutlined />}>Select Files</Button>
                                    </Upload>
                                    <Button
                                        type="primary"
                                        onClick={handleUpload}
                                        disabled={fileList.length === 0}
                                        loading={uploading}
                                        className="mt-3"
                                    >
                                        Upload Now
                                    </Button>

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

export default UploadQuestions;
