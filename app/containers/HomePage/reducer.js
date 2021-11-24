/*
 *
 * Test reducer
 *
 */
import {GET_PROFILES, GET_PROFILES_SUCCESS } from './constants';
import produce from 'immer';

export const initialState ={
  isHomePageLoading:false,
  profiles:[]
};

/* eslint-disable default-case, no-param-reassign */
const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILES:
        draft.isHomePageLoading = true;
        break;
      case GET_PROFILES_SUCCESS:
        draft.isHomePageLoading = false;
        draft.profiles = action.data;
        break;
    }
  });

export default homepageReducer;
