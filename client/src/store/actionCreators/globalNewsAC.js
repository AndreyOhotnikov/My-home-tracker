import { actiontTypes } from "../types/globalTypes"

 
export const addGlobalNewsRedux = (obj) => (
  { 
  type: actiontTypes.ADD_GLOBAL_NEWS,payload:obj
});

export const getAllGlobalNews = ()=>({type:actiontTypes.GET_GLOBAL_NEWS_SAGA})

export const getGlobalNewsRedux = (arr)=>(
  {type:actiontTypes.GET_GLOBAL_NEWS_REDUX,payload:arr}
)
export const addLikeSaga=(id)=>( {type:actiontTypes.ADD_LIKE_GLOBAL_SAGA,payload:id})
 

export const addLikeToRedux=(data)=>({type:actiontTypes.ADD_LIKE_GLOBAL_REDUX,payload:data})

export const deleteGlobalSaga =(id)=>({type:actiontTypes.DEL_NEWS_GLOBAL_SAGA,payload:id})

export const delGlobalNewsRedux = (id)=>({type:actiontTypes.DEL_NEWS_GLOBAL_REDUX,payload:id})
