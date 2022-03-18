import React from "react";
import Box from '@mui/material/Box';

import { Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import { addGlobalNews, addLikeSaga } from "../../store/actionCreators/globalNewsAC";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import ImageListItem from '@mui/material/ImageListItem';
import { Route, Routes, Link } from "react-router-dom";
import GlobalNewsForm from "./GlobalNewsForm";
import findDataInGlobalArr from './GlobalNewsList'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
function ShortGlobalNewsItem({ el, view, setView, id, setId }) {
  const dispatch = useDispatch()
  function changeLike(id) {
    dispatch(addLikeSaga(id))
  }
  function statusView() {
    if (view) {
      setView(false)
    } else setView(true)
  }

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Item  >
        <Link to={false && `/form/${el.id}`} underline="none" onClick={() => {
          statusView(view, setView)
          setId(el.id)
        }}>
          {el.title}
        </Link >

        < Box marginLeft={'120ch'}  >
          <Stack direction={'raw'} alignContent={'end'}>
            <Box marginRight={'6ch'} alignContent={'end'}> {el.likeLength}</Box>
            <Button size="small" alignContent={'end'} variant="contained" onClick={() => {
              changeLike(el.id)
            }}>отметить новость </Button>
          </Stack>
        </Box>
        <Stack direction="row" spacing={1}>
          <Box width={1600} marginTop={3} >
            {el.text}



          </Box>
          <Box component='img'
            src={`${el.link}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${el.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={el.title}
            loading="lazy"
          />

        </Stack>

      </Item>

    </>)
}


export default ShortGlobalNewsItem


