import { ADD_BID, DELETE_BID, GET_ALL_BIDS, GET_ALL_USER, REQUEST_ADD_BID_SAGA, REQUEST_DEL_BID_SAGA, SAGA_API_BIDS, SAGA_API_USERS } from "../types/bid"

export const addBid = (newBid) => {
  return {
    type: ADD_BID,
    payload: newBid
  }
}

export const sagaAddBid = (formData) => {
  return {
    type: REQUEST_ADD_BID_SAGA,
    payload: formData
  }
}

export const allBids = (bids) => {
  return {
    type: GET_ALL_BIDS,
    payload: bids
  }
}

export const bidsSagaApi = (bids) => {
  return {
    type: SAGA_API_BIDS,
    payload: bids
  }
}
export const allUser = (bids) => {
  return {
    type: GET_ALL_USER,
    payload: bids
  }
}

export const usersSagaApi = (bids) => {
  return {
    type: SAGA_API_USERS,
    payload: bids
  }
}

export const delBid = (id) => {
  return {
    type: DELETE_BID,
    payload: id
  }
}

export const delSagaBid = (id) => {
  return {
    type: REQUEST_DEL_BID_SAGA,
    payload: id
  }
}
