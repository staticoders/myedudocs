import { useEffect, useState } from 'react';
import { message, Table, Button, Space,Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import url from '../../url';

const ManageTeachers = () => {
  const Navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<any>({});
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) {
      setLoginUser(user);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning('You are not logged in! Please login first.', 7);
      Navigate('/admin-login');
    }
  }, [Navigate]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/count/getAllTeachers`);
      if (Array.isArray(response.data.Teachers)) {
        setTeachers(response.data.Teachers);
      } else {
        console.error('Invalid data format:', response.data.Teachers);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      message.error('Failed to fetch teacher data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

const handleDelete = async (id: string) => {
  Modal.confirm({
    title: 'Delete Teacher',
    content: 'Are you sure you want to delete this teacher?',
    okText: 'Yes, Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        await axios.delete(`${url}/deleteTeacher/${id}`);
        message.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        console.error(error);
        message.error('Error deleting teacher');
      }
    }
  });
};

const handleApprove = async (id: string) => {
  Modal.confirm({
    title: 'Approve Teacher',
    content: 'Are you sure you want to approve this teacher?',
    okText: 'Yes, Approve',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        await axios.put(`${url}/updateTeacherStatus/${id}`);
        message.success('Teacher approved successfully');
        fetchTeachers();
      } catch (error) {
        console.error(error);
        message.error('Error approving teacher');
      }
    }
  });
};

const columns = [
  { title: 'ID', dataIndex: '_id', key: '_id', width: 200 },
  { title: 'Name', dataIndex: 'tname', key: 'tname' },
  { title: 'Email', dataIndex: 'temail', key: 'temail' },
  { title: 'Phone', dataIndex: 'tphn', key: 'tphn' },
  { title: 'Specialization', dataIndex: 'tspecialization', key: 'tspecialization' },
  { title: 'Experience', dataIndex: 'texp', key: 'texp' },
  { title: 'Status', dataIndex: 'Status', key: 'Status' },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: any) => (
      <Space size="middle">
        <a className="btn btn-primary" href={`/teacherProfile/${record._id}`}>
          View
        </a>
        <Button danger size="small" onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
        <Button type="primary" size="small" onClick={() => handleApprove(record._id)}>
          Approve
        </Button>
      </Space>
    ),
  },
];

  return (
    <div className="wrapper">
      <Topbar />
      <Sidebar />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Dashboard / Teacher Management</h4>
                  <span>Total Teachers: {teachers.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <Table
              columns={columns}
              dataSource={teachers}
              loading={loading}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              bordered
            />
          </div>

          <footer className="bg-secondary text-light pt-4 mt-5">
            <div className="container text-center text-md-start p-3">
              <div className="row">
                <div className="col-md-4">
                  <h5 className="fw-bold text-light">About Us</h5>
                  <p className="small">
                    We provide high-quality services and ensure customer satisfaction with innovative solutions.
                  </p>
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
                <b> &copy; 2025 MyEdudocs. All Rights Reserved.</b>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;
