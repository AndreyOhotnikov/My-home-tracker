import { firebaseConfigTypes } from "../types/firebaseConfig"


const firebaseConfig = {
  firebaseConfig: {
    apiKey: "1111",
    authDomain: "2222",
    projectId: "33333",
    storageBucket: "44444",
    messagingSenderId: "555555",
    appId: "66666"
  }
}

export const firebaseReducer = (state = firebaseConfig, action) => {
  switch (action?.type) {
    case firebaseConfigTypes.FIREBASE:
      return {...state, firebaseConfig: action.payload};
   
    default:
      return state;
    }
  }
