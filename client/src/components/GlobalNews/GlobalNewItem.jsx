import "../localNews/Style.scss";
import React from "react";
import Box from "@mui/material/Box";
import { types } from "../../store/types/userTypes";
import {
  Grid,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  addGlobalNews,
  addLikeSaga,
  deleteGlobalSaga,
} from "../../store/actionCreators/globalNewsAC";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { Route, Routes, Link } from "react-router-dom";
import GlobalNewsForm from "./GlobalNewsForm";
import findDataInGlobalArr from "./GlobalNewsList";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { goodDate } from "./GlobalNewsList";
import { getAllGlobalNews } from "../../store/actionCreators/globalNewsAC";
function GlobalNewsItem({ el, view, setView, id, setId }) {
  const params = useParams();
  const navigate = useNavigate();
  const state = useSelector((store) => store.globalNews.arrGlobalNews);

  const userRole = useSelector((state) => state.auth.auth);
  console.log(userRole);
  function findDataInGlobalArr(id) {
    return state.filter((el) => el.id == id);
  }
  const defaultData = findDataInGlobalArr(params.id)[0];
  const dispatch = useDispatch();
  function changeLike(id, e) {
    e.preventDefault();
    dispatch(addLikeSaga(id));
  }
  function updateGlobal(id) {
    navigate(`/global/put/${id}`);
  }
  function seeItem(id) {
    navigate(`/global/${id}`);
  }
  function statusView() {
    if (view) {
      setView(false);
    } else setView(true);
  }
  function deleteGlobal(id) {
    dispatch(deleteGlobalSaga(id));
  }
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));
  function navigateToMain() {
    navigate("/GlobalNews");
  }
  function isFixed(el) {
    if (el?.fixed === "true") {
      return true;
    }
  }
  useEffect(() => {
    dispatch(getAllGlobalNews());
    if (!userRole) dispatch({ type: types.CHECK_IS_AUTH_SAGA });
  }, []);
  const goodDate = (str = "") => {
    const timeSec = str?.slice(-10, -8);
    let timeHour = +str?.slice(-13, -11);
    const year = str?.slice(0, 4);
    let day = str?.slice(8, 10);
    const month = str?.slice(5, 7);
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
    if (+timeHour >= 21 && +timeHour <= 24) {
      timeHour = Math.abs(21 - +timeHour);
      if (+timeHour > 0) {
        day = +day + 1;
      }
    } else {
      timeHour = timeHour + 3;
    }
    return `${day} ${monthObj[month]} ${year} г., ${timeHour}:${timeSec}`;
  };
  return (
    <>
      <Box m={5}>
        <Box className="global-news-item">
          <Card className="benefit-services-main__card-item-news">
            {/* <Item> */}
            {/* <Stack
            direction="column"
            spacing={1}
            marginLeft={"5ch"}
            marginTop={"5vh"}
          > */}

            <Box
              underline="none"
              style={isFixed(defaultData) ? { color: "red" } : null}
              onClick={() => {
                statusView(view, setView);
                setId(defaultData?.id);
                navigate(`/form/${defaultData.id}`);
              }}
            ></Box>

            <CardMedia
              className="benefit-services-main__card-global-news--img"
              component="img"
              image={defaultData?.link}
              srcSet={`${defaultData?.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={defaultData?.title}
              loading="lazy"
              // maxWidth={"100%"}
              // maxHeight={"100%"}
              // borderRadius={"15px"}
            />
            <CardContent>
              <Box className="benefit-services-main__card-global-news--text">
                <Typography
                  className="benefit-services-main__card-global-news--text"
                  gutterBottom
                  variant="boby2"
                  component="div"
                >
                  {defaultData?.title}
                </Typography>
              </Box>
              <Box className="benefit-services-main__card-global-news--text">
                <Typography
                  className="benefit-services-main__card-global-news--text"
                  gutterBottom
                  variant="boby2"
                  component="div"
                >
                  {goodDate(defaultData?.updatedAt)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Box className="global-news-item__right">
            <Typography
              className="benefit-services-main__card-item-news--text"
              gutterBottom
              variant="boby2"
              component="div"
            >
              {defaultData?.text}
            </Typography>

            <Box className="global-news-item__footer">
              <Box marginLeft={"30px"}>
                <Button onClick={(e) => changeLike(defaultData?.id, e)}>
                  понравилось
                </Button>
              </Box>
              <Box marginTop={"8px"}>
                {defaultData?.likeLength ? defaultData?.likeLength : 0}
              </Box>
              <Box marginTop={"8px"} marginLeft={"10px"}>
                <FavoriteIcon />
              </Box>
            </Box>
            {userRole?.role !== "user" && (
              <Box>
                <Button onClick={() => updateGlobal(defaultData.id)}>
                  Редактировать
                </Button>
                <Button
                  onClick={() => {
                    deleteGlobal(defaultData.id);
                    navigateToMain();
                  }}
                >
                  Удалить
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        {/* <Box  marginTop={'5vh'} > <Button onClick={(e)=> changeLike(defaultData?.id,e)} >понравилось</Button></Box> 
          <Box marginTop={'35%'} > {defaultData?.likeLength ? defaultData?.likeLength:0 }</Box> 
          <Box marginTop={'35%'} > < FavoriteIcon /></Box>  */}

        <Box className="benefit-services-main__card-global-news--card-item-box">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {state.map((el, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={"10%"}>
                <Card className="benefit-services-main__card-item-news">
                  {/* <Item> */}
                  {/* <Stack
            direction="column"
            spacing={1}
            marginLeft={"5ch"}
            marginTop={"5vh"}
          > */}

                  <Box
                    underline="none"
                    style={isFixed(defaultData) ? { color: "red" } : null}
                    onClick={() => {
                      statusView(view, setView);
                      setId(defaultData?.id);
                      navigate(`/form/${defaultData.id}`);
                    }}
                  ></Box>

                  <CardMedia
                    className="benefit-services-main__card-global-news--img"
                    component="img"
                    image={el.link}
                    srcSet={`${el?.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={defaultData?.title}
                    loading="lazy"
                    // maxWidth={"100%"}
                    // maxHeight={"100%"}
                    // borderRadius={"15px"}
                  />
                  <CardContent>
                    <Box className="benefit-services-main__card-global-news--text">
                      <Typography
                        className="benefit-services-main__card-global-news--text"
                        gutterBottom
                        variant="boby2"
                        component="div"
                      >
                        {el.title}
                      </Typography>
                    </Box>
                    <Box className="benefit-services-main__card-global-news--text">
                      <Typography
                        className="benefit-services-main__card-global-news--text"
                        gutterBottom
                        variant="boby2"
                        component="div"
                      >
                        {goodDate(el.updatedAt)}
                      </Typography>
                    </Box>
                    <Box marginTop={"7%"}>
                      <Button onClick={(e) => changeLike(el?.id, e)}>
                        Понравилось
                      </Button>
                      <Box component={"span"}>
                        {el.likeLength ? el?.likeLength : 0}
                      </Box>
                      <Box
                        position={"absolute"}
                        component={"span"}
                        marginTop={"4px"}
                        marginLeft={'10px'}
                      >
                        <FavoriteIcon />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default GlobalNewsItem;
