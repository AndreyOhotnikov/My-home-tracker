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
    <Box>
      <Grid container>
        <Grid item>
          <Box>
            {allCategories?.map((category) => {
              return (
                <Grid key={category.id} item container xs={8}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={category.link}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography component="div" variant="h5">
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
                </Grid>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BaraholkaBox;

const useStyles = makeStyles({});
