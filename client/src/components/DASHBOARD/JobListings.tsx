import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Table,
  Row,
  Col,
  message,
  Divider,
  Modal
} from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const JobsList = () => {
  const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [jobList, setJobList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/jobs`);
      setJobList(res.data.jobs);
    } catch (error) {
      message.error('Failed to fetch job posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${url}/jobs/categories/fetch`);
      setCategories(res.data.categories);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        deadline: values.deadline.toISOString(),
      };
      await axios.post(`${url}/jobs/create`, payload);
      message.success('Job posted successfully!');
      form.resetFields();
      fetchJobs();
    } catch (error) {
      message.error('Error posting job');
    }
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setEditModalVisible(true);
    editForm.setFieldsValue({
      ...job,
      deadline: moment(job.deadline),
      job_category: job.job_category._id,
    });
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this job?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`${url}/jobs/delete/${id}`);
          message.success('Job deleted successfully');
          fetchJobs();
        } catch (error) {
          message.error('Error deleting job');
        }
      }
    });
  };

  const handleEditSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        deadline: values.deadline.toISOString(),
      };
      await axios.put(`${url}/jobs/update/${currentJob._id}`, payload);
      message.success('Job updated successfully');
      setEditModalVisible(false);
      fetchJobs();
    } catch (error) {
      message.error('Error updating job');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Type', dataIndex: 'job_type', key: 'job_type' },
    { title: 'Organization', dataIndex: 'organization_name', key: 'organization_name' },
    {
      title: 'Category',
      dataIndex: ['job_category', 'name'],
      key: 'job_category',
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    }
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
                <h2>Post New Job</h2>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ job_type: 'Government', status: 'Active' }}
                >
                  <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="job_type" label="Job Type" rules={[{ required: true }]}>
                    <Select>
                      <Option value="Government">Government</Option>
                      <Option value="Private">Private</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="organization_name" label="Organization Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="job_category" label="Job Category" rules={[{ required: true }]}>
                    <Select showSearch>
                      {categories.map((cat) => (
                        <Option key={cat._id} value={cat._id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="qualifications_required" label="Qualifications">
                    <Select mode="tags" placeholder="E.g. B.Tech, 12th Pass" />
                  </Form.Item>

                  <Form.Item name="experience_required" label="Experience Required">
                    <Input />
                  </Form.Item>

                  <Form.Item name="application_link" label="Application Link">
                    <Input />
                  </Form.Item>

                  <Form.Item name="job_pdf_url" label="PDF Notification URL">
                    <Input />
                  </Form.Item>

                  <Form.Item name="deadline" label="Application Deadline" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item name="status" label="Status">
                    <Select>
                      <Option value="Active">Active</Option>
                      <Option value="Expired">Expired</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Submit Job
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              <Col xs={24} md={14}>
                <h2>All Job Posts</h2>
                <Divider />
                <Table
                  columns={columns}
                  dataSource={jobList}
                  rowKey="_id"
                  loading={loading}
                  scroll={{ x: '100%' }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* === Edit Job Modal === */}
      <Modal
        title="Edit Job Post"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => editForm.submit()}
        okText="Update"
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="job_type" label="Job Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Government">Government</Option>
              <Option value="Private">Private</Option>
            </Select>
          </Form.Item>

          <Form.Item name="organization_name" label="Organization Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="job_category" label="Job Category" rules={[{ required: true }]}>
            <Select showSearch>
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="qualifications_required" label="Qualifications">
            <Select mode="tags" />
          </Form.Item>

          <Form.Item name="experience_required" label="Experience Required">
            <Input />
          </Form.Item>

          <Form.Item name="application_link" label="Application Link">
            <Input />
          </Form.Item>

          <Form.Item name="job_pdf_url" label="PDF Notification URL">
            <Input />
          </Form.Item>

          <Form.Item name="deadline" label="Application Deadline" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Expired">Expired</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobsList;
