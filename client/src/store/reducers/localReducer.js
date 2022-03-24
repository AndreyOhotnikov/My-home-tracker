 import { localTypes } from "../types/localTypes";

 const initState = {
  arrLocalNews:[]
 }
 
 export const localNewsReducer = (state = initState, action) => {
   
   switch (action.type) {
     case localTypes.ADD_LOCAL_NEWS:
         return {...state,arrLocalNews: state.arrLocalNews.map((el)=>{
          if(el.id === action.payload.id){
            return el = action.payload
          }
          else return el
       })
          
     } 
     case localTypes.GET_LOCAL_NEWS_REDUX:
       return {...state,arrLocalNews:action.payload};
     case localTypes.DEL_NEWS_LOCAL_REDUX:
         if(state.arrLocalNews.length == 1){
           return {...state,arrLocalNews:[]}
         }else{
           return {...state,arrLocalNews:[...state.arrLocalNews.filter((el)=>el.id !== action.payload)]}
         }
         
     case localTypes.ADD_LIKE_LOCAL_REDUX:
      if(action.payload.status === true ){
       return {...state,arrLocalNews:[...state.arrLocalNews.map((el)=>{
         if(el.id == action.payload.id){
           if(!el.likeLength){
              el.likeLength = 1
           }
           else el.likeLength +=1
           return el
         }else return el
       })]};
      }else if(action.payload.status === false){
       return {...state,arrLocalNews:[...state.arrLocalNews.map((el)=>{
         if(el.id == action.payload.id){
           el.likeLength -=1
           return el
         }else return el
       })]};
      }else if(!action.payload.status ){
       return {...state,arrLocalNews:[...state.arrLocalNews.map((el)=>{
         if(el.id == action.payload.id){
           el.likeLength =1
           return el
         }else return el
       })]};
      }
         
     default:
       return state;
     }
   }
