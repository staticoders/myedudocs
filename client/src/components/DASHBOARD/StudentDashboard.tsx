import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Bell, BookOpen, MessageSquare, User, Calendar, FileText, Settings, List } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import './dashboard.css'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 40 },
  { name: "Week 3", progress: 60 },
  { name: "Week 4", progress: 80 },
];

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState([
    "📢 Assignment due on Friday",
    "📩 New message from Instructor",
    "📝 Upcoming Quiz on Monday",
  ]);
  const [menuOpen, setMenuOpen] = useState(false);


  const Navigate = useNavigate();


  // Get user from local storage
  const [loginUser, setLoginuser] = useState({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])



  // Logout

  const logoutHandler = () => {
    localStorage.removeItem('edudocs')
    message.success("Logged out successfully", 7)
    Navigate('/student-login')
  }

  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in ! First Log in to your account", 7)
      Navigate('/student-login')
    }
  }, [Navigate])

  

  return (
    <div className="min-vh-100 studentDashboardHome text-light">
      <Navbar expand="md" className="px-3 bg-white text-dark shadow-lg">
        <Navbar.Brand className="fw-bold fs-3 text-primary">🎓 Student Dashboard</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="light" className="me-2 rounded-circle shadow">
              {/* <Bell size={20} /> */}
              Welcome <b>{loginUser.name}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="bg-white text-dark shadow">
              
                {/* <Dropdown.Item className="py-2">Logout</Dropdown.Item> */}
                <a href="#" onClick={logoutHandler}>Logout</a>
            
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" className="d-md-none rounded-circle shadow" onClick={() => setMenuOpen(!menuOpen)}>
            <List size={20} />
          </Button>
        </Nav>
      </Navbar>

      {menuOpen && (
        <Container className="mt-3 d-md-none">
          <Row className="gy-3">
            {[{ icon: <BookOpen />, label: "My Courses" }, { icon: <MessageSquare />, label: "Discussions" }, { icon: <Calendar />, label: "Schedule" }, { icon: <FileText />, label: "Assignments" }, { icon: <User />, label: "Profile" }, { icon: <Settings />, label: "Settings" }].map((action, index) => (
              <Col xs={6} key={index}>
                <Button variant="outline-primary" className="w-100 py-2 d-flex flex-column align-items-center shadow">
                  {action.icon}
                  <small>{action.label}</small>
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <Container className="mt-4 d-none d-md-block">
        <Row className="gy-3">
          {[{ icon: <BookOpen />, label: "My Courses" }, { icon: <MessageSquare />, label: "Discussions" }, { icon: <Calendar />, label: "Schedule" }, { icon: <FileText />, label: "Assignments" }, { icon: <User />, label: "Profile" }, { icon: <Settings />, label: "Settings" }].map((action, index) => (
            <Col md={2} key={index}>
              <Button variant="outline-light" className="w-100 py-3 d-flex flex-column align-items-center rounded-lg shadow-lg bg-opacity-25">
                {action.icon}
                <small>{action.label}</small>
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-5">
        <Row className="gy-4">
          <Col md={4}>
            <Card className="shadow-lg border-0 bg-light text-dark card-student">
              <Card.Body className="d-flex align-items-center">
                <div>
                  <Card.Title className="fw-bold">🎓 <b>{loginUser.name}</b></Card.Title>
                  <Card.Text>🕒 Student Since</Card.Text>
                  <Card.Text>📚 Enrolled in 5 Courses</Card.Text>
                  <Card.Text>📝 5 Asignment Asigned</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg border-0 bg-light text-dark card-student">
              <Card.Body>
                <Card.Title className="fw-bold">📈 Course Progress</Card.Title>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={progressData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#007bff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-lg border-0 bg-light text-dark card-student">
              <Card.Body>
                <Card.Title className="fw-bold">🔔 Notifications</Card.Title>
                <ul className="list-unstyled">
                  {notifications.map((note, index) => (
                    <li key={index} className="mb-2">{note}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="container mt-5 d-flex justify-content-center">
        <div className="row">
          <h2 className="text-light d-flex justify-content-center">Your Ongoing Course (Choose a Progeam)</h2>
          <div className="col-md-3 bg-light p-4 onging-course m-4">
            <h4>C++</h4>
            <span className="text-dark">Course Progress</span>
            <div className="progress">

              <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
            </div>
          </div>
          <div className="col-md-3 bg-light p-4 onging-course m-4">
            <h4>C++</h4>
            <span className="text-dark">Course Progress</span>
            <div className="progress">

              <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
            </div>
          </div>
          <div className="col-md-3 bg-light p-4 onging-course m-4">
            <h4>C++</h4>
            <span className="text-dark">Course Progress</span>
            <div className="progress">

              <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
            </div>

          </div>

        </div>
      </div>
      <footer className="bg-secondary text-light pt-4">
        <div className="container text-center text-md-start p-3">
          <div className="row">
            {/* About Section */}
            <div className="col-md-4">
              <h5 className="fw-bold text-light">About Us</h5>
              <p className="small">We provide high-quality services and ensure customer satisfaction with innovative solutions.</p>
            </div>
            {/* Quick Links in a Single Line */}
            <div className="col-md-4 text-center">
              <h5 className="fw-bold text-light">Quick Links</h5>
              <div className="d-flex justify-content-center gap-3">
                <a href="/" className="text-decoration-none text-light">Home</a>
                <a href="/about" className="text-decoration-none text-light">About</a>
                <a href="/services" className="text-decoration-none text-light">Services</a>
                <a href="/contact" className="text-decoration-none text-light">Contact</a>
              </div>
            </div>
            {/* Social Media */}
            <div className="col-md-4 text-center text-md-end">
              <h5 className="fw-bold text-light">Follow Us</h5>
              <a href="#" className="bg-primary btn btn-outline-light btn-sm me-2"><i className="bi bi-facebook" /></a>
              <a href="#" className="btn btn-outline-light btn-sm me-2"><i className="bi bi-twitter" /></a>
              <a href="#" className="bg-danger btn btn-outline-light btn-sm me-2"><i className="bi bi-instagram" /></a>
              <a href="#" className="bg-primary btn btn-outline-light btn-sm"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
          <hr className="my-3 text-secondary" />
          {/* Copyright */}
          <div className="text-center pb-3 small">
            <b> &copy; 2025 MyEdudocs. All Rights Reserved.</b>
          </div>
        </div>
      </footer>
    </div>

  );
}
