import { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const ManageStudents = () => {
  const Navigate = useNavigate();

  interface User {
    name?: string;
    aname?: string;
    tname?: string;
  }

  const [loginUser, setLoginuser] = useState<User>({});
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null;
    if (user) setLoginuser(user);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in! Please log in first.", 7);
      Navigate('/admin-login');
    }
  }, [Navigate]);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${url}/count/getAllStudents`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.Users)) {
          setUsers(data.Users);
        } else {
          console.error("Users is not an array:", data.Users);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`${url}/deleteStudent/${id}`);
          message.success("Student deleted successfully", 4);
          fetchUsers();
        } catch (error) {
          console.error(error);
          message.error("Error deleting student", 4);
        }
      }
    });
  };

  const handleApprove = (id: string) => {
    Modal.confirm({
      title: 'Approve this student?',
      content: 'They will be marked as verified.',
      okText: 'Yes, Approve',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.put(`${url}/updateStudentStatus/${id}`);
          message.success("Student approved successfully", 4);
          fetchUsers();
        } catch (error) {
          console.error(error);
          message.error("Error approving student", 4);
        }
      }
    });
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id", width: 200 },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Phone", dataIndex: "phn", key: "phn", width: 200 },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status: string) =>
        status === "approved" ? <Tag color="green">Approved</Tag> : <Tag color="red">Pending</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <a
            className="btn btn-sm btn-primary me-2"
            href={`/userProfile/${record._id}`}
          >
            View
          </a>
          <Button
            danger
            size="small"
            className="me-2"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => handleApprove(record._id)}
          >
            Approve
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <div className="wrapper">
        <Topbar />
        {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Dashboard / Student Management</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Table
                  rowKey="_id"
                  columns={columns}
                  dataSource={users}
                  loading={loading}
                  bordered
                  pagination={{ pageSize: 8 }}
                />
              </div>
            </div>
          </div>

          <footer className="bg-secondary text-light pt-4 mt-5">
            <div className="container text-center text-md-start p-3">
              <div className="row">
                <div className="col-md-4">
                  <h5 className="fw-bold text-light">About Us</h5>
                  <p className="small">We provide high-quality services and ensure customer satisfaction with innovative solutions.</p>
                </div>
                <div className="col-md-4 text-center">
                  <h5 className="fw-bold text-light">Quick Links</h5>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="/" className="text-decoration-none text-light">Home</a>
                    <a href="/about" className="text-decoration-none text-light">About</a>
                    <a href="/services" className="text-decoration-none text-light">Services</a>
                    <a href="/contact" className="text-decoration-none text-light">Contact</a>
                  </div>
                </div>
                <div className="col-md-4 text-center text-md-end">
                  <h5 className="fw-bold text-light">Follow Us</h5>
                  <a href="#" className="bg-primary btn btn-outline-light btn-sm me-2"><i className="bi bi-facebook" /></a>
                  <a href="#" className="btn btn-outline-light btn-sm me-2"><i className="bi bi-twitter" /></a>
                  <a href="#" className="bg-danger btn btn-outline-light btn-sm me-2"><i className="bi bi-instagram" /></a>
                  <a href="#" className="bg-primary btn btn-outline-light btn-sm"><i className="bi bi-linkedin" /></a>
                </div>
              </div>
              <hr className="my-3 text-secondary" />
              <div className="text-center pb-3 small">
                <b>&copy; 2025 MyEdudocs. All Rights Reserved.</b>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ManageStudents;
