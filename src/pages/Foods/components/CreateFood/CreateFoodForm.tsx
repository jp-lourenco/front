import React, { useContext } from 'react';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import { CreateFoodContext } from './CreateFoodModal';
import { FoodsContext } from '../../Foods';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setCategory,
  createFoodRequest,
} from '../../../../store/modules/food/actions';

const CreateFoodForm: React.FC = () => {
  const { setResult } = useContext(CreateFoodContext);

  const { setVisibleCreateModal } = useContext(FoodsContext);

  const { name, category } = useSelector((state: any) => state.food);

  const dispatch = useDispatch();

  const handleNameChange = (name: string) => {
    dispatch(setName({ name }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory({ category }));
  };

  const handleFinish = () => {
    dispatch(createFoodRequest());
    setResult(true);
  };

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  return (
    <FormStyled name="basic" layout="vertical" onFinish={handleFinish}>
      <ItemStyled
        label="Nome"
        name="food_name"
        rules={[
          {
            required: true,
            message: 'Por favor digite o nome do alimento!',
          },
        ]}
      >
        <InputStyled
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Digite o nome do alimento"
        />
      </ItemStyled>
      <ItemStyled
        label="Categoria"
        name="category"
        rules={[
          {
            required: true,
            message: 'Por favor digite a categoria do alimento!',
          },
        ]}
      >
        <InputStyled
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          placeholder="Digite a categoria do alimento"
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

export default CreateFoodForm;
