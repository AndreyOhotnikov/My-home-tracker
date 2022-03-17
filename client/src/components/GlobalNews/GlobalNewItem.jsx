import React from "react";
import Box from '@mui/material/Box';
import { types } from "../../store/types/userTypes";
import { Grid, Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import { addGlobalNews, addLikeSaga,deleteGlobalSaga } from "../../store/actionCreators/globalNewsAC";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import { Route, Routes, Link } from "react-router-dom";
import GlobalNewsForm from "./GlobalNewsForm";
import findDataInGlobalArr from './GlobalNewsList'
import Button from '@mui/material/Button';
import {useDispatch,useSelector} from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {goodDate} from './GlobalNewsList'
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";
function GlobalNewsItem({el,view,setView,id,setId}){
  const params = useParams()
  const navigate = useNavigate();
  const state = useSelector((store)=>store.globalNews.arrGlobalNews)
 
 const userRole = useSelector((state)=>state.auth.auth)
 console.log(userRole)
  function findDataInGlobalArr(id){
    return state.filter((el)=>el.id == id)
   }
  const defaultData = findDataInGlobalArr(params.id)[0]
  const dispatch = useDispatch()
  function changeLike(id,e){
    e.preventDefault()
    dispatch(addLikeSaga(id))
  }
  function updateGlobal(id){
    navigate(`/global/put/${id}`)
  }
  function seeItem(id){
    navigate(`/global/${id}`)
  }
  function statusView(){
      if(view){
        setView(false)
      }else setView(true)
   }
  function deleteGlobal(id){
    dispatch(deleteGlobalSaga(id))
  }
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign:'start',
    color: theme.palette.text.secondary,
  }));
  function  navigateToMain(){
       navigate('/GlobalNews')
  }
  function isFixed(el){
    if(el.fixed ==='true'){
      return true
    }
  }
  useEffect(()=>{ 
    debugger
     if(!userRole)dispatch({ type: types.CHECK_IS_AUTH_SAGA });
    dispatch(getAllGlobalNews()) 
    
   },[])
   const goodDate=(str='')=>{ 
    const timeSec = str?.slice(-10,-8)
    let timeHour = +(str?.slice(-13,-11))
    const year = str?.slice(0,4)  
    let day = str?.slice(8,10)
    const month = str?.slice(5,7)
    const monthObj = {
      '01':'января',
      '02':'февраля',
      '03':'марта',
      '04':'апреля',
      '05':'мая',
      '06':'июня',
      '07':'июля',
      '08':'августа',
      '09':'сентября',
      '10':'октября',
      '11':'ноября',
      '12':'декабря',
    }
    if(+timeHour >=21 && +timeHour <=24 ){
      timeHour=Math.abs(21 - (+timeHour) )
      if(+timeHour>0){
        day=+day+1
      }
    }
    
    else{
      timeHour= timeHour+3
    }
    return `${day} ${monthObj[month]} ${year} г., ${timeHour}:${timeSec}`
  }
   return (
    <>
   <Box marginLeft={'10ch'} width={'180ch'} marginTop={'5ch'}>
   <Item  > 
   < Box   >
    </Box>
   <Stack direction="column" spacing={1} marginLeft={'5ch'} marginTop={'5vh'}>
     <Box>{goodDate(defaultData?.updatedAt)}</Box>
   <Box  underline="none" style={isFixed(defaultData)?{color:'red'}:null} onClick ={()=>{
      statusView(view,setView)
      setId(defaultData?.id)
      navigate(`/form/${defaultData.id}`)
      }}>
    {defaultData?.title}
   </Box >
    
   <Stack direction={'row'}>
   <Box width={'140ch'} marginTop={'5ch'}  >
   {defaultData?.text}    
   </Box>
  
   <Stack>
   
   <Box paddingLeft={'5ch'} component='img'
            src={defaultData?.link}
            srcSet={`${defaultData?.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={defaultData?.title}
            loading="lazy"
            width={'40ch'}
            height={'40vh'}
          />
          <Stack direction={'row'}>
         
          <Box paddingLeft={'35ch'} marginTop={'5vh'} > {defaultData?.likeLength ? defaultData?.likeLength:0 }</Box> 
          <Box marginTop={'5vh'}> < FavoriteIcon onClick={(e)=> changeLike(defaultData?.id,e)}/></Box> 
   
         
          </Stack>
          
          </Stack>
          
   </Stack>
   <Stack direction={'row'} >
          {userRole?.role==='user' && <Box marginRight={'100ch'}><Button onClick={()=>updateGlobal(defaultData.id)}>Редактировать</Button>
          <Button onClick={()=>{
            deleteGlobal(defaultData.id)
            navigateToMain()
            }}>Удалить</Button></Box>}
          
          
   </Stack>
   
    
   
   
   </Stack>
   
   </Item>
   <Box marginTop={'3vh'}>
   <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {state.map((el, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Item><Box width={'50ch'} height={'50vh'} onClick={()=>seeItem(el.id)}>
        <Box>{goodDate(el.updatedAt)}</Box>
        <Box style={isFixed(el)?{color:'red'}:null}>{el.title}</Box>
        </Box>
        </Item>
    </Grid>
  ))}
</Grid>
</Box>
   </Box>
   
    
    </>)
}


export default GlobalNewsItem
