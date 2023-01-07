import React, { useState } from "react";
import Dialogs from "./Dialogs";
import "inter-ui/inter.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
// import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setMessage((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     };
  //   });
  // };

  // onChange={(e) => setMessage(e.target.value)}

  const initialText = "Send";
  const [buttonText, setButtonText] = useState(initialText);

  const refreshPage = (event) => {
    event.currentTarget.classList.toggle("disabled");

    setButtonText("Sending...");

    setTimeout(function () {
      window.parent.location = window.parent.location.href;
    }, 3000);
  };

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "400px" }}>
        <h1 className="font-bold text-center mb-8">Product Designer</h1>
        <div>
          <Dialogs />
        </div>

        <Form onSubmit={handleSubmit} className="input-group mb-3">
          <Form.Control
            name="message"
            placeholder="Ask Product Designer anything..."
            // value={message.message}
            value={message}
            // onChange={handleChange}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="dark" type="submit" onClick={refreshPage}>
            {buttonText}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
