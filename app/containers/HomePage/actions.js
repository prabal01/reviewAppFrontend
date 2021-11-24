

import { GET_PROFILES,GET_PROFILES_SUCCESS } from './constants';

export function getProfiles() {
  return {
    type: GET_PROFILES,
  };
}

export function setProfileData(data){
  console.log('here')
  return {
    type: GET_PROFILES_SUCCESS,
    data
  }
}