// import { take, call, put, select } from 'redux-saga/effects';


   
import { call, put, takeLatest,all,fork } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_REVIEWS, FETCH_REVIEWS_FAIL, POST_REVIEW } from './constants';
import { fetchReviewFail, fetchReviews, fetchReviewSuccess } from './actions';
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
function* fetchReviewById(profileId) {
  const url = `http://localhost:8000/api/getReviews?profileId=${profileId.data}`;
  try {
    const resp = yield call(axios, url);
    if (resp.status === 200) {
      yield put(fetchReviewSuccess(resp.data.res.res))
    }else{
      yield put(fetchReviewFail())
    }
  } catch (error) {
    yield call(console.log, error);
    yield put(fetchReviewFail())
  }
}

function* postReviewByProfileId(data) {
  console.log(data)
  const url = `http://localhost:8000/api/postReview`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const params = new URLSearchParams()
params.append('profileId', data.data.profileId)
params.append('rating', data.data.rating)
params.append('review',  data.data.review)
  try {
    const resp = yield call(axios.post, url,params,config);
    console.log(resp)
    if (resp.status === 200) {
      console.log('hereee')
      yield put(fetchReviewSuccess(resp.data.res.res))
    }else{
      yield put(fetchReviewFail())
    }
  } catch (error) {
    yield put(fetchReviewFail(data.data.profileId))
    yield call(console.log, error);
  }
}



function* fetchReviewByIdWatcher() {
  yield takeLatest(FETCH_REVIEWS,fetchReviewById)
}
function* postReviewWatcher() {
  yield takeLatest(POST_REVIEW,postReviewByProfileId)
}

export default function* reviewPageSagaRoot() {
  yield all([
    fork(fetchReviewByIdWatcher),
    fork(postReviewWatcher)
  ])
}