import "./PrivatePageChairman.scss"
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
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AllBidsList = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state.bids);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bidsSagaApi());
  }, []);

  if (store.length === 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const submitHandler = (id) => {
    navigate(`/bid/${id}`);
  };

  return (
    <>
      <Typography variant="h5" className="private-page-chairman-form__typography">
        {" "}
        Список всех заявок
      </Typography>
      <Box className="private-page-chairman-list">
        {store?.map((bid) => {
          return (
            <List
              className="private-page-chairman-list__list"
              key={bid.id}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={bid["User.Userinfo.link"]} />
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
                        Название: {bid.title}
                      </Typography>
                      <Typography
                        sx={{ display: "flex" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Описание: {bid.text}
                      </Typography>
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
