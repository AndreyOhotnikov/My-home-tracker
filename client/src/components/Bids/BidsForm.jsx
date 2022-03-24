import React, { useRef } from "react";
import {Box, Button, InputLabel, TextField, Grid, MenuItem, FormControl, Select,IconButton} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { sagaAddBid } from "../../store/actionCreators/bid";

export const BidForm = () => {
  const [status, setStatus] = useState("");
  const [link, setLink] = useState({ value: "" });

  const chairman = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
    const valuesOfForm = Object.fromEntries(
      new FormData(formRef.current, { status: status }).entries()
    );

    valuesOfForm["status"] = status;
    dispatch(sagaAddBid(valuesOfForm));
    formRef.current.reset();
    setStatus("");
    navigate((`/bids`)); 
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
