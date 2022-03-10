import React, { useEffect } from "react";
import { types } from "../../store/types/userTypes"
import { useNavigate } from "react-router-dom";

import MyButton from "../button/MyButton";


const WelcomePage = () => {
  const navigate = useNavigate()

  const navigateTo = (url) => {
    navigate(url)
  }

  

  return (
      <div>

        <MyButton  onClick={() => navigateTo('/signup')}>Зарегистрироваться</MyButton>
        <MyButton  onClick={() => navigateTo('/signin')}>Авторизоваться</MyButton>
        <MyButton  onClick={() => navigateTo('/signin')}>Выйти</MyButton>

      </div>
  )
}

export default WelcomePage;
