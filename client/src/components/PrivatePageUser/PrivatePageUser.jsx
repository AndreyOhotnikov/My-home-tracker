import React, {useState} from "react";
import {  useSelector } from 'react-redux';
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const PrivatePageUser = () => {
  const auth = useSelector(state => state.auth.auth)
  const [file, setFile] = useState('')

  const uploadFile = async (e) => {
    e.preventDefault()
    console.log(file)
  }
  return (
    <>
    <div>Имя юзера: {auth.user}, его роль: {auth.role}</div>
      <form method="post" >
        <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            <Box component="span">Выберите фото</Box>
            <input
              onChange={e => setFile(e.target.files)}
              style={{display: 'none'}}
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple
            />
          </label>
        <input type="submit" value="Upload Files" onClick={e => uploadFile(e)} name="submit"/>
      </form>
  </>
  );
};

export default PrivatePageUser;
