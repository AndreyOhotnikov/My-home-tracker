import { firebaseConfigTypes } from "../types/firebaseConfig"


const firebaseConfig = {
  firebaseConfig: {

  }
}

export const firebaseReducer = (state = firebaseConfig, action) => {
  switch (action?.type) {
    case firebaseConfigTypes.FIREBASE:
      return { ...state, firebaseConfig: action.payload };

    default:
      return state;
  }
}
