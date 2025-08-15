import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Descriptions, Tag, Row, Col, message } from 'antd';
import { CalendarOutlined, MailOutlined, PhoneOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const { Title, Text } = Typography;

interface User {
  name?: string;
  aname?: string;
  tname?: string;
  email?: string;
  phn?: string;
  Status?: string;
  updatedAt?: string;
}

const StudentProfile = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [loginUser, setLoginuser] = useState<User>({});
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning('You are not already logged in! First log in to your account.', 7);
      Navigate('/admin-login');
    }
  }, [Navigate]);

  useEffect(() => {
    fetch(`${url}/userProfile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const formattedDate = (user.updatedAt && new Date(user.updatedAt).toLocaleDateString()) || 'N/A';

  return (
    <div className="wrapper">
      <Topbar />
      {'aname' in loginUser ? <Sidebar /> : <Sidebar2 />}

      <div className="content-page">
        <div className="content">
          <div className="container mt-5">
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} sm={20} md={16} lg={14}>
                <Card
                  title={
                    <div style={{ textAlign: 'center' }}>
                      <Title level={3} style={{ marginBottom: 0 }}>{user.name}</Title>
                      <Text type="secondary">
                        <CalendarOutlined /> Joined on {formattedDate}
                      </Text>
                    </div>
                  }
                  bordered={false}
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    background: '#fdfdfd',
                  }}
                >
                  <Descriptions
                    bordered
                    column={1}
                    labelStyle={{ fontWeight: 'bold', width: '150px' }}
                  >
                    <Descriptions.Item label={<><UserOutlined /> Name</>}>
                      {user.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><MailOutlined /> Email</>}>
                      {user.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
                      {user.phn}
                    </Descriptions.Item>
                    <Descriptions.Item label="Account Created">
                      {formattedDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Verification Status">
                      {user.Status === 'approved' ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>
                      ) : (
                        <Tag color="warning">Pending</Tag>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Courses Enrolled">
                      <Tag color="blue">5</Tag> {/* You can dynamically update this */}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <footer className="bg-secondary text-light pt-4">
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
  );
};

export default StudentProfile;
