import { ADD_SERVICE, GET_ALL_CATEGORY, GET_ALL_SERVICES, REQUEST_ADD_SERVICE_SAGA, SAGA_API_CATEGORY, SAGA_API_SERVICES } from "../types/servicesTypes"

export const allServices = (services) => {
  return {
    type: GET_ALL_SERVICES,
    payload: services
  }
}

export const servicesSagaApi = (services) => {
  return {
    type: SAGA_API_SERVICES,
    payload: services
  }
}

export const addService = (newService) => {
  return {
    type: ADD_SERVICE,
    payload: newService
  }
} 

export const sagaAddService = (formData) =>{
  return {
    type: REQUEST_ADD_SERVICE_SAGA,
    payload: formData
  }
}
