import React, { useState, useEffect  } from "react";
import { useDispatch } from "react-redux";
import ACTypes from "../../store/types/baraholkaTypes";
import { delProductSaga } from "../../store/actionCreators/baraholkaAC";
import { useNavigate } from "react-router-dom";
import { allProductsView } from "../../store/actionCreators/baraholkaAC";
import { types } from "../../store/types/userTypes";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  CardMedia,
  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BaraholkaItem = () => {
  const params = useParams();
  //console.log(params);
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.auth);
  const category = useSelector((store) => store.baraholka.category);
  //console.log(category);
  let productsList, prList
  if (category.length) {
       prList = category
      .map((el) => el.products)
      .reduce((a, b) => {
      return a.concat(b);
    });
    console.log(prList);

    productsList = prList.filter((el) => el.id === Number(params.id));
  } 


  useEffect(() => {
    dispatch(allProductsView());
    if(!auth) dispatch({ type: types.CHECK_IS_AUTH_SAGA });
  }, []);


  // const prList = category?
  //   .map((el) => el.products)
  //   .reduce((a, b) => {
  //     return a.concat(b);
  //   });
  // console.log(prList);




  //console.log(productsList);
  const showContactHandler = () => {
    setShowContact(true);
  };

  const deleteProduct = (id) => {
    console.log("component", id);
    dispatch({ type: ACTypes.DEL_PRODUCT_SAGA, id });
    navigate("/baraholka");
    //delProductSaga(Number(params.id)
  };
  return (
    <Box>
      {productsList?.map((prodItem) => {
        return (
          <List key={prodItem.id}>
            <ListItem sx={{ width: "50%", height: "40%" }}>
              <CardMedia component="img" image={prodItem.status} />
            </ListItem>
            <ListItem variant="body2" color="textSecondary">
              <ListItemText>{prodItem.title}</ListItemText>
            </ListItem>
            <ListItem variant="body2" color="textSecondary">
              <ListItemText>Описание: {prodItem.text}</ListItemText>
            </ListItem>
            <ListItem variant="body2" color="textSecondary">
              <ListItemText>Цена: {prodItem.price} </ListItemText>
            </ListItem>
            <Box mt={4}>
              <Button variant="contained " onClick={showContactHandler}>
                Связаться
              </Button>
              {showContact && (
                <>
                  <ListItem variant="body2" color="textSecondary" component="p">
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
            </Box>
           {auth.user_id === prodItem.user_id && <Button
              variant="outlined"
              color="error"
              onClick={() => deleteProduct(prodItem.id)}
            >
              Удалить
            </Button>}
          </List>
        );
      })}
    </Box>
  );
};

export default BaraholkaItem;
