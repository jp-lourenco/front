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

  const handleReinoChange = (reino: string) => {};

  const handleOrdemChange = (ordem: string) => {};

  const handleFamiliaChange = (familia: string) => {};

  const handleSubfamiliaChange = (subfamilia: string) => {};

  const handleGeneroChange = (genero: string) => {};

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
      <ItemStyled label="Reino" name="reino">
        <InputStyled
          value={name}
          onChange={(e) => handleReinoChange(e.target.value)}
          placeholder="Digite o Reino do alimento"
        />
      </ItemStyled>
      <ItemStyled label="Ordem" name="ordem">
        <InputStyled
          value={name}
          onChange={(e) => handleOrdemChange(e.target.value)}
          placeholder="Digite a Ordem do alimento"
        />
      </ItemStyled>
      <ItemStyled label="Família" name="familia">
        <InputStyled
          value={name}
          onChange={(e) => handleFamiliaChange(e.target.value)}
          placeholder="Digite a Família do alimento"
        />
      </ItemStyled>
      <ItemStyled label="Subfamília" name="subfamilia">
        <InputStyled
          value={name}
          onChange={(e) => handleSubfamiliaChange(e.target.value)}
          placeholder="Digite a Subfamília do alimento"
        />
      </ItemStyled>
      <ItemStyled label="Género" name="genero">
        <InputStyled
          value={name}
          onChange={(e) => handleGeneroChange(e.target.value)}
          placeholder="Digite o Género do alimento"
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
