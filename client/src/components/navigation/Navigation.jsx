import React, { useEffect, useState } from "react";
import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
import SignIn from "../Signin/SignIn";
import Signup from "../Signup/Signup";
import Signout from "../Signout/Signout";
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container } from "react-bootstrap";
import style from "./Navigation.module.css"
import WelcomePage from "../WelcomePage/WelcomePage";
import LockationHome from "../Signup/LockationHome";
import { types } from "../../store/types/userTypes";
import { openModaleReducer } from "../../store/actionCreators/userAC";
import Button from '@mui/material/Button'
import ModalPage from "../Signout/ModalPage";

const Navigation = () => {
  const dispatche = useDispatch()
  const auth = useSelector(state => state.auth.auth)
  // const posts = useSelector(state => state.postsR.posts)

  useEffect(() => {
    console.log(auth)
    if(!auth)  dispatche({type: types.CHECK_IS_AUTH_SAGA})
  }, [])

  const handleOpen = (e) => {
    e.preventDefault()
    dispatche(openModaleReducer(true));
  } 
  const handleClose = () => dispatche(openModaleReducer(false));
  console.log(auth)

  return (
    <div >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            {/* <Link></Link> */}
            { auth.user && <Link className={style.link} to="/">Главная</Link>}
            { auth.user && <Link className={style.link} to="/pictures">Покач что ничего</Link>}
            { auth && <Link className={style.link} onClick={(e) => handleOpen(e)} to="/signout">Выйти</Link>}
            { !auth && <Link className={style.link} to="/signup">Регистрация</Link>}
            { !auth && <Link className={style.link} to="/signin">Войти</Link>}

          </Nav>
        </Container>
      </Navbar>
      <Routes>

          {/* <Route path='/signout' element={<Signout />} /> */}
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<Signup/>} />
          { !auth &&  <Route path='/' element={<WelcomePage/>} />}
          { !auth &&  <Route path='/locationHome' element={<LockationHome/>} />}
      </Routes>
      <ModalPage handleClose={handleClose} />
    </div>
  );
};


export default Navigation;
