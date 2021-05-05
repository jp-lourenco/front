import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignInContext } from '../../SignIn';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
  SelectStyled,
} from '../../../../styles/App';
import {
  setCompanyEmail,
  setCompanyName,
  setCompanyAddress,
  setCompanyFunction,
  setCompanyZipCode,
  setCompanyNif,
  setCompanyPhone,
  signUpRequest,
} from '../../../../store/modules/auth/actions';
import { Select, Form } from 'antd';
import { SignUpContext } from './SignUpModal';
import { validationNif } from '../../../../helpers';

const companyfunctions = [
  'Produzir',
  'Transportar',
  'Transformar',
  'Armazenar',
  'Vender',
];

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();

  const { setVisibleSignUpModal } = useContext(SignInContext);

  const { setResult } = useContext(SignUpContext);

  const {
    emailCompany,
    companyName,
    companyAddress,
    companyZipCode,
    companyNif,
    companyPhone,
    companyFunction,
  } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleEmailChange = (companyEmail: string) => {
    console.log(companyEmail);
    dispatch(setCompanyEmail({ companyEmail }));
  };

  const handleCompanyNameChange = (companyName: string) => {
    dispatch(setCompanyName({ companyName }));
  };

  const handleAddressChange = (companyAddress: string) => {
    dispatch(setCompanyAddress({ companyAddress }));
  };

  const handleZipCodeChange = (companyZipCode: string) => {
    dispatch(setCompanyZipCode({ companyZipCode }));
  };

  const handleNifChange = (companyNif: string) => {
    dispatch(setCompanyNif({ companyNif }));
  };

  const handlePhoneChange = (companyPhone: string) => {
    dispatch(setCompanyPhone({ companyPhone }));
  };

  const handleCompanyFunctionChange = (companyFunction: string) => {
    dispatch(setCompanyFunction({ companyFunction }));
  };

  const handleFinish = () => {
    dispatch(signUpRequest());
    setResult(true);
  };

  return (
    <FormStyled
      form={form}
      name="basic"
      layout="vertical"
      onFinish={() => handleFinish()}
    >
      <ItemStyled
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor digite seu email!' },
          {
            type: 'email',
            message: 'Por favor digite um email válido!',
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
            message: 'Por favor digite o nome da sua empresa!',
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
        label="Morada"
        name="address"
        rules={[
          {
            required: true,
            message: 'Por favor digite a morada da sua empresa!',
          },
        ]}
      >
        <InputStyled
          value={companyAddress}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Av. Almeida, n 200, 2 DTO"
        />
      </ItemStyled>

      <ItemStyled
        label="Código Postal"
        name="zip_code"
        rules={[
          {
            required: true,
            message: 'Por favor digite o código postal!',
          },
          {
            pattern: new RegExp(/^\d{4}(-\d{3})?$/),
            message: 'Por favor digite um código postal válido!',
          },
        ]}
      >
        <InputStyled
          value={companyZipCode}
          onChange={(e) => handleZipCodeChange(e.target.value)}
          placeholder="5300-259"
        />
      </ItemStyled>

      <ItemStyled
        label="NIF"
        name="nif"
        rules={[
          {
            required: true,
            message: 'Por favor digite o NIF da sua empresa!',
          },
          {
            validator: validationNif,
          },
        ]}
      >
        <InputStyled
          value={companyNif}
          onChange={(e) => handleNifChange(e.target.value)}
          placeholder="Digite o nif da sua empresa"
        />
      </ItemStyled>

      <ItemStyled
        label="Telefone"
        name="phone"
        rules={[
          {
            pattern: new RegExp(/^(?:[92]\d{2}(?:\s?\d{3}){2})$/),
            message: 'Por favor digite um telefone válido!',
          },
        ]}
      >
        <InputStyled
          value={companyPhone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Digite o telefone da sua empresa"
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
