import { ProfileState } from './types';
import { AnyAction } from 'redux';

const initialState: ProfileState = {
  loadingGetMyProfileRequest: false,
  error: false,
  name: '',
  email: '',
  password: '',
  newPassword: '',
  loadingEditProfileRequest: false,
  loadingUpdatePasswordRequest: false,
};

export default function profile(
  state = initialState,
  action: AnyAction,
): ProfileState {
  switch (action.type) {
    case '@profile/GET_MY_PROFILE_REQUEST':
      return {
        ...state,
        loadingGetMyProfileRequest: true,
      };
    case '@profile/GET_MY_PROFILE_SUCCESS':
      return {
        ...state,
        loadingGetMyProfileRequest: false,
        name: action.payload.profile['name'],
        email: action.payload.profile['email'],
      };
    case '@profile/GET_MY_PROFILE_FAILURE':
      return {
        ...state,
        loadingGetMyProfileRequest: false,
      };
    case '@profile/EDIT_PROFILE_REQUEST':
      return {
        ...state,
        loadingEditProfileRequest: true,
      };
    case '@profile/EDIT_PROFILE_SUCCESS':
      return {
        ...state,
        loadingEditProfileRequest: false,
      };
    case '@profile/EDIT_PROFILE_FAILURE':
      return {
        ...state,
        loadingEditProfileRequest: false,
      };
    case '@profile/UPDATE_PASSWORD_REQUEST':
      return {
        ...state,
        loadingUpdatePasswordRequest: true,
      };
    case '@profile/UPDATE_PASSWORD_SUCCESS':
      return {
        ...state,
        loadingUpdatePasswordRequest: false,
      };
    case '@profile/UPDATE_PASSWORD_FAILURE':
      return {
        ...state,
        loadingUpdatePasswordRequest: false,
      };
    case '@profile/SET_NAME':
      return {
        ...state,
        name: action.payload.name,
      };
    case '@profile/SET_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      };
    case '@profile/SET_NEW_PASSWORD':
      return {
        ...state,
        newPassword: action.payload.newPassword,
      };
    default:
      return state;
  }
}
