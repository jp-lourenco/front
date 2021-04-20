import { AuthState } from './types';
import { AnyAction } from 'redux';

const initialState: AuthState = {
  loadingSignInRequest: false,
  loadingSignUpRequest: false,
  loadingResetPasswordRequest: false,
  signInError: false,
  signUpError: false,
  resetPasswordError: false,
  messageResetPassword: '',
  messageSignUp: '',
  email: '',
  emailResetPassword: '',
  emailCompany: '',
  password: '',
  companyName: '',
  companyFunction: '',
  token: '',
  isSignedIn: false,
};

export default function auth(
  state = initialState,
  action: AnyAction,
): AuthState {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return {
        ...state,
        loadingSignInRequest: true,
        signInError: false,
      };
    case '@auth/SIGN_IN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loadingSignInRequest: false,
        signInError: false,
        isSignedIn: true,
      };
    case '@auth/SIGN_IN_FAILURE':
      return {
        ...state,
        signInError: true,
        loadingSignInRequest: false,
      };
    case '@auth/LOGOUT_REQUEST':
      localStorage.removeItem('token');
      return {
        ...state,
        isSignedIn: false,
      };
    case '@auth/SIGN_UP_REQUEST':
      return {
        ...state,
        loadingSignUpRequest: true,
        signUpError: false,
      };
    case '@auth/SIGN_UP_SUCCESS':
      return {
        ...state,
        loadingSignUpRequest: false,
        signUpError: false,
      };
    case '@auth/SIGN_UP_FAILURE':
      return {
        ...state,
        signUpError: true,
        loadingSignUpRequest: false,
        messageSignUp: action.payload.message,
      };
    case '@auth/RESET_PASSWORD_REQUEST':
      return {
        ...state,
        loadingResetPasswordRequest: true,
        resetPasswordError: false,
      };
    case '@auth/RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        loadingResetPasswordRequest: false,
        resetPasswordError: false,
      };
    case '@auth/RESET_PASSWORD_FAILURE':
      return {
        ...state,
        loadingResetPasswordRequest: false,
        resetPasswordError: true,
        messageResetPassword: action.payload.message,
      };
    case '@auth/SET_EMAIL':
      return {
        ...state,
        email: action.payload.email,
      };
    case '@auth/SET_EMAIL_COMPANY':
      return {
        ...state,
        emailCompany: action.payload.emailCompany,
      };
    case '@auth/SET_EMAIL_RESET_PASSWORD':
      return {
        ...state,
        emailResetPassword: action.payload.emailResetPassword,
      };
    case '@auth/SET_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      };
    case '@auth/SET_COMPANY_NAME':
      return {
        ...state,
        companyName: action.payload.companyName,
      };
    case '@auth/SET_COMPANY_FUNCTION':
      return {
        ...state,
        companyFunction: action.payload.companyFunction,
      };
    default:
      return state;
  }
}
