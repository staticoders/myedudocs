import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Space,
  Typography,
  message,
  List,
  Popconfirm,
  Row,
  Col,
  Table,
  Divider,
} from "antd";
import Sidebar from './Sidebar';
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import url from "../../url";
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
const { Title } = Typography;

const LiveSessionManager = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
 const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});


  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);


  // Fetch live sessions from backend
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${url}/live-sessions`);
      setLiveSessions(resp.data);
    } catch (error) {
      message.error("Failed to load live sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Submit handler: same as your onFinish function (create/update)
  const onFinish = async (values: any) => {
    const payload = {
      topic: values.topic,
      startTime: values.startTime.toISOString(),
      duration: values.duration,
      description: values.description,
      createdBy: values.createdBy || "admin",
    };

    try {
      if (selectedSessionId) {
        await axios.put(`${url}/live-sessions/${selectedSessionId}`, payload);
        message.success("Live session updated successfully!");
      } else {
        await axios.post(`${url}/live-sessions`, payload);
        message.success("Live session created successfully!");
      }
      form.resetFields();
      setSelectedSessionId(null);
      fetchSessions();
    } catch (error) {
      message.error("Failed to save live session");
    }
  };

  // Prepare form for editing selected session
  const onEdit = (session: any) => {
    form.setFieldsValue({
      topic: session.topic,
      startTime: moment(session.startTime),
      duration: session.duration,
      description: session.description,
      createdBy: session.createdBy,
    });
    setSelectedSessionId(session._id);
  };

  // Delete a live session
  const onDelete = async (id: string) => {
    try {
      await axios.delete(`${url}/live-sessions/${id}`);
      message.success("Live session deleted successfully!");
      if (selectedSessionId === id) {
        form.resetFields();
        setSelectedSessionId(null);
      }
      fetchSessions();
    } catch {
      message.error("Failed to delete live session");
    }
  };

  const columns = [
    {
      title: "Session Title",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Duration (mins)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this session?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
  
      <div className="wrapper">
      <Topbar />
      {'aname' in loginUser ? <Sidebar /> : <Sidebar2 />}
      <div className="content-page">
        <div className="container py-5">
          <div style={{ padding: '24px' }}>
            <Row gutter={24}>
        <Col xs={24} md={10}>
          <Title level={3}>
            {selectedSessionId ? "Edit Live Session" : "Add Live Session"}
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            initialValues={{ createdBy: JSON.parse(localStorage.getItem("edudocs") || "{}").id }}
          >
            <Form.Item
              name="topic"
              label="Session Title"
              rules={[{ required: true, message: "Please enter the session title" }]}
            >
              <Input placeholder="Enter session title" />
            </Form.Item>

            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[{ required: true, message: "Please select start date and time" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
                disabledDate={(current) => current && current < moment().startOf("day")}
              />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Duration (minutes)"
              rules={[{ required: true, message: "Please enter session duration" }]}
            >
              <InputNumber min={1} max={180} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="description" label="Description (optional)">
              <Input.TextArea rows={4} placeholder="Add session description" />
            </Form.Item>

            <Form.Item name="createdBy" hidden>
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                  {selectedSessionId ? "Update Session" : "Create Session"}
                </Button>
                {selectedSessionId && (
                  <Button
                    onClick={() => {
                      form.resetFields();
                      setSelectedSessionId(null);
                    }}
                    block
                  >
                    Cancel
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={14}>
          <Title level={3}>Manage Live Sessions</Title>
          <Divider />
          <Table
            columns={columns}
            dataSource={liveSessions}
            rowKey="_id"
            loading={loading}
            scroll={{ x: "100%" }}
          />
        </Col>
      </Row>
          </div>
        </div>
      </div>



    </div>
  );
};

export default LiveSessionManager;
