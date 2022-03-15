import ACTypes from "../types/baraholkaTypes";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  getAllProductsRedux,
  delProductRedux,
} from "../actionCreators/baraholkaAC";

async function productBaraholka(product) {
  console.log(product);
  const response = await fetch(`baraholka/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await response.json(); //принмаем продукты
}

//worker
function* workerAddProduct({ product }) {
  try {
    const prod = yield call(() => productBaraholka(product)); //отправляем  на бек

    console.log(prod);
  } catch (err) {
    console.error("ERROR", err);
  }
}

//получаем все продукты
async function productsFind() {
  const response = await fetch(`baraholka/allProduct`);
  return await response.json(); //принмаем продукты
}

function* workerProductList() {
  try {
    const prodList = yield call(() => productsFind());
    yield put(getAllProductsRedux(prodList)); // отправляем в редакс
    //console.log(prodList);
  } catch (err) {
    console.error("ERROR", err);
  }
}

//удаление товаров
async function delProductDB(id) {
  console.log("id", id);
  const response = await fetch(`baraholka/${id}`, { method: "DELETE" });

  return await response.json();
}

function* workerDelProductBaraholka({ id }) {
  console.log("saga", id);
  try {
    const deleteProd = yield call(() => delProductDB(id));
    console.log(deleteProd);
    if (deleteProd) yield put(delProductRedux(deleteProd));
  } catch (error) {
    console.error("ERROR", error);
  }
}

//watcher
export function* watcherProducts() {
  yield takeEvery(ACTypes.PRODUCT_SAGA, workerProductList);
}

export function* watcherBaraholka() {
  yield takeEvery(ACTypes.ADD_PROD_SAGA, workerAddProduct);
}

export function* watcherDelProductBaraholka() {
  yield takeEvery(ACTypes.DEL_PRODUCT_SAGA, workerDelProductBaraholka);
}
