import { types } from "../types/userTypes"


const defaultState = {
  locationCity: [{id: 1, name: "Москва"}, {id: 2, name: "Краснодар"}, {id: 3, name: "Владивосток"}],
  locationStreet: [{id: 1, name: "Ленина"}, {id: 2, name: "Пушкина"}, {id: 3, name: "Победы"}],
  locationHome: [{id: 1, name: 35}, {id: 2, name: 26}, {id: 3, name: 11}, {id: 4, name: 11}],
}

export const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOCATION:
      return {...state, auth: action.payload};
    
    default:
      return state;
    }
  }
