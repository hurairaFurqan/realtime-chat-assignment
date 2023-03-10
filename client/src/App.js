import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
const socket = io.connect("http://localhost:3001");

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #46516e;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

function App() {
  const [id, setID] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    const msgObject = {
      id: id,
      body: message,
    };
    socket.emit("send message", msgObject);
  };

  useEffect(() => {
    socket.on("id", (yourID) => {
      setID(yourID);
    });

    socket.on("recieveMsg", (msg) => {
      recieveMsg(msg);
    });
  }, [socket]);

  const recieveMsg = (msg) => {
    setSendingMsg((oldMsg) => [...oldMsg, msg]);
  };
  return (
    <Page>
      <Container>
        {sendingMsg.map((msg, index) => {
          if (msg.id === id) {
            return (
              <MyRow key={index}>
                <MyMessage>{msg.body}</MyMessage>
              </MyRow>
            );
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>{msg.body}</PartnerMessage>
            </PartnerRow>
          );
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea
          placeholder="type something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></TextArea>

        <Button type="submit">Send Message</Button>
      </Form>
    </Page>
  );
}

export default App;
