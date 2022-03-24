import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import { types } from "../../store/types/userTypes";
import TextField from '@mui/material/TextField';

const SignIn = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const dispatche = useDispatch()
  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault();
    const isValid = /[A-Za-z]\w+/.test(name)
    if (isValid) {
      dispatche({type: types.SIGN_IN_USER_SAGA, user: {name, pass}})
      navigate('/GlobalNews')
    } else if (!/^[A-Za-z]\w+$/.test(name)) alert('введи нормально логин')
  }

  return (
    <form id="signupForm" method="POST" action="" style={{ marginTop: '70px' }}>
        <div >
          <h2  id="formTitle">Авторизация</h2>

          <TextField onChange={e => setName(e.target.value)}
            id="username"  
            type="text" 
            placeholder="Enter name" 
            name="name" 
            required 
            pattern="[A-Za-z]\w+"
            title="Латинские буквы, цифры и _" />

          <TextField onChange={e => setPass(e.target.value)}
            type="password"  
            placeholder="Enter Password" 
            name="password" 
            required />
          <Button onClick={(e) => logIn(e)}>Войти</Button>

        </div>
    </form>
  );
};


 export default SignIn;
