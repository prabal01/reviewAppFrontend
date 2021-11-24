   
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PROFILES } from './constants';
import { setProfileData } from './actions';

function* getProfileData() {
  const url = 'http://localhost:8000/api/getAllModelsDetails';
  try {
    const resp = yield call(axios, url);
    if (resp.status === 200) {
      console.log(resp.data.profiles)
        yield put(setProfileData(resp.data.profiles))
    }
  } catch (error) {
    yield call(console.log, error);
  }
}

// Individual exports for testing
export default function* campaignPageSaga() {
  yield takeLatest(GET_PROFILES, getProfileData);
}