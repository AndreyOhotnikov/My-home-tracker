import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import  saga from 'redux-saga';
import { all } from '@redux-saga/core/effects';
// import {locationReducer} from './locationReducer'
import {userReducer} from '../reducers/userReducer'
// import { authUserReducer } from '../actionCreators/userAC';

const sagaMiddleware = saga()

const rootReducer = combineReducers({
  user: userReducer,
  // location: locationReducer
})

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));

export const store = createStore(rootReducer, composeEnhancer)

sagaMiddleware.run(
  function*() {
    yield all([/*, watcherChuckNorris() здесь массив функций сага */]) 
  }
)
