import React from "react";
import Box from "@mui/material/Box";
import { types } from "../../store/types/userTypes";
import { Grid, Stack, Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  getAllLocalNews,
  addLikeLocalSaga,
  deleteLocalSaga,
} from "../../store/actionCreators/localNewsAC";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";


function LocalNewsItem({ el, view, setView, id, setId }) {
  const params = useParams();
  const navigate = useNavigate();
  const state = useSelector((store) => store.localReducer.arrLocalNews);
  
  const userRole = useSelector((state) => state.auth.auth);
 
  const stateUser = useSelector((store) => store.user);
  const photo = stateUser["Userinfo.Photolinks.link"];
  
  function findDataInGlobalArr(id) {
    return state.filter((el) => el.id == id);
  }
  const defaultData = findDataInGlobalArr(params.id)[0];
  
  const dispatch = useDispatch();
  
  function changeLike(id) {
    dispatch(addLikeLocalSaga(id));
  }
  
  function updateLocal(id) {
    navigate(`/local/put/${id}`);
  }
  
  function seeItem(id) {
    navigate(`/local/${id}`);
  }
  
  function statusView() {
    if (view) {
      setView(false);
    } else setView(true);
  }
  function deleteGlobal(id) {
    dispatch(deleteLocalSaga(id));
  }
  
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));
  
  function navigateToMain() {
    navigate("/LocalNews");
  }

  useEffect(() => {
    if (!userRole) dispatch({ type: types.CHECK_IS_AUTH_SAGA });
    dispatch(getAllLocalNews());
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
      <Box marginLeft={"10ch"} width={"80%"} marginTop={"5ch"}>
        <Item>
          <Box></Box>
          <Stack
            direction="column"
            spacing={1}
            marginLeft={"5ch"}
            marginTop={"5vh"}
          >
            <Box>{goodDate(defaultData?.updatedAt)}</Box>
            <Box
              underline="none"
              onClick={() => {
                statusView(view, setView);
                setId(defaultData?.id);
                navigate(`/form/${defaultData.id}`);
              }}
            >
              {defaultData?.title}
            </Box>

            <Stack direction={"row"}>
              <Box width={"100%"} marginTop={"5ch"}>
                {defaultData?.text}
              </Box>

              <Stack width={"20%"}>
                <Box
                  marginRight={"20%"}
                  component="img"
                  src={defaultData?.link}
                  srcSet={`${defaultData?.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={defaultData?.title}
                  loading="lazy"
                  maxWidth={"100%"}
                  maxHeight={"100%"}
                  borderRadius={"15px"}
                />
                <Stack direction={"row"}>
                  {/* <Box  marginTop={'5vh'} > <Button onClick={(e)=> changeLike(defaultData?.id,e)} >понравилось</Button></Box> 
          <Box marginTop={'35%'} > {defaultData?.likeLength ? defaultData?.likeLength:0 }</Box> 
          <Box marginTop={'35%'} > < FavoriteIcon /></Box>  */}
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={"row"}>
              {userRole?.role !== "user" && (
                <Box marginRight={""}>
                  <Button onClick={() => updateLocal(defaultData.id)}>
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
              <Box marginLeft={"30px"}>
                <Button onClick={(e) => changeLike(defaultData?.id, e)}>
                  понравилось
                </Button>
              </Box>
              <Box marginTop={"8px"}>
                {" "}
                {defaultData?.likeLength ? defaultData?.likeLength : 0}
              </Box>
              <Box marginTop={"8px"}>
                {" "}
                <FavoriteIcon />
              </Box>
            </Stack>
          </Stack>
        </Item>
        <Box marginTop={"3vh"}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {state.map((el, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={"10%"}>
                <Item>
                  <Box
                    width={"90%"}
                    height={"auto"}
                    onClick={() => seeItem(el.id)}
                  >
                    <Box>{goodDate(el.updatedAt)}</Box>
                    <Box>{el.title}</Box>
                    <Box marginTop={"5%"} textAlign={"center"}>
                      <Box
                        component="img"
                        borderRadius={"15px"}
                        src={el.link}
                        srcSet={`${el.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={el.title}
                        loading="lazy"
                        maxWidth={"80%"}
                        maxHeight={"80%"}
                      />
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
                      >
                        <FavoriteIcon />
                      </Box>
                    </Box>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default LocalNewsItem;
