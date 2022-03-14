import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import  saga from 'redux-saga';
import { all } from '@redux-saga/core/effects';


 import {globalNewsReducer} from './globalNewsReducer'
 import { watcherGlobalNews ,watcherAllGlobalNews, watcherAddLike} from '../saga/globalNews';

import {locationReducer} from './locationReducer'
import { firebaseReducer } from './firebaseReducer';
import {authReducer} from './userReducer'
import { watcherSignUp } from '../saga/userSignup';
import { watcherGetLocation } from '../saga/locations';
import { watcherSignOut } from '../saga/userSignout';
import { watcherSignIn } from '../saga/userSignin';
import { watcherCheckIsAuth } from '../saga/userIsAuth';


const sagaMiddleware = saga()

const rootReducer = combineReducers({

  
  globalNews:globalNewsReducer

  auth: authReducer,
  location: locationReducer,
  firebase: firebaseReducer

})

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));

export const store = createStore(rootReducer, composeEnhancer)

sagaMiddleware.run(
  function*() {

   

    yield all([watcherSignUp(), watcherGetLocation(), watcherSignOut(), watcherSignIn(), watcherCheckIsAuth(),watcherAllGlobalNews(),watcherGlobalNews(),watcherAddLike()/*, watcherChuckNorris() здесь массив функций сага */]) 

  }
)
