import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  sagaAddService
} from "../../store/actionCreators/benefitServicesAC";
import {  useNavigate, useParams } from "react-router-dom";

export const BenefitServicesList = () => {
  const navigate = useNavigate();
  const params = useParams();
  

  const category = useSelector((state) => state.services);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sagaAddService());
  
  }, []);
  //console.log(category)
  const benefits = category
    .map((el) => el.benifits)
    .reduce((a, b) => {
      return a.concat(b);
    });
    

  const a = benefits.filter((el) => el.category_id === Number(params.id) && el);


  const submitHandler = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <Box m={10}>
      {a?.map((ben) => {
        return (
          <List
            key={ben.id}
            title={ben.title}
            text={ben.text}
            price={ben.price}
            userNic={ben.user_nick_name}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ben['User.Userinfo.Photolinks.link']}  />
                {ben.user_nick_name}
              </ListItemAvatar>
              <ListItemText
                onClick={() => submitHandler(ben.id)}
                primary={ben.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {ben.text}
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
