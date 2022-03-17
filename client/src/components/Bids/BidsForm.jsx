import React, { useRef } from "react";
import Box from "@mui/material/Box";
import { Button, Input, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useNavigate, useParams } from "react-router-dom";
import { sagaAddBid } from "../../store/actionCreators/bid";

export const BidForm = () => {
  const [status, setStatus] = useState("");
  const [link, setLink] = useState({ value: "" });

  const chairman = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params.id, "paramsId");
  const navigate = useNavigate();

  const formRef = useRef(null);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  console.log(status, "sss");

  const submitHandler = (event) => {
    event.preventDefault();
    const valuesOfForm = Object.fromEntries(
      new FormData(formRef.current, { status: status }).entries()
    );
    valuesOfForm["status"] = status;
    console.log(valuesOfForm, "valuesOfForm");
    dispatch(sagaAddBid(valuesOfForm));
    formRef.current.reset();
    setStatus("");
    // navigate((`/services`)); //нужно сделать навигейт на категорию список
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 2, width: "45ch" },
      }}
    >
      <form
        validate="true"
        autoComplete="off"
        ref={formRef}
        onSubmit={submitHandler}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            id="standard-required"
            name="title"
            placeholder="Название заявки"
          />
          <TextField
            id="standard-required"
            name="text"
            placeholder="Описание заявки"
          />
          {chairman.role == "chairman" && (
            <FormControl sx={{ m: 1, minWidth: 460 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Статус заявки
              </InputLabel>
              <Select
                value={status}
                label="Статус заявки"
                onChange={handleChange}
              >
                <MenuItem name="actualno" value={"actualno"}>
                  Актуально
                </MenuItem>
                <MenuItem name="neactualno" value={"neactualno"}>
                  Неактуально
                </MenuItem>
              </Select>
            </FormControl>
          )}

          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            <Box component="span">Выберите фото</Box>
            <input
              onChange={(event) => setLink(event.target.value)}
              name="link"
              style={{display: 'none'}}
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple
            />
          </label>
        </Grid>
        <Box mt={4}>
          <Button variant="contained" type="submit">
            Оформить заявку
          </Button>
        </Box>
      </form>
    </Box>
  );
};
