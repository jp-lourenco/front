import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignInContext } from '../../SignIn';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
  SelectStyled,
} from '../../styles/SignIn';
import {
  setEmailCompany,
  setCompanyName,
  setCompanyFunction,
  signUpRequest,
} from '../../../../store/modules/auth/actions';
import { Select } from 'antd';
import { SignUpContext } from './SignUpModal';

const companyfunctions = [
  'Produzir',
  'Transportar',
  'Transformar',
  'Armazenar',
  'Vender',
];

const SignUpForm: React.FC = () => {
  const { setVisibleSignUpModal } = useContext(SignInContext);

  const { setResult } = useContext(SignUpContext);

  const { emailCompany, companyName, companyFunction } = useSelector(
    (state: any) => state.auth,
  );

  const dispatch = useDispatch();

  const handleEmailChange = (emailCompany: string) => {
    dispatch(setEmailCompany({ emailCompany }));
  };

  const handleCompanyNameChange = (companyName: string) => {
    dispatch(setCompanyName({ companyName }));
  };

  const handleCompanyFunctionChange = (companyFunction: string) => {
    dispatch(setCompanyFunction({ companyFunction }));
  };

  const handleFinish = () => {
    dispatch(signUpRequest());
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
          value={emailCompany}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Digite o email"
        />
      </ItemStyled>

      <ItemStyled
        label="Nome da Empresa"
        name="name"
        rules={[
          {
            required: true,
            message: 'Por favor coloque o nome da sua empresa!',
          },
        ]}
      >
        <InputStyled
          value={companyName}
          onChange={(e) => handleCompanyNameChange(e.target.value)}
          placeholder="Digite o nome da sua empresa"
        />
      </ItemStyled>

      <ItemStyled
        label="Função da Empresa"
        name="function"
        rules={[
          {
            required: true,
            message: 'Por selecione a função da sua empresa!',
          },
        ]}
      >
        <SelectStyled
          value={companyFunction}
          onChange={(value) => handleCompanyFunctionChange(value.toString())}
          placeholder={'Selecione a função da sua empresa'}
        >
          {companyfunctions.map((item) => {
            return (
              <Select.Option
                onChange={handleCompanyFunctionChange}
                value={item}
                key={item}
              >
                {item}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Solicitar Acesso
        </ButtonStyled>
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="link" onClick={() => setVisibleSignUpModal(false)}>
          Já tenho conta!
        </ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default SignUpForm;
