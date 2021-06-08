import { useState } from "react"
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", { transports : ['websocket'] });

function App() {
  let [location, setLocation] = useState();
  let [rotation, setRotation] = useState();
  let [imageData, setImageData] = useState();
  socket.on("location", (data) => {
    setLocation(data)
  });

  socket.on("rotation", (data) => {
    setRotation(data)
  });

  socket.on("image", (data) => {
    console.log(data)
    setImageData(data)
  });

  socket.connect();
  return (
    <div>
      <div className="container">
        <h1>Location</h1>
        {
          location !== undefined?
          <div>
          <p>X: {location.x}</p>
          <p>Y: {location.y}</p>
          <p>Z: {location.z}</p> 
          </div>
          :
          <p></p>
        }
      </div>
      <div className="container">
        <h1>Rotation</h1>
        {
          rotation !== undefined?
          <div>
          <p>X: {rotation.x}</p>
          <p>Y: {rotation.y}</p>
          <p>Z: {rotation.z}</p> 
          </div>
          :
          <p></p>
        }
      </div>
      <div>
        {
          imageData !== undefined?
          // <p>{imageData.image}</p>
          <img style={{width:"200px"}} src={`data:image/jpeg;base64,${imageData}`} alt="yoo"/>
          :
          <p></p>
        }
      </div>
    </div>
  );
}

export default App;
