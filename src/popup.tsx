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

    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   const tab = tabs[0];
    //   if (tab.id) {
    //     chrome.tabs.sendMessage(
    //       tab.id,
    //       {
    //         autoDope,
    //       },
    //       (msg) => {
    //         console.log("result message:", msg);
    //       }
    //     );
    //   }
    // });
  };

  // const [currentURL, setCurrentURL] = useState<string>();

  // useEffect(() => {
  //   chrome.action.setBadgeText({ text: count.toString() });
  // }, [count]);

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     setCurrentURL(tabs[0].url);
  //   });
  // }, []);

  // const changeBackground = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     const tab = tabs[0];
  //     if (tab.id) {
  //       chrome.tabs.sendMessage(
  //         tab.id,
  //         {
  //           autoDope,
  //         },
  //         (msg) => {
  //           console.log("result message:", msg);
  //         }
  //       );
  //     }
  //   });
  // };

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     const tab = tabs[0];
  //     if (tab.id) {
  //       chrome.tabs.sendMessage(
  //         tab.id,
  //         {
  //           autoDope,
  //         },
  //         (msg) => {
  //           console.log("result message:", msg);
  //         }
  //       );
  //     }
  //   });
  // }, [autoDope])

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
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
