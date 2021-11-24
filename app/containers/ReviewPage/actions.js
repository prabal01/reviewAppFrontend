/*
 *
 * ReviewPage actions
 *
 */

import { FETCH_REVIEWS, FETCH_REVIEWS_FAIL, FETCH_REVIEWS_SUCCESS, POST_REVIEW } from './constants';

export function fetchReviews(uid) {
  return {
    type: FETCH_REVIEWS,
    data:uid
  };
}
export function fetchReviewSuccess(data) {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    data
  };
}
export function fetchReviewFail(err) {
  return {
    type: FETCH_REVIEWS_FAIL,
    err
  };
}
export function postReview(data) {
  return {
    type: POST_REVIEW,
    data
  };
}


