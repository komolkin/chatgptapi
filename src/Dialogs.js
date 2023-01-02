import { useEffect, useState } from "react";
import axios from "axios";

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
              <div>
                <div className="card" style={{ marginBottom: "0.5rem" }}>
                  <div className="card-body">
                    <b>Me:</b> {dialog.message}
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
