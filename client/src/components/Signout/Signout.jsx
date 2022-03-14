
// import React from "react";
// import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
// import { useDispatch, useSelector } from 'react-redux';
// import Button from '@mui/material/Button'
// import { types } from "../../store/types/userTypes";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import  styles  from "./Signout.module.css";
// import { openModaleReducer } from "../../store/actionCreators/userAC";



// const Signout = () => {
//   const open = useSelector(state => state.auth.modale)
//   const dispatche = useDispatch()
//   const navigate = useNavigate()

//   const handleOpen = () => {
//     dispatche(openModaleReducer(true))
//   };
//   const handleClose = () => {
//     dispatche(openModaleReducer(false))

//   };
//   const logout = async (e) => {
//     // console.log(234234234234)
//     dispatche(openModaleReducer(false), {type: types.SIGN_OUT_USER_SAGA})
//     dispatche({type: types.SIGN_OUT_USER_SAGA})
//     navigate((`/`))
//   }

//   return (

//     <div>
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="parent-modal-title"
//       aria-describedby="parent-modal-description"
//     >
//       <Box sx={{ ...style, width: 400 }}>
//         <h2 id="parent-modal-title"> Вы действительно хотите выйти?</h2>
//         <Button  type="submit" onClick={(e) => logout(e)}>Выйти</Button>

//       </Box>
//     </Modal>
//   </div>

//   );
// };

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   borderColor: 'blue',
//   pt: 2,
//   px: 4,
//   pb: 3,
// };





// export default Signout;
