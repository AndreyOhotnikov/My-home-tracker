import React, { useEffect } from "react";
import { types } from "../../store/types/userTypes"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux';


import MyButton from "../button/MyButton";


const WelcomePage = () => {
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth.auth)

  const navigateTo = (url) => {
    navigate(url)
  }

   return (
      <div>


        <Button onClick={() => navigateTo('/signup')}>Зарегистрироваться</Button>
        <Button onClick={() => navigateTo('/signin')}>Авторизоваться</Button>
        <Button onClick={() => navigateTo('/signout')}>Выйти</Button>


      </div>
  )
}

export default WelcomePage;
