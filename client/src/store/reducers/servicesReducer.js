import {InitialState} from "../initState";
import { ADD_SERVICE, GET_ALL_CATEGORY, GET_ALL_SERVICES, SAGA_API_SERVICES } from "../types/servicesTypes";


export const servicesReducer = (state = InitialState.services, action) => {
  console.log(action.paiload,'action.paiload');
  switch (action.type) {
    case GET_ALL_SERVICES:
      return action.payload;
      case ADD_SERVICE:
      // const newService = [
      //   ...state,
      //   {
      //     text: action.payload.text,
      //     title:action.payload.title,
      //     service:action.paiload.service
      //   }
      // ]
      return [ ...state, action.paiload]
      default:
        return state;
  }
}

// export const categoryReducer = (state = InitialState, action) => {
//   switch (action.type) {
//     case GET_ALL_CATEGORY:
//       return action.payload;
//     default:
//       return state;
//   }
// }
