export function signInRequest() {
  return {
    type: '@auth/SIGN_IN_REQUEST',
  };
}

export function signInSuccess({ token }: { token: string }) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
    },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function logoutRequest() {
  return {
    type: '@auth/LOGOUT_REQUEST',
  };
}

export function signUpRequest() {
  return {
    type: '@auth/SIGN_UP_REQUEST',
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}

export function signUpFailure({ message }: { message: string }) {
  return {
    type: '@auth/SIGN_UP_FAILURE',
    payload: { message },
  };
}

export function resetPasswordRequest() {
  return {
    type: '@auth/RESET_PASSWORD_REQUEST',
  };
}

export function resetPasswordSuccess() {
  return {
    type: '@auth/RESET_PASSWORD_SUCCESS',
  };
}

export function resetPasswordFailure({ message }: { message: string }) {
  return {
    type: '@auth/RESET_PASSWORD_FAILURE',
    payload: { message },
  };
}

export function setEmail({ email }: { email: string }) {
  return {
    type: '@auth/SET_EMAIL',
    payload: { email },
  };
}

export function setEmailResetPassword({
  emailResetPassword,
}: {
  emailResetPassword: string;
}) {
  return {
    type: '@auth/SET_EMAIL_RESET_PASSWORD',
    payload: { emailResetPassword },
  };
}

export function setEmailCompany({ emailCompany }: { emailCompany: string }) {
  return {
    type: '@auth/SET_EMAIL_COMPANY',
    payload: { emailCompany },
  };
}

export function setCompanyName({ companyName }: { companyName: string }) {
  return {
    type: '@auth/SET_COMPANY_NAME',
    payload: { companyName },
  };
}

export function setCompanyFunction({
  companyFunction,
}: {
  companyFunction: string;
}) {
  return {
    type: '@auth/SET_COMPANY_FUNCTION',
    payload: { companyFunction },
  };
}

export function setPassword({ password }: { password: string }) {
  return {
    type: '@auth/SET_PASSWORD',
    payload: { password },
  };
}
