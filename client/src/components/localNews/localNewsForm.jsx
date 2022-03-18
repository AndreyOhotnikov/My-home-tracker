import "./Style.scss";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { localTypes } from "../../store/types/localTypes";
import { Link, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PhotoCamera from "@mui/icons-material/PhotoCamera";


import { Input } from "@mui/material";
import { Provider, useDispatch, useSelector } from "react-redux";

import { addGlobalNews } from "../../store/actionCreators/globalNewsAC";
import { useParams, useNavigate } from "react-router-dom";
import { getAllLocalNews } from "../../store/actionCreators/localNewsAC";

function LocalNewsForm() {
  const stateLocal = useSelector((store) => store.localReducer.arrLocalNews);
  const params = useParams();
  const navigate = useNavigate();
  function findDataInLocalArr(id) {
    return stateLocal?.filter((el) => el.id === Number(id));
  }
  const defaultData = findDataInLocalArr(params.id)[0];
  const dispatch = useDispatch();

  const [title, setTitle] = useState(defaultData?.title);
  const [text, setText] = useState(defaultData?.text);
  const [link, setLink] = useState(defaultData?.link);
  const [check, setCheck] = useState(trueOrFalse(defaultData?.fixed) || false);
  const [idNews, setIdNews] = useState(defaultData?.id || 0);

  function count() {
    if (check == false) return setCheck(true);
    else return setCheck(false);
  }

  function trueOrFalse(a) {
    return a === "true" ? true : false;
  }

  function sagaLocalData() {
    const obj = {
      title,
      text,
      link,
      check,
      idNews,
    };
    dispatch({ type: localTypes.ADD_LOCAL_NEWS_SAGA, payload: obj });
  }

  function navigateToMain() {
    navigate("/localnews");
  }


  useEffect(() => {
    dispatch(getAllLocalNews());
  }, []);

  return (
    <>
      <Typography variant="h5" className="benefit-service-form__typography">
        Добавьте новое событие
      </Typography>

      <div className="local-news-form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "50%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
            id="1"
            label="Введите заголовок"
            defaultValue={defaultData?.title}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: "20px", width: "50%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(event) => {
              setText(event.target.value);
            }}
            required
            id="1"
            label="Введите текст"
            defaultValue={defaultData?.text}
            multiline
            rows={10}
          />
        </Box>
        <Box
          style={{
            margin: "50px auto",
            width: "700px",
          }}
        >
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <input
                onChange={(e) => setLink(e.target.files)}
                style={{ display: "none" }}
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
              />

              <PhotoCamera />
            </IconButton>
            {/* <Box component="span">Выберите фото</Box> */}

            <Button
              className="local-news-form__button"
              ml={"40px"}
              onClick={(e) => {
                e.preventDefault();
                sagaLocalData();
                navigateToMain();
              }}
              variant="contained"
            >
              Опубликовать новость
            </Button>
          </label>
        </Box>
      </div>
    </>
  );
}

export default LocalNewsForm;

//                   <Button marginLeft={'20px'}  onClick={(e)=>{
//                     e.preventDefault()
//                     sagaLocalData()
//                     navigateToMain()
//                   }}  variant="contained"  width={'60px'} >Опубликовать новость</Button>
//                   </label>
//         </Stack>

//       </Stack>

//       </Box>
//     </Stack>   
// </div>

//    )
//  }



// export default LocalNewsForm

