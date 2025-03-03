import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Row, Col, Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ADMIN_CREDENTIALS = {
  username: "SHIVAM",
  password: "SHIVAM123",
};

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    try {
      const response = await axios.post("http://localhost:5000/submit-form", {
        name,
        age,
        phone,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage("Error submitting data");
      setShowError(true);
    }
  };

  const handleAdminLogin = () => {
    if (
      adminUsername === ADMIN_CREDENTIALS.username &&
      adminPassword === ADMIN_CREDENTIALS.password
    ) {
      setAdminLoggedIn(true);
      setShowAdminModal(false);
      setAdminUsername("");
      setAdminPassword("");
      setShowForm(true);
      alert("Logged in successfully! Click on Fetch Data to get the data.");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleFetchData = async () => {
    if (!adminLoggedIn) {
      setShowAdminModal(true);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get-data");
      setFetchedData(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setPhone("");
    setResponseMessage("");
    setFetchedData([]);
  };

  return (
    <div style={{ backgroundColor: "lightblue", minHeight: "100vh", padding: "20px" }}>
      <Container
        className="mt-3 p-4"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h1 className="text-center mb-4">Form Submission</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone no"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAge" className="mt-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="d-flex justify-content-center mt-3">
            <Col xs="auto">
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
            <Col xs="auto">
              <Button variant="danger" type="button" onClick={handleClear}>Clear</Button>
            </Col>
          </Row>
        </Form>

        {responseMessage && (
          <Alert variant={showError ? "danger" : "success"} className="mt-3">
            {responseMessage}
          </Alert>
        )}

        <div className="text-center mt-4">
          <Button variant="success" onClick={handleFetchData}>Fetch Data</Button>
        </div>
      </Container>

      {fetchedData.length > 0 && (
        <Container className="mt-4">
          <Row>
            {fetchedData.map((item) => (
              <Col key={item.id} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Age:</strong> {item.age} <br />
                      <strong>Phone:</strong> {item.phone}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="adminUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Admin Username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="adminPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" onClick={handleAdminLogin}>Login</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
