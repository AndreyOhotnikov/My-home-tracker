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
import {  useNavigate, useParams } from "react-router-dom";
import { delSagaService } from "../../store/actionCreators/benefitServicesAC";

export const BidsItem = () => {
  const params = useParams();
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  const bids = useSelector((state) => state.bids);
  console.log(bids,'bids'); 

  const delHandler=()=>{
      // dispatch(delSagaBid(Number(params.id)))
      navigate(('/bids')); //нужно сделать навигейт на категорию список
  }
  return (
    <Box>
      {bids?.map((bid) => {
        return (
          <List key={bid.id}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={bid["User.Userinfo.Photolinks.link"]}
              />
            </ListItemAvatar>
            <ListItem variant="body2" color="textSecondary" component="p">
              <ListItemText> Имя: {bid["User.Userinfo.full_name"]} </ListItemText>
            </ListItem>
            
            <ListItem variant="body2" color="textSecondary" component="p">
              <ListItemText> Описание заявки: {bid.text} </ListItemText>
            </ListItem>
            <ListItem variant="body2" color="textSecondary" component="p">
              <ListItemText> Номер заявки: {bid.id} </ListItemText>
            </ListItem>
            <ListItem variant="body2" color="textSecondary" component="p">
              <ListItemText> Статус: {bid.status} </ListItemText>
            </ListItem>
            {/* <ListItem variant="body2" color="textSecondary" component="p">
              <ListItemText> Дата создания: {bid.createdAt} </ListItemText>
            </ListItem> */}
            
            <Box mt={4}>
          
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>
                      Телефон: {bid["User.Userinfo.phone"]}{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem variant="body2" color="textSecondary" component="p">
                    <ListItemText>Email : {bid["User.email"]}</ListItemText>
                  </ListItem>

              <Button variant="contained">Редактировать</Button> 
        <Button variant="contained" onClick={delHandler}>Удалить</Button> 
            </Box>
          </List>
        );
      })}
    </Box>
  );
};
