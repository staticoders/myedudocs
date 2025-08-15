import { useEffect, useState } from 'react';
import { Table,
  Tooltip,
  Input,
  Modal,
  message,
  Button,
  Tag,
  Space,} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const { confirm } = Modal;

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


const [courseContent, setCourseContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(`${url}/course/allCourseContent`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.result)) {
          setCourseContent(data.result);
        } else {
          console.error("Result is not array");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this content?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`${url}/course/deleteCourseContent/${id}`);
          message.success("Deleted successfully", 4);
          setCourseContent((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
          console.error(err);
          message.error("Error deleting content", 4);
        }
      },
    });
  };

  const handleApprove = (id) => {
    confirm({
      title: "Approve this course content?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Approve",
      okType: "primary",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.put(`${url}/course/updateStatus/${id}`);
          message.success("Content approved successfully", 4);
          setCourseContent((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, approved: true } : item
            )
          );
        } catch (err) {
          console.error(err);
          message.error("Error approving content", 4);
        }
      },
    });
  };

  const filteredData = courseContent.filter(
    (item) =>
      item.content_subject.toLowerCase().includes(searchText.toLowerCase()) ||
      item.content_category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Course ID",
      dataIndex: "_id",
      key: "_id",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Subject",
      dataIndex: "content_subject",
      key: "content_subject",
      width: 120,
    },
    {
      title: "Category",
      dataIndex: "content_category",
      key: "content_category",
      width: 120,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 150,
    },
    {
      title: "Published",
      dataIndex: "approved",
      key: "approved",
      width: 100,
      render: (approved) =>
        approved ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 260,
      render: (_, record) => (
        <Space wrap>
          <a
            href={`/content-details/${record._id}`}
            className="btn btn-primary text-white"
          >
            View
          </a>

          {loginUser?.tname && (
            <a
              href={`/updateCourse-content/${record._id}`}
              className="btn btn-info text-white"
            >
              Edit
            </a>
          )}

          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>

          {loginUser?.aname && (
            <Button type="primary" onClick={() => handleApprove(record._id)}>
              Approve
            </Button>
          )}
        </Space>
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
                                            <a className="btn btn-outline-success mt-3" href='/publish-course-content'>Publish Contents</a>

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
      <div className="p-4 bg-white rounded shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Course Content List
          </h2>
          <Input
            placeholder="Search by subject, category, author..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-96"
            allowClear
          />
        </div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1300 }}
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
