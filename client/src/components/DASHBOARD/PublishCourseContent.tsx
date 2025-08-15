import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import Topbar from "./Topbar";
import url from "../../url";

const { TextArea } = Input;

const PublishCourseContent = () => {
  const [loginUser, setLoginuser] = useState<{ name?: string; tname?: string; aname?: string }>({});
  const [form] = Form.useForm();

  useEffect(() => {
    const user = localStorage.getItem("edudocs")
      ? JSON.parse(localStorage.getItem("edudocs") as string)
      : null;
    if (user) {
      setLoginuser(user);
    }
  }, []);

  const onFinish = async (values: any) => {
    try {
      await axios.post(`${url}/course/createCourseContent`, {
        ...values,
        author: loginUser?.tname || "Anonymous",
      });

      message.success("Content Published Successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error(error);
      message.error("Error publishing content.");
    }
  };

  const link = loginUser?.aname ? <Sidebar /> : <Sidebar2 />;

  return (
    <div className="wrapper">
      <Topbar />
      {link || <Sidebar />}
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-between">
              <div className="col-10">
                <h4 className="page-title">Dashboard / Publish Course Content</h4>
              </div>
              <div className="col-2 text-end">
                <a href="/manage-courses-content" className="btn btn-outline-warning mt-3">
                  Manage Content
                </a>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <Card title="Add Course Content" bordered={false} className="shadow-sm">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ content_subject: "", content_category: "", content: "" }}
                  >
                    <Form.Item
                      name="content_subject"
                      label="Content Subject"
                      rules={[{ required: true, message: "Please enter content subject" }]}
                    >
                      <Input placeholder="e.g., React Basics, Python Loops" />
                    </Form.Item>

                    <Form.Item
                      name="content_category"
                      label="Content Category"
                      rules={[{ required: true, message: "Please enter content category" }]}
                    >
                      <Input placeholder="e.g., Frontend, Backend, Data Science" />
                    </Form.Item>

                    <Form.Item
                      name="content"
                      label="Main Content"
                      rules={[{ required: true, message: "Please enter the main content" }]}
                    >
                      <TextArea rows={6} placeholder="Type course content here..." />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="bg_btn">
                        Publish Now
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-secondary text-light pt-4">
          <div className="container text-center text-md-start p-3">
            <div className="row">
              <div className="col-md-4">
                <h5 className="fw-bold text-light">About Us</h5>
                <p className="small">We provide high-quality services and ensure customer satisfaction with innovative solutions.</p>
              </div>
              <div className="col-md-4 text-center">
                <h5 className="fw-bold text-light">Quick Links</h5>
                <div className="d-flex justify-content-center gap-3">
                  <a href="/" className="text-decoration-none text-light">Home</a>
                  <a href="/about" className="text-decoration-none text-light">About</a>
                  <a href="/services" className="text-decoration-none text-light">Services</a>
                  <a href="/contact" className="text-decoration-none text-light">Contact</a>
                </div>
              </div>
              <div className="col-md-4 text-center text-md-end">
                <h5 className="fw-bold text-light">Follow Us</h5>
                <a href="#" className="bg-primary btn btn-outline-light btn-sm me-2"><i className="bi bi-facebook" /></a>
                <a href="#" className="btn btn-outline-light btn-sm me-2"><i className="bi bi-twitter" /></a>
                <a href="#" className="bg-danger btn btn-outline-light btn-sm me-2"><i className="bi bi-instagram" /></a>
                <a href="#" className="bg-primary btn btn-outline-light btn-sm"><i className="bi bi-linkedin" /></a>
              </div>
            </div>
            <hr className="my-3 text-secondary" />
            <div className="text-center pb-3 small">
              <b> &copy; 2025 MyEdudocs. All Rights Reserved.</b>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublishCourseContent;
