import { useEffect, useState } from 'react';
import {
  Table,
  Form,
  Input,
  Button,
  Space,
  Modal,
  Popconfirm,
  message,
  Tag,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const { TextArea } = Input;

const JobCategories = () => {
  const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/jobs/categories`);
      setCategories(res.data.categories);
    } catch (err) {
      message.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category = null) => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        subcategories: category.subcategories?.join(', '),
      });
    } else {
      form.resetFields();
    }
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    const payload = {
      name: values.name,
      subcategories: values.subcategories?.split(',').map((s) => s.trim()),
    };

    try {
      if (editingCategory) {
        await axios.put(`${url}/jobs/categories/${editingCategory._id}`, payload);
        message.success('Category updated');
      } else {
        await axios.post(`${url}/jobs/categories`, payload);
        message.success('Category created');
      }
      fetchCategories();
      handleCancel();
    } catch (err) {
      message.error('Operation failed: ' + err.response?.data?.message);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${url}/jobs/categories/${id}`);
      message.success('Category deleted');
      fetchCategories();
    } catch {
      message.error('Failed to delete');
    }
  };

  const columns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Subcategories',
      dataIndex: 'subcategories',
      key: 'subcategories',
      render: (subs) =>
        subs?.length > 0
          ? subs.map((sub, idx) => <Tag key={idx}>{sub}</Tag>)
          : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openModal(record)} type="link">Edit</Button>
          <Popconfirm title="Are you sure to delete this category?" onConfirm={() => onDelete(record._id)} okText="Yes" cancelText="No">
            <Button type="link" danger>Delete</Button>
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
            <h2>Manage Job Categories</h2>

            <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 20 }}>
              Add New Category
            </Button>

            <Table
              dataSource={categories}
              columns={columns}
              rowKey="_id"
              loading={loading}
            />

            <Modal
              title={editingCategory ? 'Edit Category' : 'Add Category'}
              open={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              destroyOnClose
            >
              <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  name="name"
                  label="Category Name"
                  rules={[{ required: true, message: 'Please enter a category name' }]}
                >
                  <Input placeholder="e.g. Government Jobs" />
                </Form.Item>

                <Form.Item
                  name="subcategories"
                  label="Subcategories (comma-separated)"
                >
                  <Input placeholder="e.g. Clerk, Engineering, Teaching" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      {editingCategory ? 'Update' : 'Add'}
                    </Button>
                    <Button onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
