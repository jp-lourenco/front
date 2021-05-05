import { AuthState } from './types';
import { AnyAction } from 'redux';

const initialState: AuthState = {
  loadingSignInRequest: false,
  loadingSignUpRequest: false,
  loadingForgotPasswordRequest: false,
  loadingVerifyCodeRequest: false,
  loadingChangePasswordRequest: false,
  signInError: false,
  signUpError: false,
  forgotPasswordError: false,
  verifyCodeError: false,
  changePasswordError: false,
  msgSignUp: '',
  email: '',
  emailForgotPassword: '',
  stepForgotPassword: 'Email',
  code: '',
  newPassword: '',
  resultChangePassword: false,
  companyEmail: '',
  companyAddress: '',
  companyNif: '',
  companyZipCode: '',
  companyPhone: '',
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
        msgSignUp: action.payload.msg,
      };
    case '@auth/FORGET_PASSWORD_REQUEST':
      return {
        ...state,
        loadingForgotPasswordRequest: true,
        forgotPasswordError: false,
      };
    case '@auth/FORGET_PASSWORD_SUCCESS':
      return {
        ...state,
        loadingForgotPasswordRequest: false,
        stepForgotPassword: 'Code',
        forgotPasswordError: false,
      };
    case '@auth/FORGET_PASSWORD_FAILURE':
      return {
        ...state,
        loadingForgotPasswordRequest: false,
        forgotPasswordError: true,
      };
    case '@auth/VERIFY_CODE_REQUEST':
      return {
        ...state,
        loadingVerifyCodeRequest: true,
        verifyCodeError: false,
      };
    case '@auth/VERIFY_CODE_SUCCESS':
      return {
        ...state,
        loadingVerifyCodeRequest: false,
        stepForgotPassword: 'Password',
        verifyCodeError: false,
      };
    case '@auth/VERIFY_CODE_FAILURE':
      return {
        ...state,
        loadingVerifyCodeRequest: false,
        verifyCodeError: true,
      };
    case '@auth/CHANGE_PASSWORD_REQUEST':
      return {
        ...state,
        loadingChangePasswordRequest: true,
        changePasswordError: false,
      };
    case '@auth/CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        loadingChangePasswordRequest: false,
        stepForgotPassword: 'Email',
        changePasswordError: false,
        resultChangePassword: true,
      };
    case '@auth/CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        loadingChangePasswordRequest: false,
        changePasswordError: true,
      };
    case '@auth/SET_EMAIL':
      return {
        ...state,
        email: action.payload.email,
      };
    case '@auth/SET_COMPANY_EMAIL':
      return {
        ...state,
        companyEmail: action.payload.companyEmail,
      };
    case '@auth/SET_COMPANY_ADDRESS':
      return {
        ...state,
        companyAddress: action.payload.companyAddress,
      };
    case '@auth/SET_COMPANY_ZIP_CODE':
      return {
        ...state,
        companyZipCode: action.payload.companyZipCode,
      };
    case '@auth/SET_COMPANY_NIF':
      return {
        ...state,
        companyNif: action.payload.companyNif,
      };
    case '@auth/SET_COMPANY_PHONE':
      return {
        ...state,
        companyPhone: action.payload.companyPhone,
      };
    case '@auth/SET_EMAIL_FORGET_PASSWORD':
      return {
        ...state,
        emailForgotPassword: action.payload.emailForgotPassword,
      };
    case '@auth/RESET_RESULT_CHANGE_PASSWORD':
      return {
        ...state,
        resultChangePassword: false,
      };
    case '@auth/SET_STEP_FORGOT_PASSWORD':
      return {
        ...state,
        stepForgotPassword: action.payload.step,
      };
    case '@auth/SET_NEW_PASSWORD':
      return {
        ...state,
        newPassword: action.payload.newPassword,
      };
    case '@auth/SET_CODE_FORGET_PASSWORD':
      return {
        ...state,
        code: action.payload.codeForgotPassword,
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
