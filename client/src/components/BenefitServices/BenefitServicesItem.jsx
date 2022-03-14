import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";


export const BenefitServicesItem = () => {
  const params = useParams();
  console.log(params);

  const services = useSelector((state) => state.services);
  const service = services.map((el) => el.benifits)
  .reduce((a, b) => {
    return a.concat(b);
  });
  
  const a = service.filter((el) => el.id === Number(params.id) && el);
  console.log(a, "aaaaa");


  return (
    
    <Box>
      {a?.map((serv)=>{
        
        return(
      <List key={serv.id} >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp"  src={serv['User.Userinfo.Photolinks.link']} />
      </ListItemAvatar>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> {serv['User.nick_name']}  </ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> Название услуги: {serv.title} </ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> Описание: {serv.text} </ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText>Стоимость (*указано за час ) :{serv.price}</ListItemText>
      </ListItem>
      <Box mt={4}>
         
        <Button variant="contained">Связаться</Button> 
        <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> Имя: {serv['User.Userinfo.full_name']} </ListItemText>
      </ListItem>
        <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText> Телефон: {serv['User.Userinfo.phone']} </ListItemText>
      </ListItem>
      <ListItem variant="body2" color="textSecondary" component="p">
        <ListItemText>Email : {serv['User.email']}</ListItemText>
      </ListItem>
        {/* <Button variant="contained">Редактировать</Button>
        <Button variant="contained">Удалить</Button> */}
      </Box>
      </List>
        )
      })}
    </Box>
  );
};
