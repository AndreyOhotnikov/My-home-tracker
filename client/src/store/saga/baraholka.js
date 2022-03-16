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
  console.log("------------------------------", product);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const file = [...product.link];
  console.log("/////////////////", file);
  const storageRef = await ref(
    storage,
    `images/${Date.now()}${file[0].name.slice(file[0].name.indexOf("."))}`
  );
  console.log(storageRef, "/////////////");
  const snapshot = await uploadBytes(storageRef, file[0]); // загрузка файла
  const url = await getDownloadURL(storageRef);
  console.log(url);
  const response = await fetch(`baraholka/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, url }),
  });
  return await response.json(); //принмаем продукты
}

//worker
function* workerAddProduct({ product }) {
  try {
    const prod = yield call(() => productBaraholka(product)); //отправляем  на бек
    yield put(getAllProductsRedux(prod));
    yield console.log(prod);
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
  console.log("ПЕРЕД ФЕТЧ ЗАПРОСОМ!!!");
  console.log("id", id);
  const response = await fetch(`/baraholka/${id}`, { method: "DELETE" });

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
