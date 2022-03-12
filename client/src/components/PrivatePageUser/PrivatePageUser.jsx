import React from "react";
import {  useSelector } from 'react-redux';


const PrivatePageUser = () => {
  const auth = useSelector(state => state.auth.auth)


  return (
    <div>Имя юзера: {auth.user}, его роль: {auth.role}</div>
  );
};

export default PrivatePageUser;
