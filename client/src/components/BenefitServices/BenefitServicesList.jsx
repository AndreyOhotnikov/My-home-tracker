import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BenefitServicesItem } from "./BenefitServicesItem";

export const BenefitServicesList = () => {
  // const services = useSelector((state) => state.services);
  // console.log(services, "services");
  const categories=useSelector((state)=>state.category)
  console.log(categories);
  const dispatch = useDispatch();
  return (
    <Box>
      <Grid  container xs={8} direction="column" >
        <Grid item>
          <Paper>Все услуги</Paper>
          <Box m={10}>
            <Grid item container spacing={2} direction="column">
              {categories.map((category) => (
                <ListItem key={category.id}  > {category.title} {category.photo}</ListItem>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
