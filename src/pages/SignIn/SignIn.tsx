import React, { createContext, useState } from 'react';
import ForgotPasswordModal from './components/ForgotPassword/ForgotPasswordModal';
import SignInForm from './components/SignInForm';
import SignUpModal from './components/SignUp/SignUpModal';

export const SignInContext = createContext({
  visibleSignUpModal: false,
  setVisibleSignUpModal: (visibleSignUpModal: boolean) => {},
  visibleForgotPasswordModal: false,
  setVisibleForgotPasswordModal: (visibleForgotPasswordModal: boolean) => {},
});

const SignIn: React.FC = () => {
  const [visibleSignUpModal, setVisibleSignUpModal] = useState(false);
  const [visibleForgotPasswordModal, setVisibleForgotPasswordModal] = useState(
    false,
  );

  return (
    <SignInContext.Provider
      value={{
        visibleSignUpModal,
        setVisibleSignUpModal,
        visibleForgotPasswordModal,
        setVisibleForgotPasswordModal,
      }}
    >
      <SignInForm />
      <ForgotPasswordModal />
      <SignUpModal />
    </SignInContext.Provider>
  );
};

export default SignIn;
