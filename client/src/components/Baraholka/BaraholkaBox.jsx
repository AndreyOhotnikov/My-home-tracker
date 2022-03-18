import React, { useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { allProductsView } from "../../store/actionCreators/baraholkaAC";

const BaraholkaBox = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((store) => store.baraholka.category);

  useEffect(() => {
    dispatch(allProductsView());
  }, []);

  const submitHandler = (id) => {
    navigate(`/baraholka/${id}`);
  };

  return (
    <Box className="benefit-services-main" m={5}>
      <Grid item>
      <Typography variant="h4" className="benefit-service-form__typography">
            Категории товаров
          </Typography>
          <Box className="benefit-services-main__card--wrapper">
            {allCategories?.map((category) => {
              return (
                <Card key={category.id} 
                className="benefit-services-main__card" >
                    <CardMedia
                    className="benefit-services-main__card--img"
                      component="img"
                      image={category.link}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography 
                      gutterBottom component="div" variant="h5">
                        {category.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="smal"
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

export default BaraholkaBox;

const useStyles = makeStyles({});
