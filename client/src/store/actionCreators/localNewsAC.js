import { localTypes } from "../types/localTypes"

export const addLocalNewsRedux = (obj) => (
  {
    type: localTypes.ADD_LOCAL_NEWS, payload: obj
  });

export const getAllLocalNews = () => ({ type: localTypes.GET_LOCAL_NEWS_SAGA })

export const getLocalNewsRedux = (arr) => (
  { type: localTypes.GET_LOCAL_NEWS_REDUX, payload: arr }
)
export const addLikeLocalSaga = (id) => ({ type: localTypes.ADD_LIKE_LOCAL_SAGA, payload: id })


export const addLikeLocalToRedux = (data) => ({ type: localTypes.ADD_LIKE_LOCAL_REDUX, payload: data })

export const deleteLocalSaga = (id) => ({ type: localTypes.DEL_NEWS_LOCAL_SAGA, payload: id })

export const delLocalNewsRedux = (id) => ({ type: localTypes.DEL_NEWS_LOCAL_REDUX, payload: id })
