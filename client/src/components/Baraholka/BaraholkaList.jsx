import React from "react";
import {  useSelector } from 'react-redux';


const BaraholkaList = () => {
  const auth = useSelector(state => state.auth.auth)


  return ( <>

    <div>Это главная страница барахолки</div>

    <div>Имя юзера: {auth.user}, его роль: {auth.role}</div>
  </>
  );
};

export default BaraholkaList;
