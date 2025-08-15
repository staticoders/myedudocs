import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  message as antdMessage,
  Space,
  Card,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const BookCateGoriesManager = () => {
  const [loginUser, setLoginuser] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs'))
      : null;
    if (user) setLoginuser(user);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${url}/books/categories`);
      setCategories(res.data.categories);
    } catch (err) {
      antdMessage.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${url}/books/categories/${editingId}`, { name: values.name });
        antdMessage.success('Category updated successfully');
      } else {
        await axios.post(`${url}/books/categories/create`, { name: values.name });
        antdMessage.success('Category created successfully');
      }
      form.resetFields();
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      antdMessage.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`${url}/books/categories/${id}`);
      antdMessage.success('Category deleted');
      fetchCategories();
    } catch (err) {
      antdMessage.error('Failed to delete category');
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    form.setFieldsValue({ name: category.name });
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.resetFields();
  };

  const columns = [
    {
      title: '#',
      render: (_, __, index) => index + 1,
      width: '5%',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => startEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
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
          <Card
            title="Manage Book Categories"
            bordered
            style={{ maxWidth: '800px', margin: 'auto' }}
          >
            <Form
              form={form}
              layout="inline"
              onFinish={handleSubmit}
              style={{ marginBottom: 20 }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Category name is required' }]}
              >
                <Input placeholder="Enter category name" style={{ width: 250 }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={editingId ? <EditOutlined /> : <PlusOutlined />}
                  loading={loading}
                >
                  {editingId ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
              {editingId && (
                <Form.Item>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              )}
            </Form>

            <Table
              columns={columns}
              dataSource={categories}
              rowKey="_id"
              bordered
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookCateGoriesManager;
