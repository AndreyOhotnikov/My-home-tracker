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
// import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { usersSagaApi } from "../../store/actionCreators/bid";
import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
//   item: {
//     display: "flex",
//     justifyContent: "space-between;",
//     alignItems: "stretch",
//   },
// });

export const AllUsersList = () => {
  const navigate = useNavigate();
  // const classes = useStyles();
  const store = useSelector((state) => state.user);
console.log(store)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersSagaApi());
  }, []);

  // const submitHandler = (id) => {
  //   navigate(`/users/${id}`);
  // };

  return (
    <Box m={3} >
      {store?.map((user) => {
        return (
          <List
            key={user.id}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={user["Userinfo.Photolinks.link"]}
                />
              </ListItemAvatar>
              <ListItemText
                // onClick={() => submitHandler(user.id)}
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
  );
};
