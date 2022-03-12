import React from "react";
import {  useSelector } from 'react-redux';


const GlobalNewsList = () => {
  const auth = useSelector(state => state.auth.auth)


  return ( <>

    <div>Это главная страница главных новостей</div>

    <div>Имя юзера: {auth.user}, его роль: {auth.role}</div>
  </>
  );
};

export default GlobalNewsList;
