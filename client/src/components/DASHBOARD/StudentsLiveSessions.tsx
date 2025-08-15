import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Card,
  Statistic,
  Row,
  Col,
  List,
  Button,
  Badge,
  message,
  Dropdown,
  Space,
  Typography,
  Tooltip,
} from "antd";
import {
  BookOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
  LogoutOutlined,
  NotificationOutlined,
  FileSearchOutlined,
  VideoCameraFilled,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import url from "../../url";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function StudentsLiveSessions() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<any>({});
  const [notifications, setNotifications] = useState(3);
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("edudocs")
      ? JSON.parse(localStorage.getItem("edudocs") as string)
      : null;
    if (user) setLoginUser(user);
    else {
      message.warning("Please log in first");
      navigate("/student-login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLiveSessions = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${url}/live-sessions`);
        setLiveSessions(resp.data); // make sure your backend sends an array
      } catch {
        message.error("Failed to fetch live sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchLiveSessions();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("edudocs");
    message.success("Logged out successfully");
    navigate("/student-login");
  };

  const menuItems = [
    { key: "1", icon: <BarChartOutlined />, label: <Link to="/student/dashboard">Dashboard</Link> },
    { key: "2", icon: <BookOutlined />, label: <Link to="/student/courses">My Courses</Link> },
    { key: "3", icon: <FileTextOutlined />, label: <Link to="/student/exams">Exams</Link> },
    { key: "4", icon: <VideoCameraFilled />, label: <Link to="/students/live-sessions">Live Sessions</Link> },
    { key: "5", icon: <FileSearchOutlined />, label: <Link to="/student/results">Results</Link> },
    { key: "6", icon: <CalendarOutlined />, label: <Link to="/student/calendar">Calendar</Link> },
    { key: "7", icon: <MessageOutlined />, label: <Link to="/student/messages">Messages</Link> },
  ];

  const profileMenu = {
    items: [
      { key: "1", label: <Link to="/student/profile">👤 My Profile</Link> },
      { key: "2", label: <Link to="/student/settings">⚙️ Settings</Link> },
      { type: "divider" },
      { key: "3", onClick: logoutHandler, label: <span><LogoutOutlined /> Logout</span> },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}>
        <div style={{ padding: "16px", fontWeight: "bold", textAlign: "center", color: "#722ed1", fontSize: "1.2rem" }}>
          🎓 LMS Portal
        </div>
        <Menu mode="inline" items={menuItems} style={{ borderRight: 0 }} />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header style={{
          background: "#fff",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Title level={4} style={{ margin: 0 }}>Welcome, {loginUser.name} 👋</Title>
          <Space>
            <Badge count={notifications}>
              <NotificationOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Badge>
            <Dropdown menu={profileMenu} placement="bottomRight" trigger={["click"]}>
              <Button icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>

        {/* Content */}
        <Content style={{ margin: "24px", overflow: "auto" }}>
          <Title level={3} style={{ marginBottom: 16 }}>Upcoming Live Sessions</Title>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Row gutter={[24, 24]}>
              {liveSessions.length === 0 && (
                <Col span={24}>
                  <Card>
                    <Text type="secondary">No live sessions available.</Text>
                  </Card>
                </Col>
              )}
              {liveSessions.map((session) => (
                <Col xs={24} sm={12} md={8} lg={6} key={session._id}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{ boxShadow: "0 2px 8px #f0f1f2", minHeight: 220 }}
                    cover={
                      <div style={{ textAlign: "center", padding: "32px 0 0 0" }}>
                        <VideoCameraFilled style={{ fontSize: "2.7rem", color: "#1890ff" }} />
                      </div>
                    }
                    actions={[
                      <Tooltip
                        title={`Enter Class: ${session.topic}`}
                        key="enter"
                      >
                        <Button
                          type="primary"
                          icon={<LoginOutlined />}
                          block
                          size="large"
                          style={{ margin: "0 12px 10px 12px" }}
                          onClick={() => window.open(session.joinUrl, "_blank")}
                        >
                          Enter Class
                        </Button>
                      </Tooltip>
                    ]}
                  >
                    <Title level={5} style={{ color: "#722ed1", marginBottom: 2 }}>{session.topic}</Title>
                    <Row gutter={8}>
                      <Col>
                        <Text strong>
                          <CalendarOutlined /> {moment(session.startTime).format("DD MMM YYYY, HH:mm")}
                        </Text>
                      </Col>
                    </Row>
                    <Row gutter={8} style={{ margin: "8px 0" }}>
                      <Col>
                        <Text type="secondary">
                          Duration: {session.duration} min
                        </Text>
                      </Col>
                    </Row>
                    <Row gutter={8} style={{ marginBottom: 8 }}>
                      <Col>
                        <Text>
                          By: {session.createdBy}
                        </Text>
                      </Col>
                    </Row>
                    {session.description && (
                      <Text italic style={{ color: "#595959" }}>{session.description}</Text>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
