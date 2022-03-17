import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { actiontTypes } from "../../store/types/globalTypes";
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
import { addGlobalNews } from "../../store/actionCreators/globalNewsAC";
import {useParams,useNavigate} from 'react-router-dom'
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";

function GlobalNewsForm(){
  const state = useSelector((store)=>store.globalNews.arrGlobalNews)
  console.log(state,'sssssssssssssssstateeeeeeeeeeee')
  const params = useParams()
  const navigate = useNavigate()
  function findDataInGlobalArr(id){
    return state?.filter((el)=>el.id == id)
   }
   const defaultData = findDataInGlobalArr(params.id)[0]
  // console.log('find',defaultData)
  const dispatch = useDispatch()
  const [title,setTitle]=useState(defaultData?.title)
  const [text,setText]=useState(defaultData?.text)
  const [link,setLink]=useState(defaultData?.link)
  const [check,setCheck]=useState(trueOrFalse(defaultData?.fixed) || false)
  const [idNews,setIdNews] = useState(defaultData?.id || 0)
  
  const globalNews = useSelector((store)=>store.globalNews.arrGlobalNews)
  //console.log('globalNews',globalNews)
  
  function count(){
   if(check == false){
     return setCheck(true)
   }
    else {
      return setCheck(false)
    
   }
  }
  function trueOrFalse(a){
   return (a==='true'?true:false)
  }
  function sagaGlobalData(){
    console.log(123)
    const obj = {
      title,
      text,
      link,
      check,
      idNews
    }
     dispatch({type: actiontTypes.ADD_GLOBAL_NEWS_SAGA,payload:obj})
  }
   function navigateToMain(){
     navigate('/GlobalNews')
  }
  useEffect(()=>{ 
    dispatch(getAllGlobalNews())
    
   },[])
  return(
     <>
     <Stack direction={'row'} spacing={3} textAlign={'center'} marginTop={'5vh'}>
     <Stack spacing={2} textAlign={'start'} marginLeft={'180px'}>

<Box component="form"
sx={{
'& .MuiTextField-root': { mt:7, width: '25ch' },
}}
noValidate
autoComplete="off">
<TextField onChange={(event)=>{
  setTitle(event.target.value)}}
    required
    id="1"
    label="Введите заголовок"
    defaultValue={defaultData?.title }
  />
</Box>
<Box component="form"
sx={{
'& .MuiTextField-root': { mt:7, width: '130ch' ,},
}}
noValidate
autoComplete="off">
<TextField
    onChange={(event)=>{
    setText(event.target.value)}}
    required
    id="1"
    label="Введите текст"
    defaultValue={defaultData?.text}
    multiline
    rows={20}
  />
</Box>

</Stack>
<Box paddingTop={'18vh'} paddingLeft={'5ch'}>

<Stack spacing={2} direction="column" textAlign={'start'} >

<Box marginBottom={'38vh'}  >
      <FormControlLabel  control={<Checkbox defaultChecked={trueOrFalse(defaultData?.fixed)} onChange={(e)=>{
        count()
      }}/>} label="Закрепить новость" />
</Box>
<Stack spacing={2} direction="column" marginTop={'200px'}   >
<label htmlFor="icon-button-file">
       
        <Button component="span"  variant="contained">
        <Input   accept="image/*" id="icon-button-file" type="file" onChange={(e)=>{
            setLink(e.target.files)
        }}/>
        </Button>
      </label>
<Button  onClick={(e)=>{
 
  e.preventDefault()
  console.log(1234)
  sagaGlobalData()
  //navigateToMain()
}}  variant="contained"   >Опубликовать новость</Button>
</Stack>

</Stack>

</Box>
     </Stack>   
 </>
   )
}



export default GlobalNewsForm
