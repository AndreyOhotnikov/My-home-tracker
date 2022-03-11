import {InitialState} from "../initState";
import { GET_ALL_CATEGORY, GET_ALL_SERVICES, SAGA_API_SERVICES } from "../types/servicesTypes";


export const servicesReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_ALL_SERVICES:
      return action.payload;
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
