import ACTypes from "../types/baraholkaTypes";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  addProductReduser,
  getAllProductsRedux,
  delProductRedux,
} from "../actionCreators/baraholkaAC";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";

async function productBaraholka(product) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const file = [...product.link];

  let url
  const storageRef = await ref(
    storage,
    `images/${Date.now()}${file[0].name.slice(file[0].name.indexOf("."))}`
  );
  const snapshot = await uploadBytes(storageRef, file[0]);
  url = await getDownloadURL(storageRef);
  const response = await fetch(`/baraholka/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, url }),
  });
  return await response.json();
}

function* workerAddProduct({ product }) {
  try {
    const prod = yield call(() => productBaraholka(product));
    yield put(getAllProductsRedux(prod));
  } catch (err) {
    console.error("ERROR", err);
  }
}

async function productsFind() {
  const response = await fetch(`/baraholka/allProduct`, { method: 'GET' });
  return await response.json();
}

function* workerProductList() {
  try {
    const prodList = yield call(() => productsFind());
    yield put(getAllProductsRedux(prodList));
  } catch (err) {
    console.error("ERROR", err);
  }
}

async function delProductDB(id) {
  const response = await fetch(`/baraholka/${id}`, { method: "DELETE" });
  return await response.json();
}

function* workerDelProductBaraholka({ id }) {
  try {
    const deleteProd = yield call(() => delProductDB(id));
    if (deleteProd) yield put(delProductRedux(deleteProd));
  } catch (error) {
    console.error("ERROR", error);
  }
}

export function* watcherProducts() {
  yield takeEvery(ACTypes.PRODUCT_SAGA, workerProductList);
}

export function* watcherBaraholka() {
  yield takeEvery(ACTypes.ADD_PROD_SAGA, workerAddProduct);
}

export function* watcherDelProductBaraholka() {
  yield takeEvery(ACTypes.DEL_PRODUCT_SAGA, workerDelProductBaraholka);
}
