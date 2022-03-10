import React,{useState} from "react";
import {Box, Input, MenuItem, TextField, Button}from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


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

  const [nameProduct, setNameProduct]=useState({ value: '' });
  const [text, setText]=useState({ value: '' });
  const [category, setCategory] = useState({ value: '' });
  const [price, setPrice] = useState({ value: '' });
  const [photo, setPhoto]=useState({ value: '' });

 const onSubmitHandler =(event)=>{
event.preventDefault();

 }
  
  return (
    <Box component='form' className={classes.mainForm}>
<TextField  onChange={event => setNameProduct(event.target.value)} id="outlined-basic" label="Название товара" variant="outlined" sx={{mt:'20px'}}/>
<TextField  onChange={event => setText(event.target.value)} id="outlined-basic" label="Описание товара" variant="outlined" sx={{mt:'20px'}}/>

   <TextField
   sx={{mt:'20px'}}
          id="outlined-select-currency"
          select
          label="Выберите категорию"
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      <TextField onChange={event => setPrice(event.target.value)} id="outlined-basic" label="Цена" variant="outlined" sx={{mt:'20px'}}/>
      
      
      
      <label htmlFor="icon-button-file">
        
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        <Box component="span" >Выберите фото</Box>
        <Input onChange={event => setPhoto(event.target.value)} sx={{display:'none'}} accept="image/*" id="icon-button-file" type="file" />
      </label>
    

      <Button onClick={onSubmitHandler} variant="outlined" className={classes.lastButton} sx={{mt:'20px', ml:'40%'}}>Опубликовать</Button>
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

