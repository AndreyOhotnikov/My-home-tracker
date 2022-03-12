import React from "react";
import {  useSelector } from 'react-redux';


const BenefitServicesList = () => {
  const auth = useSelector(state => state.auth.auth)


  return ( <>

    <div>Это главная страница Услуг дома</div>

    <div>Имя юзера: {auth.user}, его роль: {auth.role}</div>
  </>
  );
};

export default BenefitServicesList;
