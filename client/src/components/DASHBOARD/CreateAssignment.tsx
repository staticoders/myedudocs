import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import url from "../../url";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Sidebar2 from './Sidebar2';

const CreateAssignment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    marks:"",
    passmarks:"",
    // dueDate: "",
    createdBy: "",
  });

  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("edudocs") || "{}");
    setLoginUser(user);
    if (user?.id) {
      setForm(prev => ({ ...prev, createdBy: user.id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.subject || !form.marks || !form.passmarks ) {
      return message.warning("Please fill in all required fields.");
    }

    try {
      const response = await axios.post(`${url}/assignmments/create`, form);
      message.success("Assignment created successfully!");
      setTimeout(() => {
        navigate(`/manage-assignments/${response.data.assignment._id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      message.error("Failed to create assignment.");
    }
  };

  return (
    <div className="wrapper">
      <Topbar />
      {"aname" in loginUser ? <Sidebar /> : <Sidebar2 />}
      <div className="content-page">
        <div className="content container pt-4">
          <h4 className="mb-3">Create Assignment</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Assignment Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="marks">Marks</label>
                <input
                  type="number"
                  name="marks"
                  className="form-control"
                  placeholder="Marks"
                  value={form.marks}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="passmarks">Pass Marks</label>
                <input
                  type="number"
                  name="passmarks"
                  className="form-control"
                  placeholder="Pass Marks"
                  value={form.passmarks}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="col-md-6">
                <label htmlFor="dueDate">Deadline</label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  className="form-control"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="col-12">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control"
                  placeholder="Assignment Description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Create Assignment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
