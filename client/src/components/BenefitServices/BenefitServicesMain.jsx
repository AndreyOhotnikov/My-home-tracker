import "./BenefitServicesForm.scss";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { servicesSagaApi } from "../../store/actionCreators/benefitServicesAC";


export const BenefitServicesMain = () => {

  const category = useSelector((state) => state.services);
  const navigate = useNavigate();

  const submitHandler = (id) => {
    console.log("submitHandler");
    navigate(`/services/${id}`);
  };

  return (
    <Box className="benefit-services-main" m={5}>
      <Grid item>
        <Paper>
          <Typography variant="h4" className="benefit-service-form__typography">
            Категории услуг
          </Typography>
        </Paper>
        <Box className="benefit-services-main__card--wrapper">
          {category?.map((category) => {
            return (
              <Card key={category.id} className="benefit-services-main__card">
                <CardMedia
                  component="img"
                  image={category.link}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    type="button"
                    onClick={() => submitHandler(category.id)}
                  >
                    Подробнее
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Grid>
    </Box>
  );
};
