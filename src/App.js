import React, { useState } from "react";
import Dialogs from "./Dialogs";
import "inter-ui/inter.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
// import axios from "axios";

import { WagmiConfig, createClient } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { ConnectKitButton } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "ConnectKit CRA demo",
    //infuraId: process.env.REACT_APP_INFURA_ID,
    //alchemyId:  process.env.REACT_APP_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum],
  })
);

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

  const initialText = "Ask";
  const [buttonText, setButtonText] = useState(initialText);

  const refreshPage = (event) => {
    event.currentTarget.classList.toggle("disabled");

    setButtonText("Asking...");

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
    <React.StrictMode>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="soft">
          <div className="sticky top-0 flex justify-between items-center h-24 max-w-[1728px] mx-auto px-4">
            <h1 className="w-full font-bold text-2xl">GM, Degen</h1>
            <div>
              <ConnectKitButton />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <div style={{ width: "400px" }}>
              <h1 className="font-bold text-center mb-8">
                Ask Product Designer Anything
              </h1>
              <div>
                <Dialogs />
              </div>

              <Form onSubmit={handleSubmit} className="input-group mb-3">
                <Form.Control
                  name="message"
                  placeholder="Your question..."
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
        </ConnectKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
}

export default App;
