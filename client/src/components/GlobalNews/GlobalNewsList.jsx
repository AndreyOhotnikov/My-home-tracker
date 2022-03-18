import React from "react";
import "../BenefitServices/BenefitServicesForm.scss";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Link, Stack } from "@mui/material";
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
    <>
      {view && (
        <Box paddingTop={2} maxWidth={'100%'}>
           <Paper>
          <Typography variant="h4" className="benefit-service-form__typography">
           Главные новости
          </Typography>
        </Paper>
          <Stack
            direction="column"
            spacing={1}
            marginRight={'3%'}
            marginLeft={'3%'}
          >
            {state?.map((el, index) => {
              return (
                <>
                  <Item  onClick={() => seeItem(el.id)}  style={{border: '1px solid black'}}>
                    <Box >{goodDate(el?.updatedAt)}</Box>

                    <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "10%",
                      marginTop: "5%",
                    }}
              
                      marginTop={"2vh"}
                      key={index}
                      style={isFixed(el) ? { color: "red" } : null}
                    >
                      {el.title}
                    </Box>

                    <Stack direction="row" spacing={1} >
                      <Box style={{width: '1600px'}} width={1600} marginTop={3}>
                        {el.text}
                      </Box>
                      <img style={{maxWidth: '30%'}}
                        src={el.link} alt={''}
                      />
                    </Stack >
                    <Box marginLeft={"120ch"}>
                      <Stack
                     
                        direction={"raw"}
                        alignContent={"end"}
                        marginTop={"1vh"}
                        marginLeft={"20ch"}
                      >
                         <Box marginRight={"1ch"} alignContent={"end"}>
                          {" "}
                          {el.likeLength}
                        </Box>
                      </Stack>
                   </Box>
                      <Box marginTop={'2vh'} marginLeft={''} alignContent={'end'}>
                          < FavoriteIcon />
                              <Button 
                                  onClick={()=>{
                                  changeLike(el.id)
                                  }} >понравилось
                              </Button> {el.likeLength}
                      </Box>
                  </Item>
                </>
              );
            })}
          </Stack>
        </Box>
      )}
      <Routes>
        {/* {!view && <Route  path="/form/:id" element={<GlobalNewsForm/>} ></Route>} */}
        {!view && (
          <Route
            path="/global/:id"
            element={<GlobalNewsItem isFixed={isFixed} />}
          ></Route>
        )}
        {/* {!view && <Route  path="/global/:id" element={<GlobalNewsId  />} ></Route>} */}
      </Routes>
    </>
  );
}

//

export default GlobalNewsList;

//<GlobalNewsItem view={view}  setId={setId} setView={setView} key={index} el={el} />
