import ACTypes from "../types/baraholkaTypes"
import {takeEvery} from 'redux-saga/effects'
//worker













//watcher
function* watcherBaraholka(){
  yield takeEvery(ACTypes.ADD_PRODUCT, workerGetProduct)
}
