import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import  saga from 'redux-saga';
import { all } from '@redux-saga/core/effects';
import {InitialState} from "../initState";
// import {locationReducer} from './locationReducer'
import {userReducer} from '../reducers/userReducer'
import { categoryReducer, servicesReducer } from './servicesReducer';
import { watcherCategorySaga, watcherServicesSaga } from '../saga/benefitServices';
// import { authUserReducer } from '../actionCreators/userAC';

const sagaMiddleware = saga()

const rootReducer = combineReducers({
  user: userReducer,
  services: servicesReducer,
  // category:categoryReducer,
  // location: locationReducer
})

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));

export const store = createStore(rootReducer,InitialState, composeEnhancer)

sagaMiddleware.run(
  function*() {
    yield all([watcherServicesSaga()]) 
  }
)
