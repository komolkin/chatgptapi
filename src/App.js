import React, { useState } from "react";
import Dialogs from "./Dialogs";
import "inter-ui/inter.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function App() {
  const [message, setMessage] = useState({
    message: "",
  });
  const [response] = useState("");
  // const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handleSubmit = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:3001/", message)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // fetch("http://localhost:3001/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ message }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setResponse(data.message));
  };

  return (
    <div style={{ width: "400px", margin: "auto auto", marginTop: "8rem" }}>
      <div className="response">
        {response && (
          <div>
            <div className="card" style={{ marginBottom: "0.5rem" }}>
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

      <div>
        <Dialogs />
      </div>

      <Form onSubmit={handleSubmit} className="input-group mb-3">
        <Form.Control
          name="message"
          value={message.message}
          placeholder="Ask Kevin Durant any question"
          onChange={handleChange}
          // onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="dark" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default App;
