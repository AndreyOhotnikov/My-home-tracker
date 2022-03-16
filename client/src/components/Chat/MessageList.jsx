import React, { useState } from "react";
import { useSelector } from "react-redux";
const ws = new WebSocket("ws://localhost:3010");

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const userForChat = useSelector((state) => state.auth.auth);
  console.log("userForChat", userForChat);
  const user = userForChat.user;

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setMessages([...messages, message]);
    console.log(message);
  };

  return (
    <div style={{ height: "240px", overflowY: "auto", marginBottom: "5px" }}>
      <dl>
        {messages.map((mes, index) => {
          return (
            <dt key={index}>
              &#9786; {user}: <dd key={index}>&#128233; {mes}</dd>
            </dt>
          );
        })}
      </dl>
    </div>
  );
};

export default MessageList;
