import React, { useContext } from 'react';
import { SignInContext } from '../SignIn';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../styles/App';
import { Container, ForgotPasswordStyled, Image } from '../styles/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  setPassword,
  signInRequest,
} from '../../../store/modules/auth/actions';

const SignInForm: React.FC = () => {
  const { setVisibleSignUpModal, setVisibleForgotPasswordModal } = useContext(
    SignInContext,
  );

  const { email, password, loadingSignInRequest } = useSelector(
    (state: any) => state.auth,
  );

  const dispatch = useDispatch();

  const handleEmailChange = (email: string) => {
    dispatch(setEmail({ email }));
  };

  const handlePasswordChange = (password: string) => {
    dispatch(setPassword({ password }));
  };

  const handleFinish = () => {
    dispatch(signInRequest());
  };

  return (
    <Container>
      <Image src="/logo_Biom.png" alt="Imagem" />
      <FormStyled
        name="basic"
        layout="vertical"
        onFinish={() => handleFinish()}
      >
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
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="Digite o email"
          />
        </ItemStyled>

        <ItemStyled
          label="Palavra-passe"
          name="senha"
          rules={[
            { required: true, message: 'Por favor coloque sua palavra-passe!' },
          ]}
        >
          <InputStyled.Password
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Digite a palavra-passe"
          />
        </ItemStyled>

        <ItemStyled>
          <ForgotPasswordStyled
            type="link"
            onClick={() => setVisibleForgotPasswordModal(true)}
          >
            Esqueceu a palavra-passe?
          </ForgotPasswordStyled>
        </ItemStyled>

        <ItemStyled>
          <ButtonStyled
            type="primary"
            htmlType="submit"
            loading={loadingSignInRequest}
          >
            Entrar
          </ButtonStyled>
        </ItemStyled>

        <ItemStyled>
          <ButtonStyled type="link" onClick={() => setVisibleSignUpModal(true)}>
            Solicitar Acesso
          </ButtonStyled>
        </ItemStyled>
      </FormStyled>
    </Container>
  );
};

export default SignInForm;
