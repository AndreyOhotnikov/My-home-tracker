import { GET_ALL_CATEGORY, GET_ALL_SERVICES, SAGA_API_CATEGORY, SAGA_API_SERVICES } from "../types/servicesTypes"

// export const allCategories = (category) => {
//   return {
//     type: GET_ALL_CATEGORY,
//     payload: category
//   }
// }

// export const categorySagaApi = (category) => {
//   return {
//     type: SAGA_API_CATEGORY,
//     payload: category
//   }
// }
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


