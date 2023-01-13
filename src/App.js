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
    appName: "GMDEGEN",
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

    setButtonText("Thinking...");

    setTimeout(function () {
      window.parent.location = window.parent.location.href;
    }, 6000);
  };

  function handleSubmit(e) {
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
  }

  return (
    <React.StrictMode>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme="soft"
          options={{
            showAvatar: false,
          }}
        >
          <div className="fixed top-0 flex justify-between items-center h-[92px] w-full px-4">
            <h1 className="font-sans font-medium text-2xl">gm, degen</h1>
            <div>
              <ConnectKitButton />
            </div>
          </div>
          {/* items-center justify-center  */}
          <div className="flex h-full items-center justify-center">
            <div className="w-[600px] h-full">
              <div className="w-[600px] my-[100px]">
                <Dialogs />
              </div>

              <Form
                onSubmit={handleSubmit}
                className="fixed bottom-0 flex w-[600px] py-[32px] bg-[#ffffff]"
              >
                <Form.Control
                  id="field1"
                  name="message"
                  placeholder="Your question..."
                  // value={message.message}
                  value={message}
                  // onChange={handleChange}
                  onChange={(e) => setMessage(e.target.value)}
                  className="shrink !rounded-[16px] !px-[16px] !py-[12px]"
                  autocomplete="off"
                />
                <Button
                  variant="dark"
                  type="submit"
                  onClick={refreshPage}
                  className="!px-[16px] !py-[12px] ml-2 !rounded-[16px]"
                >
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
