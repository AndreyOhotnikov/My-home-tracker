import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { localTypes } from "../../store/types/localTypes";
import { Link,Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import { IconButton } from "@mui/material";

import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { Input } from "@mui/material";
import { Provider, useDispatch,useSelector } from "react-redux";

import { addGlobalNews } from "../../store/actionCreators/globalNewsAC";
import {useParams,useNavigate} from 'react-router-dom'
import { getAllLocalNews } from "../../store/actionCreators/localNewsAC";
function LocalNewsForm(){
  const stateLocal = useSelector((store)=>store.localReducer.arrLocalNews)
  console.log(stateLocal,'sssssssssssssssstateeeeeeeeeeee')
  const params = useParams()
  const navigate = useNavigate()
  function findDataInLocalArr(id){
    return stateLocal?.filter((el)=>el.id === Number(id))
   }
   const defaultData = findDataInLocalArr(params.id)[0]
  // console.log('find',defaultData)
  const dispatch = useDispatch()
  const [title,setTitle]=useState(defaultData?.title)
  const [text,setText]=useState(defaultData?.text)
  const [link,setLink]=useState(defaultData?.link)
  const [check,setCheck]=useState(trueOrFalse(defaultData?.fixed) || false)
  const [idNews,setIdNews] = useState(defaultData?.id || 0)
  
  // const globalNews = useSelector((store)=>store.globalNews.arrGlobalNews)
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
  function sagaLocalData(){
    const obj = {
      title,
      text,
      link,
      check,
      idNews
    }
     dispatch({type: localTypes.ADD_LOCAL_NEWS_SAGA,payload:obj})
  }
   function navigateToMain(){
     navigate('/localnews')
  }
  useEffect(()=>{ 
    dispatch(getAllLocalNews())
    
   },[])
  return(
     <div style={{maxWidth: '80%'}}>
      <Stack direction={'row'} spacing={3} textAlign={'center'} marginTop={'5vh'} maxWidth={'80%'} display={'flex'} flexDirection={'column'} >
      <Stack spacing={2} textAlign={'start'} marginLeft={'180px'} maxWidth={'100%'} >

        <Box component="form" 
        maxWidth={'80%'}
        sx={{
        '& .MuiTextField-root': { mt:'2%', width: '80%' },
        }}
        noValidate
        autoComplete="off">
        <TextField onChange={(event)=>{
          setTitle(event.target.value)}}
            required
            id="1"
            label="Введите заголовок"
            defaultValue={defaultData?.title }
            maxWidth={'80%'}/>
        </Box>
        <Box component="form" maxWidth={'80%'}
        sx={{
        '& .MuiTextField-root': { mt:"2%", width: '25ch' },
        }}
        noValidate
        autoComplete="off">

        </Box>
        <Box component="form" maxWidth={'80%'}
        sx={{
        '& .MuiTextField-root': { mt:"2%", width: '130ch' ,},
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
            rows={15}
            maxWidth={'80%'}
          />
        </Box>

        </Stack >
        <Box paddingTop={''} paddingLeft={'16%'} maxWidth={'80%'} >

        <Stack spacing={2} direction="column" textAlign={'start'} maxWidth={'80%'}   display={'flex'}>

        {/* <Box marginBottom={'38vh'}  >
              <FormControlLabel  control={<Checkbox defaultChecked={trueOrFalse(defaultData?.fixed)} onChange={(e)=>{
                count()
              }}/>} label="Закрепить новость" />
        </Box> */} <br/>
        <Stack spacing={2} direction="column" marginTop={'20px'}    >
             <label style={{justifyContent: 'space-between', width: '50%'}} htmlFor="icon-button-file" >
                  
                    <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
                <Box component="span">Выберите фото</Box>
                <input
                 onChange={(e)=>setLink(e.target.files)}
                  style={{display: 'none'}}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  multiple
                />
                    {/* <Button component="span"  variant="contained" width={'600px'}> 
                    <Input   accept="image/*" id="icon-button-file" type="file" onChange={(e)=>{
                        setLink(e.target.files)
                    }}/>
                    </Button> */}
                  
                    <Button  onClick={(e)=>{
                    
                      e.preventDefault()
                      sagaLocalData()
                      navigateToMain()
                    }}  variant="contained"  width={'60px'} >Опубликовать новость</Button>
                    </label>
          </Stack>

        </Stack>

        </Box>
      </Stack>   
 </div>
   )
 }



export default LocalNewsForm
