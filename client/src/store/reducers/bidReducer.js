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


/**
 * 
 *User.Userinfo.Photolinks.bid_id: null
User.Userinfo.Photolinks.id: 4
User.Userinfo.Photolinks.link: "https://firebasestorage.googleapis.com/v0/b/my-home-tracker.appspot.com/o/images%2F1647451306439.jpg?alt=media&token=4a4aebe2-79e9-4b9e-b0dd-9e1d87efe94f"
User.Userinfo.Photolinks.userinfo_id: 2
User.Userinfo.entrance: null
User.Userinfo.flat: null
User.Userinfo.full_name: "чавпрапр234"
User.Userinfo.id: 2
User.Userinfo.phone: "88005553535"
User.email: "zxcv@dfg.fgh"
User.id: 3
User.nick_name: "zxcv"
createdAt: "2022-03-17T09:26:52.034Z"
id: 3
link: null
status: null
text: "dfgdfg"
title: "fgfd"
updatedAt: "2022-03-17T09:26:52.034Z"
user_id: 3
 */

export const userReducer = (state = InitialState.user, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return [...action.payload];
    default:
      return state;
  }
}
