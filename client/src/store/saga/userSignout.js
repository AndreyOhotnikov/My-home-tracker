import { types } from "../types/userTypes"
import { takeEvery, put, call} from 'redux-saga/effects';
import { authUserReducer } from '../actionCreators/userAC'


async function signout() {
  const response = await fetch(`/user/signout`, {
    method: "GET",
  });
  return response.json()
}


function* workerSignOut() {
  try {
    const data = yield call(signout)
    yield put(authUserReducer(false))
  } catch (err) {
    console.error('Err', err);
  }
}

export function* watcherSignOut() {
  yield takeEvery(types.SIGN_OUT_USER_SAGA, workerSignOut)
}
