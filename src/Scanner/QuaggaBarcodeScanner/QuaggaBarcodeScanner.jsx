import React, { useEffect, useState } from "react";
import db from "./firebase";
import io from "socket.io-client";

const socket = io("https://socket-io-server-weub.onrender.com");
socket.emit("username", "23423");

const QuaggaBarcodeScanner = () => {
  const [info, setInfo] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [deviceNames, setDeviceNames] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("devices").onSnapshot((snapshot) => {
      snapshot.forEach((element) => {
        var data = element.data();
        setInfo(data.devices);
      });
    });
    return unsubscribe;
  }, []);


  const onButtonClick = () => {
    // socket.emit("username", "23423");
    // Listen for updated device names
    socket.on("deviceNamesUpdated", (updatedDeviceNames) => {
      setDeviceNames(updatedDeviceNames);
    });
    console.log('device names from server',deviceNames);
    setTimeout(() => {
      setButtonClicked(true);
    }, [5000]);
    // return () => {
    //   socket.disconnect();
    // };
  };
  const Frame = ({ deviceName }) => {
    return (
      <center>
        <div className="div">
          <p>Device Name : {deviceName}</p>
        </div>
      </center>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <a href="bledevices://bleconnect?userId=23423&shareId=234sdf">
        <button
          onClick={() => {
            onButtonClick();
          }}
          style={{ marginTop: "30px" }}
        >
          Go to Mobile App
        </button>
      </a>
      {buttonClicked && (
        <div>
          <center>
            <h2>Device Details</h2>
          </center>
          {}
          {info.map((data, i) => (
            <Frame deviceName={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuaggaBarcodeScanner;
