import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { ListItemAvatar, CardMedia, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { delSagaBid } from "../../store/actionCreators/bid";

// const useStyles = makeStyles({
//   root: {
//     width: 450,
//     height: 470,
//     marginBottom: 40,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   media: {
//     height: 180,
//   },
//   pos: {
//     margin: 0,
//   },
// });

export const BidsItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const classes = useStyles();

  const store = useSelector((state) => state.bids);
  console.log(store, "bids");

  const delHandler = () => {
    dispatch(delSagaBid(Number(params.id)));
    navigate("/bids"); //нужно сделать навигейт на категорию список
  };
  const bids = store.filter((el) => el.id === Number(params.id) && el);



  return (
    <Box >
      {bids?.map((bid) => {
        return (
          <List key={bid.id}  >
            <CardHeader
              avatar={<Avatar src={bid["User.Userinfo.Photolinks.link"]} />}
              title={bid["User.Userinfo.full_name"]}
              subheader={dayjs(bid.createdAt).format("DD.MM.YYYY HH:MM")}
            />
            {/* { (bid["Bids.Userinfo.Photolinks.link"]) && ( */}
              <CardMedia 
                component="img"
                height="300"
                image={bid["Bids.Userinfo.Photolinks.link"]}
              />

            {/* )} */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Описание заявки: {bid.text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Номер заявки: {bid.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Подьезд: {bid["User.Userinfo.entrance"]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Квартира:{bid["User.Userinfo.flat"]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Статус: {bid.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Телефон: {bid["User.Userinfo.phone"]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email : {bid["User.email"]}
              </Typography>
            </CardContent>

            {/* <Button variant="contained">Редактировать</Button> */}
            <Button variant="contained" onClick={delHandler}>
              Удалить
            </Button>
          </List>
        );
      })}
    </Box>
  );
};
