import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const BenefitServicesList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const category = useSelector((state) => state.services);


  if (category.length === 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const benefits = category
    ?.map((el) => el?.benifits)
    .reduce((a, b) => {
      return a.concat(b);
    });
  const list = benefits?.filter(
    (el) => el.category_id === Number(params.id) && el
  );
  const submitHandler = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <>
    <Typography  component="span" variant="h5" className="benefit-service-form__typography">
        Выберите услугу
      </Typography>
      <Box className="benefit-services-list">
        {list?.map((ben) => {
          return (
            <List
              key={ben.id}
              className="benefit-services-list__list"
            >
              <ListItem
                alignItems="flex-start"
                
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={ben["User.Userinfo.link"]}
                  />
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
                      >
                        {ben.text}
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
