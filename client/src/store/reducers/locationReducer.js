import { locationTypes } from "../types/locationTypes"


const defaultState = {
  location: []
}

export const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case locationTypes.GET_ALL_LOCATION:
      return { ...state, location: action.payload };

    default:
      return state;
  }
}
