import React,{useState} from "react";
import {Box, Input, MenuItem, FormControl, Select, TextField, Button}from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const currencies = [
  {
    value: 'Без категории',
    },
  {
    value: 'Мебель',
    },
  {
    value: 'Игрушки', 
  },
  {
    value: 'Техника', 
  },
  {
    value: 'Одежда', 
  },
  {
    value: 'Прочее',
    },
];



const BaraholkaForm =()=>{
  const classes=useStyles()

  const [category, setCategory] = useState('');
  

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  
  return (
    <Box component='form' className={classes.mainForm}>
<TextField id="outlined-basic" label="Название товара" variant="outlined" sx={{mt:'20px'}}/>
<TextField id="outlined-basic" label="Описание товара" variant="outlined" sx={{mt:'20px'}}/>

   <TextField
   sx={{mt:'20px'}}
          id="outlined-select-currency"
          select
          label="Выберите категорию"
          value={category}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      <TextField id="outlined-basic" label="Цена" variant="outlined" sx={{mt:'20px'}}/>
      
      
      
      <label htmlFor="icon-button-file">
        
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        <Box component="span" >Выберите файл</Box>
        <Input sx={{display:'none'}} accept="image/*" id="icon-button-file" type="file" />
      </label>
    

      <Button variant="outlined" className={classes.lastButton} sx={{mt:'20px', ml:'40%'}}>Опубликовать</Button>
</Box>
  )
}

export default BaraholkaForm


const useStyles = makeStyles({
  
  mainForm:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    marginLeft:'20%',
    marginTop:'10%',
    width: '60%',
  },
  lastButton:{
    width:'20%',
  }

})

