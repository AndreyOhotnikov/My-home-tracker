import "./BenefitServicesForm.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import {Box, CardMedia, Grid,CardActions, Card, CardContent,Button, Typography      } from "@mui/material";
import {  useSelector } from "react-redux";

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
          <Typography variant="h4" className="benefit-service-form__typography">
            Категории услуг
          </Typography>
        <Box className="benefit-services-main__card--wrapper">
          {category?.map((category) => {
            return (
              <Card key={category.id} className="benefit-services-main__card">
                <CardMedia
                  component="img"
                  image={category.link}
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
