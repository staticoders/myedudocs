import { useEffect, useState } from 'react';
import {
  Form, Input, Button, Upload, Table, Select, Switch, message, Row, Col, Modal
} from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';
import url from '../../url';

const { confirm } = Modal;

const AddBooks = () => {
  const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});
  useEffect(() => {
    const user = localStorage.getItem('edudocs')
      ? JSON.parse(localStorage.getItem('edudocs') as string)
      : null;
    if (user) setLoginuser(user);
  }, []);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get(`${url}/books/all`);
    setBooks(res.data.books);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${url}/books/categories`);
    setCategories(res.data.categories);
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'coverImage' && key !== 'pdf') {
        formData.append(key, values[key]);
      }
    });
    formData.append('coverImage', values.coverImage?.file.originFileObj);
    formData.append('pdf', values.pdf?.file.originFileObj);

    await axios.post(`${url}/books/create`, formData);
    message.success('Book created');
    fetchBooks();
    form.resetFields();
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this book?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id)
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${url}/books/${id}`);
    message.success('Deleted');
    fetchBooks();
  };

  const showEditModal = (book) => {
    setSelectedBook(book);
    editForm.setFieldsValue({
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category?._id,
      price: book.price,
      isFeatured: book.isFeatured,
      isPopular: book.isPopular
    });
    setEditModalVisible(true);
  };

  const handleEdit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'coverImage' && key !== 'pdf') {
        formData.append(key, values[key]);
      }
    });
    if (values.coverImage) formData.append('coverImage', values.coverImage.file.originFileObj);
    if (values.pdf) formData.append('pdf', values.pdf.file.originFileObj);

    await axios.put(`${url}/books/${selectedBook._id}`, formData);
    message.success('Book updated');
    setEditModalVisible(false);
    fetchBooks();
  };

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Author', dataIndex: 'author' },
    { title: 'Category', dataIndex: ['category', 'name'] },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Featured', dataIndex: 'isFeatured', render: (val) => val ? 'Yes' : 'No' },
    { title: 'Popular', dataIndex: 'isPopular', render: (val) => val ? 'Yes' : 'No' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteConfirm(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="wrapper">
      <Topbar />
      {'aname' in loginUser ? <Sidebar /> : <Sidebar2 />}

      <div className="content-page">
        <div className="container py-5">
          <div className="container mt-5">
            <Row gutter={24}>
              <Col span={10}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item name="title" label="Book Title" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select>
                      {categories.map((cat) => (
                        <Select.Option key={cat._id} value={cat._id}>{cat.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="price" label="Price (₹)">
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item name="isFeatured" label="Featured" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item name="isPopular" label="Popular" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item name="coverImage" label="Cover Image" rules={[{ required: true }]}>
                    <Upload beforeUpload={() => false} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload Cover</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item name="pdf" label="PDF File" rules={[{ required: true }]}>
                    <Upload beforeUpload={() => false} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload PDF</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Add Book
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              <Col span={14}>
                <h3>All Books</h3>
                <Table rowKey="_id" columns={columns} dataSource={books} />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Book"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEdit}>
          <Form.Item name="title" label="Book Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price (₹)">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="isFeatured" label="Featured" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="isPopular" label="Popular" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="coverImage" label="Cover Image">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Cover</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="pdf" label="PDF File">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Book
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBooks;
