import React from "react";
import "../BenefitServices/BenefitServicesForm.scss";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  Link,
  Stack,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import GlobalNewsItem from "./GlobalNewItem";

import { Route, Routes } from "react-router-dom";
import GlobalNewsForm from "./GlobalNewsForm";
import { useSelector, useDispatch } from "react-redux";
import GlobalNewsId from "./GlobalNewsId";
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";
import { useNavigate } from "react-router-dom";
import { addLikeSaga } from "../../store/actionCreators/globalNewsAC";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { color } from "@mui/system";
import { types } from "../../store/types/userTypes";

function GlobalNewsList() {
  const state = useSelector((store) => store.globalNews.arrGlobalNews);
  const auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();
  // console.log(state,'=>>>>>>>>>>>>>>>>>>>>>')
  useEffect(() => {
    // console.log("ДОЛЖЕН СРАБАТЫВАТЬ ТОЛЬКО ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ");
    if (!auth) dispatch({ type: types.CHECK_IS_AUTH_SAGA });
  }, []);
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [id, setId] = useState(0);
  function changeLike(id) {
    dispatch(addLikeSaga(id));
  }

  function statusView() {
    if (view) {
      setView(false);
    } else setView(true);
  }

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));
  function seeItem(id) {
    navigate(`/global/${id}`);
  }

  useEffect(() => {
    dispatch(getAllGlobalNews());
  }, []);

  function isFixed(el) {
    if (el.fixed === "true") {
      return true;
    }
  }
  const goodDate = (str = "") => {
    const timeSec = str.slice(-10, -8);
    let timeHour = +str.slice(-13, -11);
    const year = str.slice(0, 4);
    const day = str.slice(8, 10);
    const month = str.slice(5, 7);
    const monthObj = {
      "01": "января",
      "02": "февраля",
      "03": "марта",
      "04": "апреля",
      "05": "мая",
      "06": "июня",
      "07": "июля",
      "08": "августа",
      "09": "сентября",
      10: "октября",
      11: "ноября",
      12: "декабря",
    };
    if (timeHour >= "21" && timeHour <= "24") {
      timeHour = Math.abs(21 - timeHour);
    } else {
      timeHour = timeHour + 3;
    }
    return `${day} ${monthObj[month]} ${year} г., ${timeHour}:${timeSec}`;
  };

  return (
    <Box className="benefit-services-main" m={5}>
      <Grid item>
        <Typography variant="h4" className="benefit-service-form__typography">
          Главные новости
        </Typography>
        <Box className="benefit-services-main__card--wrapper">
          {state?.map((el) => {
            return (
              <Card
                onClick={() => seeItem(el.id)}
                key={el.id}
                className="benefit-services-main__card benefit-services-main__card-global-news"
              >
                <CardMedia
                  className="benefit-services-main__card-global-news--img"
                  component="img"
                  image={el.link}
                  alt="green iguana"
                />
                <CardContent>
                  <Box className="benefit-services-main__card-global-news--text">
                    <Typography gutterBottom variant="h5" component="div">
                      {el.title}
                    </Typography>
                  </Box>
                  <Box >
                    <Typography className="benefit-services-main__card-global-news--text" gutterBottom variant="boby2" component="div">
                      {el.text}
                    </Typography>
                  </Box>
                  <Box className="benefit-services-main__card-global-news--text">
                    <Typography gutterBottom variant="boby2" component="div">
                      {goodDate(el?.updatedAt)}
                    </Typography>
                  </Box>
                </CardContent>
                <Box marginLeft={"120ch"}>
                  <Stack
                    direction={"raw"}
                    alignContent={"end"}
                    marginTop={"1vh"}
                    marginLeft={"20ch"}
                  >
                    <Box marginRight={"1ch"} alignContent={"end"}>
                      {el.likeLength}
                    </Box>

                  </Stack>
                </Box>
                <Box marginTop={"2vh"} marginLeft={""} alignContent={"end"}>
                  <FavoriteIcon />
                  <Button
                    onClick={() => {
                      changeLike(el.id);
                    }}
                  >
                    понравилось
                  </Button>
                  {el.likeLength}
                </Box>
              </Card>
            );
          })}



        </Box>
      </Grid>
      <Routes>
        {!view && (
          <Route
            path="/global/:id"
            element={<GlobalNewsItem isFixed={isFixed} />}
          ></Route>
        )}
      </Routes>
    </Box>
  );
}



export default GlobalNewsList;


