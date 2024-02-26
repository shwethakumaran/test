import React, { useEffect, useState } from "react";
import db from "./firebase";

const QuaggaBarcodeScanner = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("yourCollection")
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInfo(newData);
      });
    return unsubscribe;
  }, []);
  const Frame = ({ id }) => {
    return (
      <center>
        <div className="div">
          <p>Device id : {id}</p>
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

        {info.map((data) => (
          <Frame course={data.CourseEnrolled} id={data.id} />
        ))}
      </div>
    </div>
  );
};

export default QuaggaBarcodeScanner;
