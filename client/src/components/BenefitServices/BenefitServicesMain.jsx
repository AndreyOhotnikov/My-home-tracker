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

// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   item: {
//     display: "flex",
//     justifyContent: "space-between;",
//     flexDirection: "row",
//   },
//   img: {
//     height: 300,
//     width: 300,
//   },
// });

export const BenefitServicesMain = () => {
  // const classes = useStyles();

  const category = useSelector((state) => state.services);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(servicesSagaApi());
  }, []);

  const submitHandler = (id) => {
    navigate(`/services/${id}`);
  };

  return (
    <Box 
    //className={classes}
    >
      <Grid container xl={8} direction="row">
        <Grid item>
          <Paper>Категории услуг</Paper>
          <Box m={10} 
          // className={classes.item}
          >
            {category.map((category) => {
              return (
                <Grid key={category.id} container direction="row">
                  <Card>
                    <CardMedia
                      // className={classes.img}
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
                </Grid>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
