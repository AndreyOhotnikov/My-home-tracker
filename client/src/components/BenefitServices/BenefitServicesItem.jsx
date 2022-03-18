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
import { CircularProgress, Typography } from "@mui/material";

export const BenefitServicesItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const auth = useSelector((state) => state.auth.auth);
  

  const services = useSelector((state) => state.services);
 

  if (services.length === 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  const store = services
    ?.map((el) => el.benifits)
    ?.reduce((a, b) => {
      return a.concat(b);
    });

  const servise = store.filter((el) => el.id === Number(params.id) && el);

  const showContactHandler = () => {
    setShowContact(true);
  };
  setTimeout(showContactHandler,2000)

  const handleCloseshowCont = () => {
    if (showContact === true)
    setShowContact(false);
  };

  const delHandler = (e) => {
    e.preventDefault();
    dispatch(delSagaService(Number(params.id)));
    navigate("/services");
  };

  return (
    <>
      <Typography variant="h5" className="benefit-service-form__typography">
        Подробнее о услуге
      </Typography>
      <Box className="benefit-service-item">
        {servise?.map((serv) => {
          return (
            <List key={serv.id} className="benefit-services-item__list">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={serv["User.Userinfo.link"]} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ display: "flex", mb: "10px" }}
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      {serv["User.nick_name"]}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "flex", mb: "10px" }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        Название услуги: {serv.title}
                      </Typography>
                      <Typography
                        sx={{ display: "flex", mb: "10px" }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        Описание: {serv.text}
                      </Typography>
                      <Typography
                        sx={{ display: "flex" }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        Стоимость :{serv.price}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Box className="benefit-service-item__button" mt={4}>
                <Button
                  variant="contained"
                  onClick={showContactHandler}
                  onClose={handleCloseshowCont}
                >
                  Связаться
                </Button>
                {auth.user_id === serv.user_id && (
                  <Button variant="contained" onClick={delHandler}>
                    Удалить
                  </Button>
                )}
              </Box>
              {showContact && (
                <>
                  <ListItem className="benefit-services-item__list">
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "flex", mb: "10px" }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                          >
                            Телефон: {serv["User.Userinfo.phone"]}
                          </Typography>
                          <Typography
                            sx={{ display: "flex", mb: "10px" }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                          >
                            Email : {serv["User.email"]}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </>
              )}
            </List>
          );
        })}
      </Box>
    </>
  );
};
