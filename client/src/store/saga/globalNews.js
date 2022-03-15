import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import { actiontTypes } from '../types/globalTypes';
import {addGlobalNewsRedux,getGlobalNewsRedux,addLikeToRedux} from '../actionCreators/globalNewsAC'

async function addGlobalNewsToDb(obj) {
  const response = await fetch('/global/new',{
    method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          obj.payload
        )
  });
  return response.json();
}

async function addLikeToDb(id) {
 
  const response = await fetch(`/global/like/${id}`);
  const data = await response.json()
  console.log(data,'data')
  return data;
}

async function getAllGlobalNews(){
  const res = await fetch('/global')
  return res.json()
}

function* workerGlobalNews(obj){
  try{
  const dataGlobalNews =  yield call(addGlobalNewsToDb,obj)
  yield put(addGlobalNewsRedux(obj.payload))
  }catch(err){
    console.log(err)
  }
}

function* worker(){
   const data  = yield call(getAllGlobalNews)
    yield put(getGlobalNewsRedux(data))
}

function* workerAddLike(id){
  console.log(id)
  const dataId = id.payload
  const data = yield call(addLikeToDb,dataId)
    console.log(data)
    yield put(addLikeToRedux(data))
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
