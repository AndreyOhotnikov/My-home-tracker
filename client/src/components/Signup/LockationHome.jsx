import React from "react";
import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
import axios from "axios"
import MyButton from '../button/MyButton';
import MyInput from '../input/MyInput';
import { useState } from "react";
import { authReducer } from '../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import MySelect from '../select/MySelect';
import Autocomplete from '@mui/material/Autocomplete';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { types } from "../../store/types/userTypes";


const LockationHome = () => {
  const [location, setLocation] = useState({city: '', street: "", home: ''})
  // const [locationInput, setLocationInput] = useState({sity: true, street: true, home: true})
  const {locationCity, locationStreet, locationHome} = useSelector(state => state.location)
  const {_user} = useSelector(state => state.auth)

  const dispatche = useDispatch()
  console.log(_user)
  const selectSity = (e) => {
    if(e.target.innerText && !e.target.value)  setLocation({...location, city : e.target.innerText})
    else if(e.target.value) setLocation({...location, city : e.target.value})
  } 
  const selectStreet = (e) =>{
    if(e.target.innerText && !e.target.value)  setLocation({...location, street : e.target.innerText})
    else if(e.target.value) setLocation({...location, street : e.target.value})
  } 
  const selectHome = (e) => {
    if(e.target.innerText && !e.target.value)  setLocation({...location, home : e.target.innerText})
    else if(e.target.value) setLocation({...location, home : e.target.value})
  }
  
  
  const signUpAndLocation = () => {
    console.log(_user, location)
    const newUser = {..._user}
    locationCity.forEach((city) => {
      if (city.name === location.city) newUser.city_id = city.id
    })
    locationStreet.forEach((street) => {
      if (street.name === location.street) newUser.street_id = street.id
    })
    locationHome.forEach((home) => {
      if (home.name === location.home) newUser.home_id = home.id
    })
    console.log({...newUser, city: location.city, street: location.street, home: location.home})
    dispatche({type: types.SIGN_UP_USER_SAGA, user: {...newUser, city: location.city, street: location.street, home: location.home}})
  }

  return (
  <div>
    <Stack spacing={2} sx={{ width: 300 }}>
         <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={locationCity.map((option) => option.name)}
        renderInput={(params) => <TextField onChange={(e) => selectSity(e)} {...params} label="Введите свой город" />}
        onChange={(e) => selectSity(e)}
        
      />
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={locationStreet.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} onChange={(e) => selectStreet(e)} label="Введите свою улицу" />}
          onChange={(e) => selectStreet(e)}
        />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={locationHome.map((option) => String(option.name))}
            renderInput={(params) => <TextField {...params} onChange={(e) => selectHome(e)} label="Введите свой дом" />}
            onChange={(e) => selectHome(e)}
          />  
     </Stack>
     <Button onClick={(e) => signUpAndLocation()} variant="outlined">Прикрепиться</Button>
  </div>
  );
};


export default LockationHome;
