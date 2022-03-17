import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { servicesSagaApi } from "../../store/actionCreators/benefitServicesAC";
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItem,
} from "@mui/material";
const ws = new WebSocket("ws://localhost:3010");

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const userForChat = useSelector((state) => state.auth.auth); // имя юзера
  //console.log("userForChat", userForChat);
  const user = userForChat.user;

  ws.onmessage = (event) => {
    //сообщение из веб сокетов
    const message = JSON.parse(event.data);
    setMessages([...messages, message]);
    //console.log(message);
  };
  let now = new Date().toLocaleTimeString().slice(0, -3);

  return (
    <div
      style={{
        height: "240px",
        overflowY: "auto",
        marginBottom: "5px",
        overflowX: "hidden",
      }}
    >
      {messages?.map((mes, index) => {
        return (
          <List key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 24, height: 24 }}
                  src="https://img.freepik.com/free-vector/chat-feedback-customer-illustration_47016-112.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={user}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {mes}
                  </React.Fragment>
                }
              />
              <ListItemText>
                <Typography sx={{ fontSize: 8 }}>{now}</Typography>
              </ListItemText>
            </ListItem>
          </List>
        );
      })}
    </div>
  );
};

export default MessageList;
