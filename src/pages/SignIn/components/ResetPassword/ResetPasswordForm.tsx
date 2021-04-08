import React, { useContext } from 'react';
import { SignInContext } from '../../SignIn';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../styles/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailResetPassword,
  resetPasswordRequest,
} from '../../../../store/modules/auth/actions';
import { ResetPasswordContext } from './ResetPasswordModal';

const ResetPasswordForm: React.FC = () => {
  const { setVisibleResetPasswordModal } = useContext(SignInContext);

  const { setResult } = useContext(ResetPasswordContext);

  const { emailResetPassword } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleEmailChange = (emailResetPassword: string) => {
    dispatch(setEmailResetPassword({ emailResetPassword }));
  };

  const handleFinish = () => {
    dispatch(resetPasswordRequest());
    setResult(true);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={() => handleFinish()}>
      <ItemStyled
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor coloque seu email!' },
          {
            type: 'email',
            message: 'Digite um email válido!',
          },
        ]}
      >
        <InputStyled
          value={emailResetPassword}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Digite o email"
        />
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Recuperar conta
        </ButtonStyled>
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled
          type="link"
          onClick={() => setVisibleResetPasswordModal(false)}
        >
          Cancelar
        </ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default ResetPasswordForm;
