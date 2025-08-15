import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Upload, Button, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import url from "../../url";

const { Title, Paragraph } = Typography;

const UploadAssignment = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [assignment, setAssignment] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("edudocs") || "{}");
    setLoginUser(user);

    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`${url}/assignmments/${assignmentId}`);
        setAssignment(res.data.assignment);
      } catch (err) {
        console.error(err);
        message.error("Failed to load assignment");
      }
    };

    if (assignmentId) fetchAssignment();
  }, [assignmentId]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return message.warning("Please select at least one file.");
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("fileUrl", file.originFileObj);
    });

    setUploading(true);
    try {
      await axios.post(`${url}/assignmments/upload/${assignmentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Files uploaded successfully!");
      setFileList([]);
    //   navigate("/manage-assignments");
    } catch (err) {
      console.error(err);
      message.error("File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="wrapper">
      <Topbar />
      {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
      <div className="content-page">
        <div className="content container py-4">
          <Title level={4}>Upload Assignment Files</Title>

          {assignment ? (
            <>
              <Card className="mb-4">
                <Title level={5}>{assignment.title}</Title>
                <Paragraph>
                  <strong>Subject:</strong> {assignment.subject}
                </Paragraph>
                <Paragraph>
                  <strong>Due Date:</strong>{" "}
                  {new Date(assignment.dueDate).toLocaleString()}
                </Paragraph>
                <Paragraph>
                  <strong>Description:</strong>{" "}
                  {assignment.description || "—"}
                </Paragraph>
              </Card>

              <Upload
                multiple
                beforeUpload={() => false} // Prevent auto-upload
                onChange={({ fileList }) => setFileList(fileList)}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </Upload>

              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0 || uploading}
                loading={uploading}
                className="mt-3"
              >
                {uploading ? "Uploading..." : "Upload Files"}
              </Button>
            </>
          ) : (
            <p>Loading assignment details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
