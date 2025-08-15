import React, { useState, useEffect } from "react";
import { Layout, Menu, Card, Statistic, Row, Col, List, Button, Badge, message, Dropdown, Space, Typography } from "antd";
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
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<any>({});
  const [notifications, setNotifications] = useState(3);

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

  const logoutHandler = () => {
    localStorage.removeItem("edudocs");
    message.success("Logged out successfully");
    navigate("/student-login");
  };

  const menuItems = [
    { key: "1", icon: <BarChartOutlined />, label: <Link to="/student/dashboard">Dashboard</Link> },
    { key: "2", icon: <BookOutlined />, label: <Link to="/student/courses">My Courses</Link> },
    { key: "3", icon: <FileTextOutlined />, label: <Link to="/student/exams">Exams</Link> },
    { key: "4", icon: <FileTextOutlined />, label: <Link to="/students/live-sessions">Live Sessions</Link> },
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
        <Header style={{ background: "#fff", padding: "0 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          {/* Stats */}
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Card><Statistic title="Active Courses" value={5} prefix={<BookOutlined />} /></Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card><Statistic title="Pending Exams" value={3} prefix={<FileTextOutlined />} /></Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card><Statistic title="GPA" value={4.5} suffix="/5" prefix={<BarChartOutlined />} /></Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card><Statistic title="New Alerts" value={notifications} prefix={<NotificationOutlined />} /></Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: "24px" }}>
            {/* Recent Activity */}
            <Col xs={24} lg={16}>
              <Card title="📢 Recent Activity" bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "✅ Completed 'AI Quiz 2'",
                    "📄 Uploaded 'Web Design Project'",
                    "💯 Scored 95% in 'DSA Midterm'",
                  ]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>

            {/* Upcoming Deadlines + Quick Actions */}
            <Col xs={24} lg={8}>
              <Card title="⏳ Upcoming Deadlines" style={{ marginBottom: "24px" }}>
                <List
                  size="small"
                  dataSource={[
                    "📄 AI Project Submission – 28 May",
                    "📝 Midterm Exam – 1 Jun",
                    "📊 Stats Quiz – 5 Jun",
                  ]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>

              <Card title="⚡ Quick Actions">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button type="primary" block>📝 Join Exam</Button>
                  <Button type="default" block>📁 Study Material</Button>
                  <Button type="dashed" block>📊 View Results</Button>
                  <Button danger block>💬 Ask Doubt</Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
