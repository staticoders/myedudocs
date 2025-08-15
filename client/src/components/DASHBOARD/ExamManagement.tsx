import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Button, message, Modal, Card, Typography } from "antd";
import dayjs from "dayjs";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import EditExamModal from "./EditExamModal"; // See next file below
import url from "../../url";

const { Title } = Typography;

const ExamManagement = () => {
  const [loginUser, setLoginUser] = useState({});
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teacherId } = useParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("edudocs");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch exams when user or teacherId changes
  useEffect(() => {
    const id = loginUser?.id || teacherId;
    if (id) fetchExams(id);
  }, [loginUser, teacherId]);

  const fetchExams = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/exam/teacher/${id}`);
      const response = res.data.exams;
      setExams(Array.isArray(response) ? response : [response]);
    } catch (err) {
      console.error(err);
      message.error("❌ Failed to load exams");
    }
    setLoading(false);
  };

  // Open your custom edit modal
  const openEditModal = (exam) => {
    setCurrentExam(exam);
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (exam) => {
    setCurrentExam(exam);
    setIsDeleteModalOpen(true);
  };

  // Handle exam delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/exam/${currentExam._id}`);
      message.success("🗑️ Exam deleted");
      setIsDeleteModalOpen(false);
      fetchExams(loginUser?.id || teacherId);
    } catch (err) {
      console.error(err);
      message.error("❌ Failed to delete exam");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text) => text || <span style={{ color: "#999" }}>N/A</span>,
    },
    { title: "Duration (min)", dataIndex: "durationMinutes" },
    { title: "Total Marks", dataIndex: "totalMarks" },
    {
      title: "Scheduled At",
      dataIndex: "scheduledAt",
      render: (text) =>
        text ? dayjs(text).format("DD MMM YYYY, HH:mm") : "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => openDeleteModal(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="wrapper">
      <Topbar />
      {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
      <div className="content-page" style={{ padding: 24 }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={3} style={{ marginBottom: 20 }}>
            Manage Exams
          </Title>
          <Table
            columns={columns}
            dataSource={exams}
            rowKey="_id"
            loading={loading}
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Edit Modal */}
        {isEditModalOpen && currentExam && (
          <EditExamModal
            examId={currentExam._id}
            visible={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onExamUpdated={() => {
              setIsEditModalOpen(false);
              fetchExams(loginUser?.id || teacherId);
            }}
          />
        )}

        {/* Delete Modal */}
        <Modal
          title="Confirm Delete"
          open={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onOk={handleDelete}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>
            Are you sure you want to delete the exam{" "}
            <b>{currentExam?.title}</b>?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default ExamManagement;
