import React, { useEffect, useState } from "react";
import db from "./firebase";

const QuaggaBarcodeScanner = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("devices").onSnapshot((snapshot) => {
      snapshot.forEach((element) => {
        var data = element.data();
        setInfo(data.devices);
      });
    });
    return unsubscribe;
  }, []);
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
        <button>URL Scheme</button>
      </a>
      <div>
        <center>
          <h2>Device Details</h2>
        </center>

        {info.map((data,i) => (
          <Frame deviceName={data} />
        ))}
      </div>
    </div>
  );
};

export default QuaggaBarcodeScanner;
