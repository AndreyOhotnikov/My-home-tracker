import { InitialState } from "../initState";
import { ADD_SERVICE, DELETE_SERVICE, GET_ALL_SERVICES } from "../types/servicesTypes";



// export const servicesReducer = (state = [], action) => {

export const servicesReducer = (state = InitialState.services, action) => {

  console.log(action,'action.paiload');
  switch (action.type) {
    case GET_ALL_SERVICES:
      return action.payload


    case ADD_SERVICE:
      return [...state, action.paiload]
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.filter(el => el.id !== action.payload.id)
      };
    default:
      return state;
  }
}


