import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Button,
  message,
  Tag,
  Input,
  Space,
  Typography,
  Card,
  Badge,
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  FieldTimeOutlined,
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  MessageOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../url";
import dayjs from "dayjs";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function StudentExamList() {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();

  // Load logged in user
  useEffect(() => {
    const user = localStorage.getItem("edudocs")
      ? JSON.parse(localStorage.getItem("edudocs"))
      : null;
    if (user) {
      setLoginUser(user);
    } else {
      message.warning("Please log in first");
      navigate("/student-login");
    }
  }, [navigate]);

  // Fetch all exams
  useEffect(() => {
    axios
      .get(`${url}/exam/student/list`)
      .then((res) => {
        if (res.data.success) {
          setExams(res.data.exams);
        } else {
          message.warning("No exams found");
        }
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to load exams");
        setLoading(false);
      });
  }, []);

  // Status checker
  const getExamStatus = (scheduledAt, durationMinutes) => {
    if (!scheduledAt) return "Not Scheduled";
    const now = dayjs();
    const start = dayjs(scheduledAt);
    const end = start.add(durationMinutes, "minute");

    if (now.isBefore(start)) return "Upcoming";
    if (now.isAfter(end)) return "Expired";
    return "Ongoing";
  };

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("edudocs");
    message.success("Logged out successfully");
    navigate("/student-login");
  };

  const profileMenu = {
    items: [
      { key: "1", label: "👤 My Profile", onClick: () => navigate("/student/profile") },
      { key: "2", label: "⚙️ Settings", onClick: () => navigate("/student/settings") },
      { type: "divider" },
      { key: "3", label: "🚪 Logout", onClick: logoutHandler },
    ],
  };

  // Table columns
  const columns = [
    { title: "Title", dataIndex: "title", sorter: (a, b) => a.title.localeCompare(b.title) },
    { title: "Subject", dataIndex: "subject", sorter: (a, b) => a.subject.localeCompare(b.subject) },
    { title: "Total Marks", dataIndex: "totalMarks" },
    { title: "Duration (min)", dataIndex: "durationMinutes" },
    {
      title: "Scheduled At",
      dataIndex: "scheduledAt",
      render: (text) => (text ? dayjs(text).format("DD MMM YYYY, HH:mm") : "Not Scheduled"),
      sorter: (a, b) => dayjs(a.scheduledAt).unix() - dayjs(b.scheduledAt).unix(),
    },
    {
      title: "Status",
      render: (_, record) => {
        const status = getExamStatus(record.scheduledAt, record.durationMinutes);
        let color =
          status === "Ongoing" ? "green" :
          status === "Upcoming" ? "blue" :
          status === "Expired" ? "red" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        const status = getExamStatus(record.scheduledAt, record.durationMinutes);
        return (
          <Button
            type="primary"
            icon={<FieldTimeOutlined />}
            disabled={status !== "Ongoing"}
            onClick={() => navigate(`/student/exams/ongoing/${record._id}`)}
          >
            Start Exam
          </Button>
        );
      },
    },
  ];

  const filteredExams = exams.filter(
    (exam) =>
      exam.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      exam.subject?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}
      >
        <div style={{ padding: "16px", fontWeight: "bold", color: "#722ed1", textAlign: "center" }}>
          🎓 LMS
        </div>
        <Menu
          mode="inline"
          items={[
            { key: "1", icon: <BarChartOutlined />, label: "Dashboard", onClick: () => navigate("/student/dashboard") },
            { key: "2", icon: <BookOutlined />, label: "My Courses", onClick: () => navigate("/student/courses") },
            { key: "3", icon: <FileTextOutlined />, label: "Exams", onClick: () => navigate("/student/exams") },
            { key: "4", icon: <FileSearchOutlined />, label: "Results", onClick: () => navigate("/student/results") },
            { key: "5", icon: <CalendarOutlined />, label: "Calendar", onClick: () => navigate("/student/calendar") },
            { key: "6", icon: <MessageOutlined />, label: "Messages", onClick: () => navigate("/student/messages") },
          ]}
        />
      </Sider>

      {/* Main layout */}
      <Layout>
        {/* Top Header */}
        <Header style={{ background: "#fff", padding: "0 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={4} style={{ margin: 0 }}>Available Exams</Title>
          <Space>
            <Badge count={notifications}>
              <NotificationOutlined style={{ fontSize: "18px" }} />
            </Badge>
            <Dropdown menu={profileMenu} trigger={["click"]}>
              <Button icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>

        {/* Page Content */}
        <Content style={{ margin: 24 }}>
          <Card>
            <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}>
              <Input
                placeholder="Search exams"
                prefix={<SearchOutlined />}
                style={{ width: 250 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Space>

            <Table
              rowKey="_id"
              columns={columns}
              dataSource={filteredExams}
              loading={loading}
              bordered
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
