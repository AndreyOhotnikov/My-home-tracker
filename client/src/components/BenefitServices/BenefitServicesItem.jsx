import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export const BenefitServicesItem = () => {
  const services = useSelector((state) => state.services);
  // console.log(services[0].title);
  // const imgUser = services.find((el) => el.id === userId).avatar;
  return (
    <Box>
      {/* <CardActionArea>
        <CardMedia image={imgUser} title="Contemplative Reptile" />
      </CardActionArea> */}
      {/* <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText  > Название услуги: {services[0].title}</ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> Описание: {services[0].text}</ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText>
          Стоимость (*указано за час ) : {services[0].price}
        </ListItemText>
      </ListItem>
      <Box mt={4}>
        <Button variant="contained">Связаться</Button>
      </Box> */}
    </Box>
  );
};
