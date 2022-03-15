import { ADD_BID, DELETE_BID, GET_ALL_BIDS, REQUEST_ADD_BID_SAGA, REQUEST_DEL_BID_SAGA, SAGA_API_BIDS } from "../types/bid"

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

export const allBids = (services) => {
  return {
    type: GET_ALL_BIDS,
    payload: services
  }
}

export const bidsSagaApi = (bids) => {
  return {
    type: SAGA_API_BIDS,
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
