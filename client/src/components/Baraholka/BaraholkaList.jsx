import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ACTypes from "../../store/types/baraholkaTypes";
import { allProductsView } from "../../store/actionCreators/baraholkaAC";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  CardMedia,
  Card,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BaraholkaList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(params.id);

  useEffect(() => {
    dispatch(allProductsView());
  }, []);

  const category = useSelector((store) => store.baraholka.category);

  const productsList = category.filter((el) => el.id === Number(params.id));
  //console.log(productsList);

  const prod = productsList.map((el) => el.products);
  //console.log("prod", prod);

  const submitHandler = (id) => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    dispatch(allProductsView());
  }, []);

  return (
    <>
      <Typography
        component="span"
        variant="h5"
        className="benefit-service-form__typography"
      >
        Выберите товар
      </Typography>
      <Box className="benefit-services-list">
        {prod[0]?.map((product) => {
          return (
            <List key={product.id} className="benefit-services-list__list">
              <ListItem alignItems="flex-start">
                <CardMedia
                  className="benefit-services-main__card"
                  sx={{ width: "30%" }}
                  component="img"
                  image={product.status}
                />

                <ListItemText
                  sx={{ marginLeft: "5%" }}
                  component="h3"
                  onClick={() => submitHandler(product.id)}
                  primary={product.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", fontSize: 15 }}
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
    </>
  );
};

export default BaraholkaList;
