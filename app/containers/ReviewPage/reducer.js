/*
 *
 * ReviewPage reducer
 *
 */
import produce from 'immer';
import { FETCH_REVIEWS, FETCH_REVIEWS_FAIL, FETCH_REVIEWS_SUCCESS, POST_REVIEW } from './constants';

export const initialState = {reviews:[],isReviewFetching:false,err:false};

/* eslint-disable default-case, no-param-reassign */
const reviewPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_REVIEWS:
        draft.isReviewFetching = true;
        break;
      case FETCH_REVIEWS_SUCCESS:
        console.log('called')
        draft.isReviewFetching = false
        draft.reviews=action.data
        break
      case FETCH_REVIEWS_FAIL:
        draft.isReviewFetching = false
        draft.err = true
        break
      case POST_REVIEW:
        draft.isReviewFetching = true
    }
  });

export default reviewPageReducer;
