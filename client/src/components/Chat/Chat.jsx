import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalOpen from "./ModalOpen";

//const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));


const style = {
  position: "absolute",
  top: "65%",
  left: "85%",
  transform: "translate(-50%, -50%)",
  height: 300,
  width: 260,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 12,
};
const ws = new WebSocket("ws://localhost:3010");

const Chat = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  ws.onopen = () => {
    console.log("RAБОТАЕТ");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{ position: "absolute", top: "90%", left: "90%" }}
      >
        ЧАТ
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sv={{}}
      >
        <Box sx={style}>{<ModalOpen />}</Box>
      </Modal>
    </div>
  );
};

export default Chat;
