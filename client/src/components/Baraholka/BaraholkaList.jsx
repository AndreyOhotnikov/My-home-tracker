import React from "react";
import { useDispatch } from "react-redux";
import ACTypes from "../../store/types/baraholkaTypes";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  ListItemAvatar,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BaraholkaList = () => {
  const navigate = useNavigate();
  const params = useParams();
  //console.log(params.id);

  // const dispatch = useDispatch()

  const category = useSelector((store) => store.baraholka.category);
  console.log(category);

  const productsList = category.filter((el) => el.id === Number(params.id));
  console.log(productsList);

  const prod = productsList.map((el) => el.products);
  console.log(prod);

  const submitHandler = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box m={10}>
      {prod[0]?.map((product) => {
        return (
          <List
            key={product.id}
            title={product.title}
            text={product.text}
            price={product.price}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                onClick={() => submitHandler(product.id)}
                primary={product.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {product.text}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
};

export default BaraholkaList;
