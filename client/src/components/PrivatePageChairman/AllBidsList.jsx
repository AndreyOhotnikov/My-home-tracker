import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bidsSagaApi } from "../../store/actionCreators/bid";
import { servicesSagaApi } from "../../store/actionCreators/benefitServicesAC";
import { useNavigate } from "react-router-dom";

export const AllBidsList = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state.bids);
  console.log(store, "store");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bidsSagaApi());
  }, []);

  const submitHandler = (id) => {
    navigate(`/bid/${id}`);
  };

  return (
    <Box m={10}>
      {store?.map((bid) => {
        return (
          <List
            key={bid.id}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={bid["User.Userinfo.Photolinks.link"]}
                />
              </ListItemAvatar>
              <ListItemText
                onClick={() => submitHandler(bid.id)}
                primary={bid["User.Userinfo.full_name"]}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "flex" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Текст: {bid.text}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Статус: {bid.status}
                    </Typography>
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
