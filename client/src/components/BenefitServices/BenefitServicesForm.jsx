import "./BenefitServicesForm.scss";
import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { sagaAddService } from "../../store/actionCreators/benefitServicesAC";
import { useNavigate } from "react-router-dom";
import {  Typography } from "@mui/material";



export const BenefitServicesForm = () => {
  const services = useSelector((state) => state.services);

  const [service, setService] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let res;

  if (services.length) {
    res = services
      .map((el) => el.benifits)
      .reduce((a, b) => {
        return a.concat(b);
      });

    const a = res.filter((el) => el.category_id);
    
  }

  const formRef = useRef(null);
  const handleChange = (event) => {
    setService(event.target.value);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();

    const valuesOfForm = Object.fromEntries(
      new FormData(formRef.current, { service: service }).entries()
    );
    valuesOfForm["service"] = service;
    dispatch(sagaAddService(valuesOfForm));
    formRef.current.reset();
    setService("");
    navigate(`/services`); 
  };

  return (
    <>
      <Typography variant="h5" className="benefit-service-form__typography">
        Добавьте новую услугу
      </Typography>
      <form
        className="benefit-service-form"
        validate="true"
        autoComplete="off"
        ref={formRef}
        onSubmit={submitHandler}
      >
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2, width: "45ch" },
          }}
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
              placeholder="Название услуги"
            />
            <TextField
              id="standard-required"
              name="text"
              placeholder="Описание услуги"
            />
            <TextField
              id="standard-required"
              name="price"
              placeholder="Укажите стоимость"
            />
            <FormControl sx={{ m: 1, minWidth: 456 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Выберите категорию
              </InputLabel>
              <Select
                value={service}
                label="Выберите категорию"
                onChange={handleChange}
              >
                <MenuItem name="clining" value={"clining"}>
                  Клининг
                </MenuItem>
                <MenuItem name="dogWalking" value={"dogWalking"}>
                  Выгул собак
                </MenuItem>
                <MenuItem name="repair" value={"repair"}>
                  Ремонт,бытовые услуги
                </MenuItem>
                <MenuItem name="repair" value={"nanny"}>
                  Няня,сиделка,образование
                </MenuItem>
                <MenuItem name="beauty" value={"beauty"}>
                  Красота
                </MenuItem>
              </Select>
            </FormControl>
            <Box mt={3}>
              <Button variant="contained" type="submit">
                Опубликовать услугу
              </Button>
            </Box>
          </Grid>
        </Box>
      </form>
    </>
  );
};
