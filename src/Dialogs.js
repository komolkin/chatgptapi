import { useEffect, useState } from "react";
import axios from "axios";

import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";

import degen from "./degen.png";

const UserAddress = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>You</div>;
  return <div>{truncateEthAddress(address)}</div>;
};

function Dialogs() {
  const [dialogs, setDialogs] = useState([]);

  useEffect(() => {
    axios
      .get("/dialogs")
      .then((res) => {
        console.log(res);
        setDialogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {dialogs ? (
        <>
          {dialogs.map((dialog) => {
            return (
              <div className="grid justify-items-stretch">
                <div className="bg-[#2831E3] px-[16px] py-[12px] mb-4 text-white w-fit rounded-[16px] justify-self-end text-right">
                  <div className="text-xs opacity-[.6] mb-1">
                    <UserAddress />
                  </div>
                  {dialog.response}
                </div>
                <div className="flex">
                  <img
                    src={degen}
                    className="w-[72px] h-[72px] rounded-[16px] mr-2 border-solid border-[#000000f] border-2"
                  />
                  <div
                    className="bg-[#f7f7f7] hover:bg-[#f0f0f2] px-[16px] py-[12px] mb-4 text-black w-fit rounded-[16px] justify-self-start cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(`${dialog.message}`)
                    }
                  >
                    <div className="text-xs opacity-[.6] mb-1 text-grey-200 w-fit justify-self-start">
                      degen.eth
                    </div>
                    {dialog.message}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dialogs;
