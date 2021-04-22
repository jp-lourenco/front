import React, { useContext } from 'react';
import { SignInContext } from '../../SignIn';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
  Text,
  ListItem,
  List,
} from '../../styles/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordRequest,
  setEmailForgotPassword,
  setCodeForgotPassword,
  verifyCodeRequest,
  changePasswordRequest,
  setNewPassword,
  setStepForgotPassword,
} from '../../../../store/modules/auth/actions';

const ForgotPasswordForm: React.FC = () => {
  const { setVisibleForgotPasswordModal } = useContext(SignInContext);

  const {
    emailForgotPassword,
    codeForgotPassword,
    stepForgotPassword,
    newPassword,
    loadingForgotPasswordRequest,
    loadingVerifyCodeRequest,
    loadingChangePasswordRequest,
  } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleEmailChange = (emailForgotPassword: string) => {
    dispatch(setEmailForgotPassword({ emailForgotPassword }));
  };

  const handleCodeChange = (codeForgotPassword: string) => {
    dispatch(setCodeForgotPassword({ codeForgotPassword }));
  };

  const handlePasswordChange = (newPassword: string) => {
    dispatch(setNewPassword({ newPassword }));
  };

  const handleFinishFirstStep = () => {
    dispatch(forgotPasswordRequest());
  };

  const handleFinishSecondStep = () => {
    dispatch(verifyCodeRequest());
  };

  const handleFinishThirdStep = () => {
    dispatch(changePasswordRequest());
  };

  const handleCancel = () => {
    setVisibleForgotPasswordModal(false);
    dispatch(setStepForgotPassword({ step: 'Email' }));
  };

  if (stepForgotPassword === 'Email') {
    return (
      <>
        <Text>Não se preocupe, acontece com o melhor de nós.</Text>
        <FormStyled
          name="basic"
          layout="vertical"
          onFinish={() => handleFinishFirstStep()}
        >
          <ItemStyled
            label="Seu email"
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
              value={emailForgotPassword}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Digite o seu email"
            />
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled
              type="primary"
              htmlType="submit"
              loading={loadingForgotPasswordRequest}
            >
              Enviar
            </ButtonStyled>
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled
              type="link"
              onClick={() => setVisibleForgotPasswordModal(false)}
            >
              Cancelar
            </ButtonStyled>
          </ItemStyled>
        </FormStyled>
      </>
    );
  } else if (stepForgotPassword === 'Code') {
    return (
      <>
        <Text>
          Digite o código de verificação que nós enviamos no seu endereço de
          email.
        </Text>
        <FormStyled
          name="basic"
          layout="vertical"
          onFinish={() => handleFinishSecondStep()}
        >
          <ItemStyled
            label="Código"
            name="code"
            rules={[{ required: true, message: 'Por favor coloque o código!' }]}
          >
            <InputStyled
              value={codeForgotPassword}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="Digite o código"
            />
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled
              type="primary"
              htmlType="submit"
              loading={loadingVerifyCodeRequest}
            >
              Enviar
            </ButtonStyled>
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled type="link" onClick={() => handleCancel()}>
              Cancelar
            </ButtonStyled>
          </ItemStyled>
        </FormStyled>
      </>
    );
  } else {
    return (
      <>
        <Text>
          Para proteger sua conta, certifique-se de sua palavra-passe:
        </Text>
        <List>
          <ListItem>
            <Text>Contém entre 8 e 20 caracteres</Text>
          </ListItem>
          <ListItem>
            <Text>Contém pelo menos 1 letra maiúscula</Text>
          </ListItem>
          <ListItem>
            <Text>Contém pelo menos 1 letra minúscula</Text>
          </ListItem>
          <ListItem>
            <Text>Contém pelo menos 1 número</Text>
          </ListItem>
          <ListItem>
            <Text>Contém pelo menos 1 desses símbolos: $@#%</Text>
          </ListItem>
        </List>
        <FormStyled
          name="basic"
          layout="vertical"
          onFinish={() => handleFinishThirdStep()}
        >
          <ItemStyled
            label="Nova Palavra-passe"
            name="new_password"
            rules={[
              {
                required: true,
                message: 'Por favor digite sua nova palavra-passe!',
              },
            ]}
          >
            <InputStyled.Password
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Digite a nova palavra-passe"
            />
          </ItemStyled>

          <ItemStyled
            name="confirm"
            label="Confirmar Palavra-passe"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor confirme sua palavra-passe!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'A confirmação e a palavra-passe não são iguais!',
                    ),
                  );
                },
              }),
            ]}
          >
            <InputStyled.Password placeholder="Confirmar a palavra-passe" />
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled
              type="primary"
              htmlType="submit"
              loading={loadingChangePasswordRequest}
            >
              Trocar Palavra-passe
            </ButtonStyled>
          </ItemStyled>

          <ItemStyled>
            <ButtonStyled type="link" onClick={() => handleCancel()}>
              Cancelar
            </ButtonStyled>
          </ItemStyled>
        </FormStyled>
      </>
    );
  }
};

export default ForgotPasswordForm;
