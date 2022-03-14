import { actiontTypes } from "../types/globalTypes"


const initState = {
 arrGlobalNews:[]
}

export const globalNewsReducer = (state = initState, action) => {
  
  switch (action.type) {
    case actiontTypes.ADD_GLOBAL_NEWS:
      console.log(action)
      return {...state,arrGlobalNews:[...state.arrGlobalNews,action.payload]};

    case actiontTypes.GET_GLOBAL_NEWS_REDUX:
      return {...state,arrGlobalNews:action.payload};

    case actiontTypes.ADD_LIKE_GLOBAL_REDUX:
     if(action.payload.status === true){
      return {...state,arrGlobalNews:[...state.arrGlobalNews.map((el)=>{
        if(el.id == action.payload.id){
          el.likeLength +=1
          return el
        }else return el
      })]};
     }else if(action.payload.status === false){
      return {...state,arrGlobalNews:[...state.arrGlobalNews.map((el)=>{
        if(el.id == action.payload.id){
          el.likeLength -=1
          return el
        }else return el
      })]};
     }
        
    default:
      return state;
    }
  }
