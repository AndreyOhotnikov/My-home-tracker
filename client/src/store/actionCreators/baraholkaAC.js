import ACTypes from "../types/baraholkaTypes";

export const addProductReduser = (payload) => ({
  type: ACTypes.ADD_PRODUCT,
  payload,
});
export const getAllProductsRedux = (productList) => ({
  type: ACTypes.ALL_PRODUCTS_REDUX,
  payload: productList,
});

export const delProductRedux = (id) => ({type: ACTypes.DEL_PRODUCTS_REDUX, payload: id});
export const allProductsView = () => ({ type: ACTypes.PRODUCT_SAGA });
export const delProductSaga = (id) =>({ type: ACTypes.DEL_PRODUCT_SAGA, payload:id });
