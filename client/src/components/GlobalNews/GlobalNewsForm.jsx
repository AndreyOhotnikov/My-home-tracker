import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { actiontTypes } from "../../store/types/globalTypes";
import { Link, Stack, Typography } from "@mui/material";
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
    if (check == false) return setCheck(true);
    else return setCheck(false);
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
    <>
      <Typography variant="h5" className="benefit-service-form__typography">
        Добавьте главную новость
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
            <Button
              className="local-news-form__button"
              ml={"40px"}
              onClick={(e) => {
                e.preventDefault();
                sagaGlobalData();
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

export default GlobalNewsForm;
