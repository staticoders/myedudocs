import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message, Table, Button, Space } from "antd";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import url from "../../url";
import { Modal, DatePicker } from 'antd';
import dayjs from 'dayjs'; 
const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [showLiveModal, setShowLiveModal] = useState(false);
const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
const [dueDate, setDueDate] = useState(null);

const handleOpenLiveModal = (id) => {
  setSelectedAssignmentId(id);
  setShowLiveModal(true);
};


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("edudocs") || "{}");
    setLoginUser(user);
    if (user?.id) fetchAssignments(user.id);
  }, []);

  const fetchAssignments = async (teacherId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/assignmments/all/${teacherId}`);
      setAssignments(res.data.assignments);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };


  //live assignmmentts
  const handleMakeLiveConfirm = async () => {
  if (!dueDate) return message.warning("Please select a due date");

  try {
    await axios.put(`${url}/assignmments/make-live/${selectedAssignmentId}`, {
      dueDate: dueDate.toISOString()
    });
    message.success("Assignment is now live");
    setShowLiveModal(false);
    setSelectedAssignmentId(null);
    fetchAssignments(loginUser.id);
  } catch (err) {
    console.error(err);
    message.error("Failed to make assignment live");
  }
};


const handleDelete = async (id) => {
  try {
    await axios.delete(`${url}/assignmments/delete/${id}`);
    message.success("Assignment deleted");
    fetchAssignments(loginUser.id);
  } catch (err) {
    console.error(err);
    message.error("Failed to delete");
  }
};




const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (text) => new Date(text).toLocaleString(),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => text || "—",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Link to={`/upload-assignment/${record._id}`}>
          <Button type="primary" size="small">Upload</Button>
        </Link>
        <Link to={`/edit-assignment/${record._id}`}>
          <Button type="default" size="small">Edit</Button>
        </Link>
        <Button
  type="dashed"
  size="small"
  disabled={record.status === "live"}
  onClick={() => handleOpenLiveModal(record._id)}
>
  Make Live
</Button>
        <Button onClick={() => handleDelete(record._id)} type="primary" danger size="small">Delete</Button>
      </Space>
    ),
  },
];


  return (
    <div className="wrapper">
      <Topbar />
      {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
      <div className="content-page">
        <div className="content container pt-4">
          <h4 className="mb-3">Manage Assignments</h4>
          <Table
            columns={columns}
            dataSource={assignments}
            rowKey="_id"
            loading={loading}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      <Modal
  title="Make Assignment Live"
  visible={showLiveModal}
  onCancel={() => setShowLiveModal(false)}
  onOk={handleMakeLiveConfirm}
  okText="Make Live"
>
  <p>Please select a due date:</p>
  <DatePicker
    showTime
    value={dueDate}
    onChange={(date) => setDueDate(date)}
    disabledDate={(current) => current && current < dayjs().startOf('day')}
  />
</Modal>
    </div>
  );
};

export default ManageAssignments;
 