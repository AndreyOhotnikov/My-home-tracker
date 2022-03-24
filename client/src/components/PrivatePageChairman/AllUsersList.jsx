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
import { usersSagaApi } from "../../store/actionCreators/bid";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AllUsersList = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => dispatch(usersSagaApi()), []);

  if (store.length === 0) {
    return (
      <div>
        <div style={{ paddingTop: "130px", paddingLeft: "80px" }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5" className="private-page-chairman__typography">
        Список всех пользователей
      </Typography>
      <Box className="private-page-chairman-list">
        {store?.map((user) => {
          return (
            <List
              className="private-page-chairman-list__list"
              key={user.id}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={user["Userinfo.link"]} />
                </ListItemAvatar>
                <ListItemText
                  primary={user["Userinfo.full_name"]}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.secondary">
                        Телефон: {user["Userinfo.phone"]}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Email : {user["email"]}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Адрес : {user["Userinfo.adress"]}
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
