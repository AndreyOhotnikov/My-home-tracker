import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { actiontTypes } from "../../store/types/globalTypes";
import { Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Input } from "@mui/material";
import { Provider, useDispatch, useSelector } from "react-redux";
import findDataInGlobalArr from "./GlobalNewsList";
import { addGlobalNews } from "../../store/actionCreators/globalNewsAC";
import { useParams, useNavigate } from "react-router-dom";
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";

function GlobalNewsForm() {
  const state = useSelector((store) => store.globalNews.arrGlobalNews);
  const params = useParams();
  const navigate = useNavigate();
  function findDataInGlobalArr(id) {
    return state?.filter((el) => el.id == id);
  }
  const defaultData = findDataInGlobalArr(params.id)[0];
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultData?.title);
  const [text, setText] = useState(defaultData?.text);
  const [link, setLink] = useState(defaultData?.link);
  const [check, setCheck] = useState(trueOrFalse(defaultData?.fixed) || false);
  const [idNews, setIdNews] = useState(defaultData?.id || 0);
  const globalNews = useSelector((store) => store);

  function count() {
    if (check == false) return setCheck(true)
    else return setCheck(false)
  }

  function trueOrFalse(a) {
    return a === "true" ? true : false;
  }

  function sagaGlobalData() {

    const obj = {
      title,
      text,
      link,
      check,
      idNews,
    };
    dispatch({ type: actiontTypes.ADD_GLOBAL_NEWS_SAGA, payload: obj });
  }

  function navigateToMain() {
    navigate("/GlobalNews");
  }

  useEffect(() => {
    dispatch(getAllGlobalNews());
  }, []);

  return (

    <div style={{maxWidth: '80%'}}>
    <Stack direction={'row'} spacing={3} textAlign={'center'} marginTop={'3vh'} maxWidth={'80%'} display={'flex'} flexDirection={'column'} >
    <Stack spacing={2} textAlign={'start'} marginLeft={'150px'} maxWidth={'100%'} >

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
      <Box paddingTop={''}  maxWidth={'80%'} >

      <Stack spacing={2} direction="column" textAlign={'start'} maxWidth={'80%'}   display={'flex'}>
      <Stack spacing={2} direction="column" marginLeft={'150px'} marginTop={'20px'}  maxWidth={'100%'}  >
           <label style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '50%'}} htmlFor="icon-button-file" >
                
                  <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              {/* <Box component="span">Выберите фото</Box> */}
              <input
               onChange={(e)=>setLink(e.target.files)}
                style={{display: 'none'}}
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
              />
              
                
                  <Button marginLeft={'20px'}  onClick={(e)=>{
                  
                    e.preventDefault()
                    sagaGlobalData()
                    navigateToMain()
                  }}  variant="contained"  width={'60px'} >Опубликовать новость</Button>
                  </label>
        </Stack>

      </Stack>

      </Box>
    </Stack>   
</div>
  );
}

export default GlobalNewsForm;
