import InitialState from "../initState";
import { GET_SERVICES, SET_ORDERS_CUSTOMER, GET_CATEGORY } from "../types/servicesTypes";


export const servicesReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return action.payload;
    case SET_ORDERS_CUSTOMER:
      return action.payload.id;
      default:
        return state;
  }
}

export const categoryReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}
