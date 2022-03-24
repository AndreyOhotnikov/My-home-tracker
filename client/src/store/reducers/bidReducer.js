import { InitialState } from "../initState";
import { ADD_BID, DELETE_BID, GET_ALL_BIDS, GET_ALL_USER } from "../types/bid";


export const bidsReducer = (state = InitialState.bids, action) => {
  switch (action.type) {
    case GET_ALL_BIDS:
      return action.payload;
    case ADD_BID:
      return [...state,
      {
        'User.Userinfo.Photolinks.link': action.payload.bidPhoto.link,
        'User.Userinfo.full_name': action.payload.newBid.full_name,
        'User.Userinfo.phone': action.payload.newBid.phone,
        'User.email': action.payload.newBid.email,
        'User.nick_name': action.payload.newBid.nick_name,
        text: action.payload.newBid.text,
        title: action.payload.newBid.title,
        link: action.payload.link,
        createdAt: action.payload.newBid.createdAt

      }
      ]
    case DELETE_BID:
      return {
        ...state,
        bids: state.filter(el => el.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export const userReducer = (state = InitialState.user, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return [...action.payload];
    default:
      return state;
  }
}
