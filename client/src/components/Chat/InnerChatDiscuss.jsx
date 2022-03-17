import React, { useEffect } from "react";
import MessageList from "./MessageList";
import InputMassege from "./InputMessage";


const InnerChatDiscuss = () => {
 
  return (
    <div>
      <div>
        <MessageList />
      </div>
      <InputMassege />
    </div>
  );
};

export default InnerChatDiscuss;
