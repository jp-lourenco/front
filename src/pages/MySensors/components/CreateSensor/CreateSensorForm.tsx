import React, { useContext } from 'react';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import { CreateSensorContext } from './CreateSensorModal';
import { MySensorsContext } from '../../MySensors';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIdentificador,
  createSensorRequest,
} from '../../../../store/modules/sensor/actions';

const CreateSensorForm: React.FC = () => {
  const { setResult } = useContext(CreateSensorContext);

  const { setVisibleCreateModal } = useContext(MySensorsContext);

  const { id } = useSelector((state: any) => state.sensor);

  const dispatch = useDispatch();

  const handleIdentificadorChange = (id: string) => {
    dispatch(setIdentificador({ id }));
  };

  const handleFinish = () => {
    dispatch(createSensorRequest());
    setResult(true);
  };

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
      <ItemStyled
        label="Identificador"
        name="id"
        rules={[
          {
            required: true,
            message: 'Por favor digite o identificador do sensor!',
          },
        ]}
      >
        <InputStyled
          value={id}
          onChange={(e) => handleIdentificadorChange(e.target.value)}
          placeholder="Digite o identificador do sensor"
        />
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

export default CreateSensorForm;
