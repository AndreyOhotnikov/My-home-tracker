import "./Baraholka.scss";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ACTypes from "../../store/types/baraholkaTypes";
import { useNavigate } from "react-router-dom";
import { allProductsView } from "../../store/actionCreators/baraholkaAC";
import { types } from "../../store/types/userTypes";
import {
  Box,  List,  ListItem,  ListItemText,  Typography,
  Button,  CardMedia,  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BaraholkaItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.auth);
  const category = useSelector((store) => store.baraholka.category);
  let productsList, prList;
  useEffect(() => {
    dispatch(allProductsView());
    if (!auth) dispatch({ type: types.CHECK_IS_AUTH_SAGA });
  }, []);
  if (category.length) {
    prList = category
      .map((el) => el.products)
      .reduce((a, b) => {
        return a.concat(b);
      });

    productsList = prList.filter((el) => el.id === Number(params.id));
  }

  const showContactHandler = () => {
    setShowContact(true);
  };

  const deleteProduct = (id) => {
    dispatch({ type: ACTypes.DEL_PRODUCT_SAGA, id });
    navigate("/baraholka");
  };
  return (
    <>
      <Typography component="span" variant="h5" className="benefit-service-form__typography">
        Подробнее о товаре
      </Typography>
      <Box className="benefit-service-item">
        {productsList?.map((prodItem) => {
          return (
            <List key={prodItem.id} className="benefit-services-item__list">
              <ListItem alignItems="flex-start">
                <Card className="benefit-services-main__card">
                  <CardMedia component="img" image={prodItem.status} />
                </Card>
              </ListItem>
              <ListItem variant="body2" color="textSecondary">
                <ListItemText>Название товара:{prodItem.title}</ListItemText>
              </ListItem>
              <ListItem variant="body2" color="textSecondary">
                <ListItemText>Описание: {prodItem.text}</ListItemText>
              </ListItem>
              <ListItem variant="body2" color="textSecondary">
                <ListItemText>Стоимость: {prodItem.price} </ListItemText>
              </ListItem>
              <Box className="benefit-service-item__button" mt={4}>
              <Button
                  variant="contained"
                  onClick={showContactHandler}
                >
                  Связаться
                </Button>
                {auth.user_id === prodItem.user_id && (
                  <Button
                    variant="contained"
                    onClick={() => deleteProduct(prodItem.id)}
                  >
                    Удалить
                  </Button>
                )}
              </Box>
              {showContact && (
                <>
                  <ListItem
                    className="baraholka-item__list"
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <ListItemText>
                      Имя: {prodItem["User.Userinfo.full_name"]}{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>
                      {" "}
                      Телефон: {prodItem["User.Userinfo.phone"]}{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>
                      Email : {prodItem["User.email"]}
                    </ListItemText>
                  </ListItem>
                </>
              )}
            </List>
          );
        })}
      </Box>
    </>
  );
};

export default BaraholkaItem;
