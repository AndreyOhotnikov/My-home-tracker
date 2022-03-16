import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Box, Input, MenuItem, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import ACTypes from "../../store/types/baraholkaTypes";

const currencies = [
  {
    id: 1,
    value: "Без категории",
  },
  {
    id: 2,
    value: "Мебель",
  },
  {
    id: 3,
    value: "Игрушки",
  },
  {
    id: 4,
    value: "Техника",
  },
  {
    id: 5,
    value: "Одежда",
  },
  {
    id: 6,
    value: "Прочее",
  },
];

const BaraholkaForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState({ title: "" });
  const [text, setText] = useState({ text: "" });
  const [category, setCategory] = useState({ category: "" });
  const [price, setPrice] = useState({ price: "" });
  const [link, setLink] = useState({ value: "" });

  let categoryId;

  const addProduct = async (event) => {
    event.preventDefault();
    currencies.forEach((el) => {
      if (el.value === category) categoryId = el.id;
    });
    dispatch({
      type: ACTypes.ADD_PROD_SAGA,
      product: { title, text, category, price, link, categoryId },
    });
    navigate(`/baraholka`)
    // console.log(product);
  };

  return (
    <Box component="form" className={classes.mainForm}>
      <TextField
        onChange={(event) => setTitle(event.target.value)}
        id="outlined-basic"
        label="Название товара"
        variant="outlined"
        sx={{ mt: "20px" }}
      />
      <TextField
        onChange={(event) => setText(event.target.value)}
        id="outlined-basic"
        label="Описание товара"
        variant="outlined"
        sx={{ mt: "20px" }}
      />

      <TextField
        sx={{ mt: "20px" }}
        id="outlined-select-currency"
        select
        label="Выберите категорию"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        onChange={(event) => setPrice(event.target.value)}
        id="outlined-basic"
        label="Цена"
        variant="outlined"
        sx={{ mt: "20px" }}
      />

      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
        <Box component="span">Выберите фото</Box>
        <Input
          onChange={(event) => setLink(event.target.value)}
          sx={{ display: "none" }}
          accept="image/*"
          id="icon-button-file"
          type="file"
        />
      </label>

      <Button
        type="submit"
        onClick={(event) => addProduct(event)}
        variant="outlined"
        className={classes.lastButton}
        sx={{ mt: "20px", ml: "40%" }}
      >
        Опубликовать
      </Button>
    </Box>
  );
};

export default BaraholkaForm;

const useStyles = makeStyles({
  mainForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "20%",
    marginTop: "10%",
    width: "60%",
  },
  lastButton: {
    width: "20%",
  },
});
