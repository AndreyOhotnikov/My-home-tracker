import { actiontTypes } from "../types/globalTypes"


const initState = {
  arrGlobalNews: []
}

export const globalNewsReducer = (state = initState, action) => {

  switch (action.type) {
    case actiontTypes.ADD_GLOBAL_NEWS:
      console.log(action.payload, '=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      return { ...state, arrGlobalNews: [...state.arrGlobalNews, action.payload] };

    case actiontTypes.GET_GLOBAL_NEWS_REDUX:
      return {
        ...state, arrGlobalNews: action.payload
      }
//.sort((a, b) => {
//   return b?.fixed?.localeCompare(a?.fixed)
// })
    case actiontTypes.DEL_NEWS_GLOBAL_REDUX:
      if (state.arrGlobalNews.length === 1) {
        return { ...state, arrGlobalNews: [] }
      } else {
        return { ...state, arrGlobalNews: [...state.arrGlobalNews.filter((el) => el.id !== Number(action.payload))] }
      }

    case actiontTypes.ADD_LIKE_GLOBAL_REDUX:
      // console.log(action.payload,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
      if (action.payload.status === true) {
        return {
          ...state, arrGlobalNews: [...state.arrGlobalNews.map((el) => {
            if (el.id == action.payload.id) {
              if (!el.likeLength) {
                el.likeLength = 1
              }
              else el.likeLength += 1
              return el
            } else return el
          })]
        };
      } else if (action.payload.status === false) {
        return {
          ...state, arrGlobalNews: [...state.arrGlobalNews.map((el) => {
            if (el.id == action.payload.id) {
              el.likeLength -= 1
              return el
            } else return el
          })]
        };
      } else if (!action.payload.status) {
        return {
          ...state, arrGlobalNews: [...state.arrGlobalNews.map((el) => {
            if (el.id == action.payload.id) {
              el.likeLength = 1
              return el
            } else return el
          })]
        };
      }

    default:
      return state;
  }
}
