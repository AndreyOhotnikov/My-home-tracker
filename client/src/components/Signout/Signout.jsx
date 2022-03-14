// import React from "react";
// import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
// import axios from "axios"
// import MyButton from '../button/MyButton';
// import MyInput from '../input/MyInput';
// import { useState } from "react";
// import { authReducer } from '../../store/authReducer';
// import { useDispatch, useSelector } from 'react-redux';
// // import { useSelector } from 'react-redux';

// // import env from "react-dotenv";

// const Signout = () => {
//   // console.log(2)

//   const dispatche = useDispatch()
//   const auth = useSelector(state => state.auth.auth)

//   const navigate = useNavigate()
//   const logout = async (e) => {
   
//     // e.preventDefault();
//     //   const response = await fetch(`/user/signout`, {
//     //     method: "GET",
//     //   });
//     //   const str = await response.json()
//     //   // console.log(str)
//     //   dispatche(authReducer(false))
//     //   navigate((`/signin`))
//   }

//   return (
//           <MyButton  type="submit" onClick={(e) => logout(e)}>Выйти</MyButton>
//   );
// };


// export default Signout;
