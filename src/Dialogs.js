import { useEffect, useState } from "react";
import axios from "axios";

import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";

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
                <div className="text-xs px-[16px] mb-2 text-grey-200 w-fit rounded-[16px] justify-self-end">
                  <UserAddress />
                </div>
                <div className="bg-[#2831E3] hover:bg-black px-[16px] py-[12px] mb-4 text-white w-fit rounded-[16px] justify-self-end">
                  {dialog.response}
                </div>
                <div className="text-xs px-[16px] mb-2 text-grey-200 w-fit rounded-[16px] justify-self-start">
                  Degen
                </div>
                <div
                  className="bg-white hover:bg-black px-[16px] py-[12px] mb-4 text-black w-fit rounded-[16px] justify-self-start"
                  onClick={() =>
                    navigator.clipboard.writeText(`${dialog.message}`)
                  }
                >
                  {dialog.message}
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
