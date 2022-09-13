import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
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
    console.log("saveOptions", autoDope);

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
    <div style={{ minWidth: 250 }}>
      <h2>TTL Enhance</h2>
      <div>
        <label style={{ fontSize: 16 }}>
          <input
            type="checkbox"
            checked={autoDope}
            onChange={(event) => setautoDope(event.target.checked)}
          />
          Use AutoDope
        </label>
      </div>
      <div style={{ marginTop: 10, marginBottom: 10 }}>{status}</div>
      <div style={{ textAlign: "right" }}>
        <button
          style={{
            cursor: "pointer",
            outline: 0,
            color: "#fff",
            backgroundColor: "#0d6efd",
            borderColor: "#0d6efd",
            display: "inline-block",
            fontWeight: 400,
            lineHeight: 1.5,
            textAlign: "center",
            border: "1px solid transparent",
            padding: "6px 12px",
            fontSize: 16,
            borderRadius: ".25rem",
          }}
          onClick={saveOptions}
        >
          Save
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
