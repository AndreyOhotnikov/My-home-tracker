import React from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';




const BaraholkaItem=()=>{
 const classes=useStyles()

return(

<Box className={classes.rootBox_1}>
    <Box
    component="img"
    className={classes.imgBox}
    alt="The house from the offer."
    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
  />
 <Box className={classes.textBox}>
   <Box component="span" className={classes.userNameBox}>Размещено: Иванов Иван Иванович</Box>
   <Box component="h3" >
      Заголовок
    </Box>
    <Box component="span" className={classes.titleBox}>
      Тут будет тест про описание самого товара, и модет быть что-то еще длинное типа куча всего написано просто я хочу посмотреть как это будет умещаться в див
    </Box>
    <Box className={classes.priceBox}>Цена: 500р</Box>
    <Box className={classes.likes}>
       <Button variant="text" className={classes.likeButton}>&#128077;</Button>
       <Box component="span" className={classes.count}>0</Box>
       </Box>
       <Stack  sx={{ml:'60%', display: 'flex',flexDirection: 'row',}}>
    <Button variant="contained" sx={{mr:'10px'}}>Связаться</Button>
      <Button variant="outlined" color="error">Удалить</Button>
    </Stack>
    </Box>
 </Box>
)
}

export default BaraholkaItem


const useStyles = makeStyles({
  rootBox_1:{
    display: 'flex',
    flexDirection: 'row',
    position:'absolute',
    justifyContent:'center',
    width:'70%',
    marginTop:'10%',
    marginLeft:'10%',
  }, 
  imgBox:{
    height: '80%',
      width: '80%',
      overflow: 'hidden',
      borderRadius: '12px',
      marginRight:'3%',
      marginTop:'5%',
  }, 
  textBox:{
    display: 'flex',
      flexDirection: 'column',
       alignItems: { xs: 'center' },
       m: 2 ,
  },
  userNameBox:{
     fontSize: 12,
      textAlign:'end',
       mt:'15px', ml:'60%'
      },
titleBox:{ 
  color: 'black',
   fontSize: '18px',
    textAlign:'start'
},
priceBox:{ 
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
 width:'20%',
  fontSize: '18px',
  backgroundColor: 'rgb(187, 232, 243)',
  padding:'10px',
  borderRadius: '10px',
  
},
likes:{
  display: 'flex',
  flexDirection: 'row',
},
likeButton:{
 textAlign:'start',
  width: '10%',
},
count:{ 
  marginTop: '8px',
}
})
