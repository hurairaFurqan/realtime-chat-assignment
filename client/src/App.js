import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState([]);
  const [image, setImage] = useState("");
  // const [rMsg, setRMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  // console.log(`sendmsgs, sendingMsg`);
  const sendMessage = () => {
    setSendingMsg((values) => [...values, message]);
    socket.emit("sendMessage", message);
  };

  const sendFile = (e) => {
    socket.emit("image", e.target.files[0]);
  };

  useEffect(() => {
    socket.on("listenMsg", (data) => {
      // setMsgs((msg) => [...msg, data]);

      console.log(data);
      setImage(URL.createObjectURL(data));
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="type your message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <br></br>
      <input type={"file"} onChange={(e) => sendFile(e)}></input>
      <br></br>
      {msgs.map((msg) => {
        return <div>{msg}</div>;
      })}
      <br></br>
      {/* {sendingMsg.map((sMsg) => {
        return <div>{sMsg}</div>;
      })} */}

      <img src={image} alt="no image found"></img>
    </div>
  );
}

export default App;
