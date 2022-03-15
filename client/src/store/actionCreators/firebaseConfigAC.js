import { firebaseConfigTypes } from "../types/firebaseConfig"


export const getFirebaseReducer = (payload) => ({type: firebaseConfigTypes.FIREBASE, payload})
