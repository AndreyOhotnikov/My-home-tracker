import React from "react";
import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
import axios from "axios"
import MyButton from '../button/MyButton';
import MyInput from '../input/MyInput';
import { useState } from "react";
import { authReducer } from '../store/authReducer';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import MySelect from '../select/MySelect';


// import env from "react-dotenv";

const LockationHome = () => {
  // console.log(2)
  const [location, setLocation] = useState({sity: '', street: "", home: ''})
  const [locationInput, setLocationInput] = useState({sity: true, street: true, home: true})
  const {locationCity, locationStreet, locationHome} = useSelector(state => state.location)
  const dispatche = useDispatch()

  const selectSity = (e) => setLocation({...location, sity : e})
  const selectStreet = (e) => setLocation({...location, street : e})
  const selectHome = (e) => setLocation({...location, home : e})

  
  
  
  
  console.log(location)
  
  if (location.sity === 'newLoc') {
    setLocation({...location, sity : ''})
    setLocationInput({...locationInput, sity: !locationInput.sity})
  } 
  if (location.street === 'newLoc') {
    setLocation({...location, street : ''})
    setLocationInput({...locationInput, street: !locationInput.street})
  }
  if (location.home === 'newLoc') {
    setLocation({...location, home : ''})
    setLocationInput({...locationInput, home: !locationInput.home})
  }
    

  return (
  <>
        <MySelect  
          value={location.sity}
          onChange={selectSity}
          defaultValue='Выберите город'
          options={locationCity}
          defaultValue2='Выберите новый город'/>
        {!locationInput.sity &&  <MyInput 
          value={location.sity}
          onChange={e => setLocation({...location, sity :e.target.value})}
          placeholder="Введите свой город"
        />}

          <MySelect  
            value={location.street}
            onChange={selectStreet}
            defaultValue='Выберите улицу'
            options={locationStreet}
            defaultValue2='Выберите новую улицу'
          />
          {!locationInput.street &&  <MyInput 
            value={location.street}
            onChange={e => setLocation({...location, street: e.target.value})}
            placeholder="Введите название улицы"
          />  }

          <MySelect  
            value={location.home}
            onChange={selectHome}
            defaultValue='Выберите дом'
            options={locationHome}
            defaultValue2='Выберите новый дом'
          />
          {!locationInput.home &&  <MyInput 
            value={location.home}
            onChange={e => setLocation({...location, home :e.target.value})}
            placeholder="Введите номер дома"
          />  }

  <MyButton  type="button" onClick={(e) => console.log(888888888)}>Прикрепиться</MyButton>
  </>
  );
};


export default LockationHome;
