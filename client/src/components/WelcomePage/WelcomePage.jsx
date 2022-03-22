import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'

const WelcomePage = () => {
  const navigate = useNavigate()

  const navigateTo = (url) => navigate(url);

   return (
      <div style={{marginTop: '15%'}}>
        <Button onClick={() => navigateTo('/signup')}>Зарегистрироваться</Button>
        <Button onClick={() => navigateTo('/signin')}>Авторизоваться</Button>
      </div>
  )
}

export default WelcomePage;
