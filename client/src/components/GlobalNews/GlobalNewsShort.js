import React from "react";
import Box from '@mui/material/Box';

import { Link,Stack } from "@mui/material";
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import ShortGlobalNewsItem from "./ShortGlobalNewsItem";

import { Route, Routes } from "react-router-dom";
import GlobalNewsForm from "./GlobalNewsForm";
import { useSelector,useDispatch } from "react-redux";
import GlobalNewsId from './GlobalNewsId'
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";

function ShortGlobalNewsList(){
  const state = useSelector((store)=>store.globalNews.arrGlobalNews)
  console.log(state[0])
  const dispatch = useDispatch()
  const [view,setView] = useState(true)
  const [id,setId] = useState(0)
  
 useEffect(()=>{ 
  dispatch(getAllGlobalNews()) 
 },[])
  return (
    <>
    
    {view && <Box paddingTop={2} >
    <Box marginTop={3}>Главные новости</Box>
      <Stack direction="column" spacing={1} marginRight={30} marginLeft={30}>
    {state?.map((el,index)=>{
      return <> <ShortGlobalNewsItem view={view}  setId={setId} setView={setView} key={index} el={el} />
      </>
    })}
      </Stack>
  
     
    </Box>}
    <Routes>
      {!view && <Route  path="/form/:id" element={<GlobalNewsForm   />} ></Route>}
      {/* {!view && <Route  path="/global/:id" element={<GlobalNewsId  />} ></Route>} */}
      
      </Routes>
    </>
    
  );
}

//

export default ShortGlobalNewsList
