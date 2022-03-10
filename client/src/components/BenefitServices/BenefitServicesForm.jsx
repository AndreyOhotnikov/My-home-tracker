import React, { useEffect, useRef } from "react";
// import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: 'red',
//     color: (props) => props.color,
//   },
// });

export const BenefitServicesForm = () => {
  // const classes = useStyles();
  
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "45ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField id="standard-required" placeholder="Название услуги" />
        <TextField id="standard-required" placeholder="Описание услуги" />
        <TextField id="standard-required" placeholder="Укажите стоимость" />
      </Grid>
      <Box mt={4}>
        <Button variant="contained">Опубликовать услугу</Button>
      </Box>
    </Box>
  );
};
