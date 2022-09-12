import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [autoDope, setautoDope] = useState(false);
  const [status, setStatus] = useState("");



  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        autoDope: false,
      },
      (items) => {
        setautoDope(items.autoDope);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        autoDope,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={autoDope}
            onChange={(event) => setautoDope(event.target.checked)}
          />
          Use AutoDope
        </label>
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
