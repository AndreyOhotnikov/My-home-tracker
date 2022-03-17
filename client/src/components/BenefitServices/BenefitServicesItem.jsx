import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { delSagaService } from "../../store/actionCreators/benefitServicesAC";


export const BenefitServicesItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const services = useSelector((state) => state.services);
  const store = services?.map((el) => el.benifits)?.reduce((a, b) => {
      return a.concat(b);
    });

  const servise = store.filter((el) => el.id === Number(params.id) && el);

  const showContactHandler = () => {
    setShowContact(true);
  };

  const delHandler = (e) => {
    e.preventDefault();
    dispatch(delSagaService(Number(params.id)));
    navigate("/services"); //нужно сделать навигейт на категорию список
  };

  return (
    <Box display="flex">
      {servise?.map((serv) => {
        return (
          <List key={serv.id}  sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItemAvatar>
              <Avatar
                src={serv["User.Userinfo.Photolinks.link"]}
              />
            </ListItemAvatar>
            <ListItem alignItems="flex-start" variant="body2" color="textSecondary" component="p">
              <ListItemText> {serv["User.nick_name"]} </ListItemText>
            </ListItem>
            <ListItem alignItems="flex-start" variant="body2" color="textSecondary" component="p">
              <ListItemText alignItems="flex-start"> Название услуги: {serv.title} </ListItemText>
            </ListItem>
            <ListItem alignItems="flex-start" variant="body2" color="textSecondary" component="p">
              <ListItemText alignItems="flex-start"> Описание: {serv.text} </ListItemText>
            </ListItem>
            <ListItem alignItems="flex-start" variant="body2" color="textSecondary" component="p">
              <ListItemText alignItems="flex-start">
                Стоимость (*указано за час ) :{serv.price}
              </ListItemText>
            </ListItem >
            <Box mt={4}>
              <Button variant="contained" onClick={showContactHandler}>
                Связаться
              </Button>
              {showContact && (
                <>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>
                      Имя: {serv["User.Userinfo.full_name"]}{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>
                      {" "}
                      Телефон: {serv["User.Userinfo.phone"]}{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>Email : {serv["User.email"]}</ListItemText>
                  </ListItem>
                </>
              )}
              {/* <Button variant="contained">Редактировать</Button> */}
              <Button variant="contained" onClick={delHandler}>
                Удалить
              </Button>
            </Box>
          </List>
        );
      })}
    </Box>
  );
};
