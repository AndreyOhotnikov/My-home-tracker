import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Link,Stack } from "@mui/material";
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from "@mui/material";
import { Input } from "@mui/material";
import { Provider, useDispatch,useSelector } from "react-redux";
import findDataInGlobalArr from './GlobalNewsList'
import { addGlobalNews, addLikeSaga } from "../../store/actionCreators/globalNewsAC";
import {useParams} from 'react-router-dom'


function GlobalNewsId(){
  const params = useParams()
  const state = useSelector((store)=>store.globalNews.arrGlobalNews)
  function findDataInGlobalArr(id){
    return state.filter((el)=>el.id == id)
   }
   const defaultData = findDataInGlobalArr(params.id)[0]
   console.log('find',defaultData)
  const dispatch = useDispatch()
  
  // const [like,setLike]=useState(false)
  function changeLike(id){
    dispatch(addLikeSaga(id))
  }
  
  
  return ( <>
    <Stack direction={'row'} spacing={3} textAlign={'center'} marginTop={'10vh'} >
    <Stack spacing={2} textAlign={'start'} marginLeft={'180px'} >

<Box component="form" 
sx={{
'& .MuiTextField-root': { mt:7, width: '25ch' },
}}
noValidate
autoComplete="off">
<Box >
  {defaultData.title}
</Box>
</Box>
<Box 
sx={{
'& .MuiTextField-root': { mt:7, width: '130ch' ,},
}}
noValidate
autoComplete="off">
<Box marginRight={'50ch'}>{defaultData.text}</Box>
</Box></Stack>
<Stack  direction="column"   >
<Box marginRight={'10ch'} marginTop={'30vh'}><Button    variant="contained" size="small" marginRight={'5ch'} onClick={()=>{
  changeLike(defaultData.id)
}} >Отметить новость</Button>
  </Box>
</Stack>
    </Stack>   
</>
  )
}


export default GlobalNewsId
