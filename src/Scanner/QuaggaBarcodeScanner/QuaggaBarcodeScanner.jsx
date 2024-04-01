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
import io from "socket.io-client";

const socket = io("https://socket-io-server-weub.onrender.com");
socket.emit("username", "23423");

const QuaggaBarcodeScanner = () => {
  const [deviceNames, setDeviceNames] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const localStorageData = localStorage.getItem("deviceNames");
  const dataArray = localStorageData ? JSON.parse(localStorageData) : [];

  // const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    // const unsubscribeDb = db.collection("devices").onSnapshot((snapshot) => {
    //   snapshot.forEach((element) => {
    //     var data = element.data();
    //     setInfo(data.devices);
    //   });
    // });

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
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (deviceNames.length > 0) {
      localStorage.setItem("deviceNames", JSON.stringify(deviceNames));
    }
  }, [deviceNames]);
  // const onButtonClick = () => {
  //   // Handle button click logic (optional)
  //   setButtonClicked(true); // Assuming you still have button logic
  // };

  const Frame = ({ deviceName }) => {
    return (
        <div className="div">
          <p>Device Name : {deviceName}</p>
        </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", lineHeight:"2.5" }}>
      <center><a href="bledevices://bleconnect?userId=23423&shareId=234sdf">
        <button style={{ marginTop: "30px" }}>Go to Mobile App</button>
      </a></center>
      {isSocketConnected && (
        <center>
          {(deviceNames.length > 0 || dataArray.length > 0) && (
            <div style={{display:"flex",flexDirection:"column",lineHeight:"0.4",width:"fit-content", textAlign:"left"}}> 
              <h2 style={{textAlign:"center"}}>Device Details</h2>
              {deviceNames.length>0
                ? deviceNames.map((data, i) => (
                    <Frame deviceName={data} key={i} />
                  ))
                : dataArray.map((data, i) => (
                    <Frame deviceName={data} key={i} />
                  ))}
            </div>
          )}
        </center>
      )}
    </div>
  );
};

export default QuaggaBarcodeScanner;
