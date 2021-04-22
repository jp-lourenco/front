import React, { useContext } from 'react';
import {
  ButtonStyled,
  FormStyled,
  InputStyled,
  ItemStyled,
  SelectStyled,
} from '../../styles/MyEmployees';
import { CreateEmployeeContext } from './CreateEmployeeModal';
import { MyEmployeesContext } from '../../MyEmployees';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  setName,
  setRole,
  createEmployeeRequest,
} from '../../../../store/modules/employee/actions';
import { Select } from 'antd';

const roles = ['Gerente', 'Funcionário'];

const CreateEmployeeForm: React.FC = () => {
  const { setResult } = useContext(CreateEmployeeContext);

  const { setVisibleCreateModal } = useContext(MyEmployeesContext);

  const { email, name, role } = useSelector((state: any) => state.employee);

  const dispatch = useDispatch();

  const handleEmailChange = (email: string) => {
    dispatch(setEmail({ email }));
  };

  const handleNameChange = (name: string) => {
    dispatch(setName({ name }));
  };

  const handleRoleChange = (role: string) => {
    dispatch(setRole({ role }));
  };

  const handleFinish = () => {
    dispatch(createEmployeeRequest());
    setResult(true);
  };

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
      <ItemStyled
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor digite um email!' },
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
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Por favor digite um nome!' }]}
      >
        <InputStyled
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Digite o nome"
        />
      </ItemStyled>

      <ItemStyled
        label="Cargo"
        name="role"
        rules={[
          {
            required: true,
            message: 'Por selecione o cargo do funcionário!',
          },
        ]}
      >
        <SelectStyled
          value={role}
          onChange={(value) => handleRoleChange(value.toString())}
          placeholder={'Selecione o cargo do funcionário'}
        >
          {roles.map((item) => {
            return (
              <Select.Option onChange={() => {}} value={item} key={item}>
                {item}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>

      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Registar
        </ButtonStyled>
      </ItemStyled>
      <ItemStyled>
        <ButtonStyled onClick={handleCancel}>Cancelar</ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default CreateEmployeeForm;
