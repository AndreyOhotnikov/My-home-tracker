import {InitialState} from "../initState";
import { ADD_BID, GET_ALL_BIDS } from "../types/bid";


export const bidsReducer = (state = InitialState.bids, action) => {
  console.log(action,'action.paiload');
  switch (action.type) {
    case GET_ALL_BIDS:
      return action.payload;
      case ADD_BID:
      return [ ...state, action.paiload]
      // case DELETE_BIDS :
      //   return {
      //     ...state,
      //     bids: state.filter(el=> el.id !== action.payload.id)
      //   };
      default:
        return state;
  }
}


