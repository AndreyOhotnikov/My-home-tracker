import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import { localTypes } from '../types/localTypes';
import {addLocalNewsRedux,getLocalNewsRedux,addLikeLocalToRedux,delLocalNewsRedux} from '../actionCreators/localNewsAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";
async function delLocalNewsFromDb(id){
   const res = await fetch(`/localNews/${Number(id)}`,{method:'DELETE'})
   const data = await res.json()
   console.log(data)
}
async function addLocalNewsToDb(obj) {
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
  const response = await fetch('/localNews/new',{
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

async function addLikeLocalToDb(id) {
   console.log('========================',id)
  const response = await fetch(`/localNews/like/${id}`);
  const data = await response.json()
  console.log(data,'data')
  return data;
}

async function getAllLocalNews(){
 
  const res = await fetch('/localNews')
  
  return res.json()
}

function* workerLocalNews(obj){
  try{
    //yield console.log(obj,'------------------------------')
  const dataGlobalNews =  yield call(addLocalNewsToDb,obj)
  yield put(addLocalNewsRedux(dataGlobalNews))
  }catch(err){
    console.log(err)
  }
}

function* workerAllLocal(){
   const data  = yield call(getAllLocalNews)
    yield put(getLocalNewsRedux(data))
}

function* workerAddLocalLike(id){
  const dataId = id.payload
  const data = yield call(addLikeLocalToDb,dataId)
  yield put(addLikeLocalToRedux(data))
}
function* workerDelLocalNews(id){
  console.log(id)
  const delNewsId = id.payload
  const data = yield call(delLocalNewsFromDb,delNewsId)
  yield console.log(data)
  yield put(delLocalNewsRedux(data))
}


export function* watcherLocalNews() {
  yield takeEvery(localTypes.ADD_LOCAL_NEWS_SAGA, workerLocalNews); // каждый экшн actionTypes.REQUEST_JOKE_SAGA_CHUCK будет обрабатываться этим вотчером.
}
export function* watcherAllLocalNews(){
  yield takeEvery(localTypes.GET_LOCAL_NEWS_SAGA,workerAllLocal);
}

export function* watcherAddLocalLike(){
  yield takeEvery(localTypes.ADD_LIKE_LOCAL_SAGA,workerAddLocalLike);
}

export function* watcherDelLocalNews(){
  yield takeEvery(localTypes.DEL_NEWS_LOCAL_SAGA,workerDelLocalNews);
}
