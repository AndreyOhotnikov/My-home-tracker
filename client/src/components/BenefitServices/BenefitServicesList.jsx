import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ImageListItem } from "@mui/material";
import { BenefitServicesItem } from "./BenefitServicesItem";
import {
  categorySagaApi,
  servicesSagaApi,
} from "../../store/actionCreators/benefitServicesAC";
import { useParams } from "react-router-dom";

export const BenefitServicesList = () => {
  const params = useParams();
  console.log(params);

  const category = useSelector((state) => state.services);
  console.log(category);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(servicesSagaApi());
  // }, []);

  const benefits = category
    .map((el) => el.benifits)
    .reduce((a, b) => {
      return a.concat(b);
    });

  const a = benefits.filter((el) => el.category_id === Number(params.id) && el);
  console.log(a, "aaaaa");

  console.log(benefits, "kjhgfd");

  //   const reduce = benefits.reduce((acc,el) => acc + el.text + el.price + el.user_id + el.title,0);
  // console.log(reduce,'reduce');

  return (
    <Box>
      <Grid container direction="column">
        <Grid item>
          <Paper></Paper>
          <Box m={10}>
            {
              a?.map((ben) => {
                return (
                  <ListItem key={ben.id}>
                    {ben.user_id} {ben.text} {ben.price}
                  </ListItem>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
