import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import { actiontTypes } from '../types/globalTypes';
import {addGlobalNewsRedux,getGlobalNewsRedux,addLikeToRedux,delGlobalNewsRedux} from '../actionCreators/globalNewsAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";
async function delGlobalNewsFromDb(id){
   const res = await fetch(`/globalNews/${Number(id)}`,{method:'DELETE'})
   const data = await res.json()
   console.log(data)
}
async function addGlobalNewsToDb(obj) {
  console.log(obj,'----------------')
  const app = initializeApp( firebaseConfig );
  const storage = getStorage(app);
  const file =[...obj.payload.link]
   console.log('/////////////////',file)
    const storageRef = await ref(storage, `images/${Date.now()}${file[0].name.slice(file[0].name.indexOf('.'))}`);
    console.log(storageRef,'/////////////')
    const snapshot = await uploadBytes(storageRef, file[0])                      // загрузка файла
    const url = await getDownloadURL(storageRef)                                     // ссылка на фотку
    
  console.log('/////////////////',url)
  const response = await fetch('/globalNews/new',{
    method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {...obj.payload,link:url}
        )
  });
  const data= await response.json()
  console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  return data;
}

async function addLikeToDb(id) {
 
  const response = await fetch(`/globalNews/like/${id}`);
  const data = await response.json()
  console.log(data,'data')
  return data;
}

async function getAllGlobalNews(){
  const res = await fetch('/globalNews')
  return res.json()
}

function* workerGlobalNews(obj){
  try{
    //yield console.log(obj,'------------------------------')
  const dataGlobalNews =  yield call(addGlobalNewsToDb,obj)
  yield put(addGlobalNewsRedux(dataGlobalNews))
  }catch(err){
    console.log(err)
  }
}

function* worker(){
   const data  = yield call(getAllGlobalNews)
    yield put(getGlobalNewsRedux(data))
}

function* workerAddLike(id){
  const dataId = id.payload
  const data = yield call(addLikeToDb,dataId)
  yield put(addLikeToRedux(data))
}
function* workerDelGlobalNews(id){
  console.log(id)
  const delNewsId = id.payload
  const data = yield call(delGlobalNewsFromDb,delNewsId)
  yield console.log(data)
  yield put(delGlobalNewsRedux(data))
}


export function* watcherGlobalNews() {
  yield takeEvery(actiontTypes.ADD_GLOBAL_NEWS_SAGA, workerGlobalNews); // каждый экшн actionTypes.REQUEST_JOKE_SAGA_CHUCK будет обрабатываться этим вотчером.
}
export function* watcherAllGlobalNews(){
  yield takeEvery(actiontTypes.GET_GLOBAL_NEWS_SAGA,worker);
}

export function* watcherAddLike(){
  yield takeEvery(actiontTypes.ADD_LIKE_GLOBAL_SAGA,workerAddLike);
}

export function* watcherDelGlobalNews(){
  yield takeEvery(actiontTypes.DEL_NEWS_GLOBAL_SAGA,workerDelGlobalNews);
}
