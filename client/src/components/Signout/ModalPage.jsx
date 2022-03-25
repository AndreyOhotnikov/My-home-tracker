
import React from "react";
import {  useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import { types } from "../../store/types/userTypes";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { openModaleReducer } from "../../store/actionCreators/userAC";



const ModalPage = ({ handleOpen}) => {
  const open = useSelector(state => state.auth.modale)
  const dispatche = useDispatch()
  const navigate = useNavigate()
  const handleClose = () => dispatche(openModaleReducer(false));

  const logout = async (e) => {
    dispatche(openModaleReducer(false))
    dispatche({type: types.SIGN_OUT_USER_SAGA})
    navigate((`/`))
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title"> Вы действительно хотите выйти?</h2>
          <Button  type="submit" onClick={(e) => logout(e)}>Выйти</Button>
        </Box>
      </Modal>
    </div>
  );
};


const style = {

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 100,
  width: 100,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 12,
};





export default ModalPage;
