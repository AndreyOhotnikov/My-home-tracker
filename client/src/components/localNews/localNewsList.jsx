import React from "react";

import Box  from '@mui/material/Box';
import { Button} from "@mui/material";
import { Link,Stack } from "@mui/material";
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";


import { Route, Routes } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";

import { getAllLocalNews } from "../../store/actionCreators/localNewsAC";
import { useNavigate } from "react-router-dom";
import {addLikeLocalSaga} from "../../store/actionCreators/localNewsAC";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalNewsItem from "./localNewsItem";

function LocalNewsList(){
  const state = useSelector((store)=>store.localReducer.arrLocalNews)
  const userRole = useSelector((state)=>state.auth.auth)
  const navigate = useNavigate();
  // console.log(state,'=>>>>>>>>>>>>>>>>>>>>>')
  const dispatch = useDispatch()
  const [view,setView] = useState(true)
  const [id,setId] = useState(0)
  function changeLike(id){
    dispatch(addLikeLocalSaga(id))
  }
 
  function statusView(){
      if(view){
        setView(false)
      }else setView(true)
   }
    
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign:'start',
    color: theme.palette.text.secondary,
  }));
  function seeItem(id){
    navigate(`/local/${id}`)
  }

 useEffect(()=>{ 
  
  dispatch(getAllLocalNews())
  
 },[])

  function isFixed(el){
    if(el.fixed ==='true'){
      return true
    }
  }
  const goodDate=(str='')=>{ 
    const timeSec = str.slice(-10,-8)
    let timeHour = +(str.slice(-13,-11))
    const year = str.slice(0,4)  
    const day = str.slice(8,10)
    const month = str.slice(5,7)
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
    if(timeHour >='21' && timeHour <='24' ){
      timeHour=Math.abs(21 - timeHour)
    }else{
      timeHour= timeHour+3
    }
    return `${day} ${monthObj[month]} ${year} г., ${timeHour}:${timeSec}`
  }

  return (
    <>
    
    {view && <Box paddingTop={'2vh'} marginBottom={'3vh'} >
    <Box marginTop={3}>Новости пользователей</Box>
      <Stack direction="column" spacing={1} marginRight={30} marginLeft={30}>
    {state?.map((el,index)=>{
      return <> 
      
       <Item  > 
         <Box>{goodDate(el?.updatedAt)}</Box>
         
       <Box marginTop={'2vh'} onClick={()=>seeItem(el.id)} key={index} style={isFixed(el)?{color:'red'}:null}>{el.title}</Box>
  
  
   <Stack direction="row" spacing={1}>
   <Box width={1600} marginTop={3} >
   {/* {el.text} */}
  
   </Box>
   <Box component='img'
            src={el.link}
             srcSet={`${el.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
             alt={el.title}
            loading="lazy"
            width={'40ch'}
            height={'40vh'}
          />
   
   </Stack>
   
   < Box marginLeft={'120ch'}  >
   <Stack direction={'raw'} alignContent={'end'} marginTop={'1vh'} marginLeft={'20ch'}>
   <Box marginLeft={'-140ch'}>Автор новости: {userRole.user}</Box>
   <Box marginLeft={'120ch'} alignContent={'end'}> {el.likeLength}</Box>
   <Box  > < FavoriteIcon onClick={()=>{
     changeLike(el.id)
   }}/></Box> 
    
     </Stack>
    </Box>
   </Item>
      </>
    })}
      </Stack>
  
     
    </Box>}
    <Routes>
      {/* {!view && <Route  path="/form/:id" element={<GlobalNewsForm/>} ></Route>} */}
      {/* {!view && <Route  path="/local/:id" element={<LocalNewsItem/>} ></Route>} */}
      {/* {!view && <Route  path="/global/:id" element={<GlobalNewsId  />} ></Route>} */}
      
      </Routes>
    </>
    
  );
}



export default LocalNewsList

//<GlobalNewsItem view={view}  setId={setId} setView={setView} key={index} el={el} />
