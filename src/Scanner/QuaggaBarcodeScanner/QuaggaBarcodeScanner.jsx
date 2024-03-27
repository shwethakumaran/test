// import React, { useEffect, useState } from "react";
// import db from "./firebase";
// import io from "socket.io-client";

// const QuaggaBarcodeScanner = () => {
//   const [info, setInfo] = useState([]);
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [deviceNames, setDeviceNames] = useState([]);
//   const [socketCreated, setSocketCreated] = useState();
//   useEffect(() => {
//     const unsubscribe = db.collection("devices").onSnapshot((snapshot) => {
//       snapshot.forEach((element) => {
//         var data = element.data();
//         setInfo(data.devices);
//       });
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const socket = io("https://socket-io-server-weub.onrender.com");
//     setSocketCreated(socket);
//     socket.emit("username", "23423");
//   }, []);

//   useEffect(() => {
//     if (socketCreated) {
//       socketCreated.on("deviceNamesUpdated", (updatedDeviceNames) => {
//         setDeviceNames(updatedDeviceNames);
//       });
//       console.log("device names from server", deviceNames);
//     }
//   }, [socketCreated]);

//   const onButtonClick = () => {
//     // socket.emit("username", "23423");
//     // Listen for updated device names
//     // socket.on("deviceNamesUpdated", (updatedDeviceNames) => {
//     //   setDeviceNames(updatedDeviceNames);
//     // });
//     // console.log("device names from server", deviceNames);
//     setTimeout(() => {
//       setButtonClicked(true);
//     }, [5000]);
//     // return () => {
//     //   socket.disconnect();
//     // };
//   };
//   const Frame = ({ deviceName }) => {
//     return (
//       <center>
//         <div className="div">
//           <p>Device Name : {deviceName}</p>
//         </div>
//       </center>
//     );
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <a href="bledevices://bleconnect?userId=23423&shareId=234sdf">
//         <button
//           onClick={() => {
//             onButtonClick();
//           }}
//           style={{ marginTop: "30px" }}
//         >
//           Go to Mobile App
//         </button>
//       </a>
//       {buttonClicked && (
//         <div>
//           <center>
//             <h2>Device Details</h2>
//           </center>
//           {}
//           {info.map((data, i) => (
//             <Frame deviceName={data} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuaggaBarcodeScanner;
import React, { useEffect, useState } from "react";
import db from "./firebase";
import io from "socket.io-client";
 
const socket = io("https://socket-io-server-weub.onrender.com");
socket.emit("username", "23423");
 
const QuaggaBarcodeScanner = () => {
  const [info, setInfo] = useState([]);
  const [deviceNames, setDeviceNames] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
 
  useEffect(() => {
    const unsubscribeDb = db.collection("devices").onSnapshot((snapshot) => {
      snapshot.forEach((element) => {
        var data = element.data();
        setInfo(data.devices);
      });
    });
 
    // Listen for socket connection and update state
    socket.on("connect", () => {
      setIsSocketConnected(true);
      console.log("Connected to Socket.IO server");
    });
 
    // Listen for updated device names
    socket.on("deviceNamesUpdated", (updatedDeviceNames) => {
      setDeviceNames(updatedDeviceNames);
      console.log("Received updated device names:", updatedDeviceNames);
    });
 
    // Cleanup function to unsubscribe from DB and disconnect socket
    return () => {
      unsubscribeDb();
      socket.disconnect();
    };
  }, []);
 
  const onButtonClick = () => {
    // Handle button click logic (optional)
    setButtonClicked(true); // Assuming you still have button logic
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
        <button onClick={onButtonClick} style={{ marginTop: "30px" }}>
          Go to Mobile App
        </button>
      </a>
      {isSocketConnected && ( // Only show device details if connected
        <div>
          <center>
            <h2>Device Details</h2>
          </center>
          {info.map((data, i) => (
            <Frame deviceName={data} />
          ))}
          {deviceNames.length > 0 && ( // Check for received device names
            <div>
              <h2>Socket.IO Devices</h2>
              {deviceNames.map((data, i) => (
                <Frame deviceName={data} key={i} /> // Add key for better performance
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default QuaggaBarcodeScanner;
