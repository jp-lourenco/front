import { Profile } from './types';

export function getMyProfileRequest() {
  return {
    type: '@profile/GET_MY_PROFILE_REQUEST',
  };
}

export function getMyProfileSuccess({ profile }: { profile: Profile }) {
  return {
    type: '@profile/GET_MY_PROFILE_SUCCESS',
    payload: {
      profile,
    },
  };
}

export function getMyProfileFailure() {
  return {
    type: '@profile/GET_MY_PROFILE_FAILURE',
  };
}

export function editProfileRequest() {
  return {
    type: '@profile/EDIT_PROFILE_REQUEST',
  };
}

export function editProfileSuccess() {
  return {
    type: '@profile/EDIT_PROFILE_SUCCESS',
  };
}

export function editProfileFailure() {
  return {
    type: '@profile/EDIT_PROFILE_FAILURE',
  };
}

export function setName({ name }: { name: string }) {
  return {
    type: '@profile/SET_NAME',
    payload: { name },
  };
}

export function setPassword({ password }: { password: string }) {
  return {
    type: '@profile/SET_PASSWORD',
    payload: { password },
  };
}

export function setNewPassword({ newPassword }: { newPassword: string }) {
  return {
    type: '@profile/SET_NEW_PASSWORD',
    payload: { newPassword },
  };
}
