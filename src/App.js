// create a react component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and that message in a box below

import React, { useState } from "react";
import "inter-ui/inter.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div style={{ width: "400px", margin: "auto auto" }}>
      <div className="response">
        {response && (
          <div style={{ marginTop: "8rem" }}>
            <div className="card" style={{ marginBottom: "1rem" }}>
              <div className="card-body">
                <b>Me:</b> {message}
              </div>
            </div>
            <div className="card" style={{ marginBottom: "1rem" }}>
              <div className="card-body">
                <b>KD:</b> {response}
              </div>
            </div>
          </div>
        )}
      </div>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexFlow: "row" }}
      >
        <Form.Control
          value={message}
          placeholder="Ask Kevin Durant any question"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="dark" type="submit" style={{ marginLeft: "10px" }}>
          Send
        </Button>
      </Form>
    </div>
  );
}

export default App;
