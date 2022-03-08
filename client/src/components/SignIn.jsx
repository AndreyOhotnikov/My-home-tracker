import React from "react";
import { Routes, Link, Route, Navigate, useLocation } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authUserReducer } from '../store/authReducer';
import MyButton from './button/MyButton';
import MyInput from './input/MyInput';


// import env from "react-dotenv";

const SignIn = ({setAuth}) => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const dispatche = useDispatch()
  const auth = useSelector(state => state.auth.auth)
  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault();
    //   const response = await fetch(`/user/signin`, {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name, password: pass
    //     })
    //   });
    // const {user} = await response.json();
    // if (user) dispatche(authUserReducer(user.name))
    console.log('name-', name, 'pass-', pass, )
    // navigate((`/`))
  }

  return (
    <form id="signupForm" method="POST" action="" style={{ marginTop: '70px' }}>
        <div >
          <h2  id="formTitle">Авторизация</h2>
          <MyInput 
            onChange={e => setName(e.target.value)}
            id="username"  
            type="text" 
            placeholder="Enter name" 
            name="name" 
            required 
            pattern="[A-Za-z]\w+"
            title="Латинские буквы, цифры и _"
          />
          <MyInput 
            onChange={e => setPass(e.target.value)}
            type="password"  
            placeholder="Enter Password" 
            name="password" 
            required
          />
          <MyButton  type="submit" onClick={(e) => logIn(e)}>Войти</MyButton>
        </div>
    </form>
  );
};


export default SignIn;
