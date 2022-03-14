import React, { useEffect } from "react";
import { Routes, Link, Route, useNavigate, Navigate, useLocation } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { types } from "../../store/types/userTypes";
import {locationTypes} from "../../store/types/locationTypes"


const LockationHome = () => {
  const [location, setLocation] = useState({city: '', street: "", home: ''}) // это забираем с собой на бек
  const {_user} = useSelector(state => state.auth) // это забираем с собой на бек из временногог хранилища
  const locationsCity = useSelector(state => state.location.location)
  const [locationStreets, setLocationStreets] = useState([])
  const [locationHomes, setLocationHomes] = useState([])
  const dispatche = useDispatch()
  const navigate = useNavigate()

  const getLocations = () => {
    dispatche({type: locationTypes.GET_ALL_LOCATION_SAGA});
  }
  
  useEffect(() => getLocations(), []);

  const selectSity = (e) => {
    if(e.target.innerText && !e.target.value) {
      setLocationStreets(locationsCity.find((city) => city.name === e.target.innerText).streets);
      setLocation({...location, city : e.target.innerText});
    }  
    else if (e.target.value) {
      setLocationStreets([]);
      setLocation({...location, city : e.target.value});
    }
  }

  const selectStreet = (e) =>{
    if(e.target.innerText && !e.target.value) {
      setLocationHomes(locationStreets.find((street) => street.name === e.target.innerText).homes);
      setLocation({...location, street : e.target.innerText});
    }  
    else if(e.target.value) {
      setLocationHomes([]);
      setLocation({...location, street : e.target.value});
    } 
  }

  const selectHome = (e) => {
    if(e.target.innerText && !e.target.value)  setLocation({...location, home : e.target.innerText});
    else if(e.target.value) setLocation({...location, home : e.target.value});
  }
  
  
  const signUpAndLocation = () => {
    const newUser = {..._user}
    locationsCity.forEach((city) => {
      if (city.name === location.city) newUser.city_id = city.id;
    })
    locationStreets.forEach((street) => {
      if (street.name === location.street) newUser.street_id = street.id;
    })
    locationHomes.forEach((home) => {
      if (Number(home.name) === Number(location.home)) newUser.home_id = home.id;
    })
    dispatche({type: types.SIGN_UP_USER_SAGA, user: {...newUser, city: location.city, street: location.street, home: location.home}});
    navigate('/');
  }
  
  return (
    
    <Stack spacing={2} sx={{ width: 300 }}>
         <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={locationsCity.map((option) => option.name)}
        renderInput={(params) => <TextField onChange={(e) => selectSity(e)} {...params} label="Введите свой город" />}
        onChange={(e) => selectSity(e)}
        
      />
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={locationStreets.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} onChange={(e) => selectStreet(e)} label="Введите свою улицу" />}
          onChange={(e) => selectStreet(e)}
        />
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={locationHomes.map((option) => String(option.name))}
            renderInput={(params) => <TextField {...params} onChange={(e) => selectHome(e)} label="Введите свой дом" />}
            onChange={(e) => selectHome(e)}
          />  
     <Button onClick={(e) => signUpAndLocation()} variant="outlined">Прикрепиться</Button>
     </Stack>
  
  );
};


export default LockationHome;
