import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Select, Space, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ButtonStyled,
  SelectStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
  ContentStyled,
  MinusCircleOutlinedStyled,
} from '../../styles/MyProductions';
import api from '../../../../services/api';
import {
  addBatchCodes,
  createProductionRequest,
  removeBatchCodes,
  resetFormProduction,
  setBatchCodes,
  setCategory,
  setFood,
  setTitle,
} from '../../../../store/modules/production/actions';
import { BatchCode } from '../../../../store/modules/production/types';
import { CreateProductionContext } from '../Create/CreateModal';
import { MyProductionsContext } from '../../MyProductions';

interface ResponseFoods {
  _id: string;
  category: string;
  created: string;
  food_name: string;
  updated: string;
}

const FormCreateProduction: React.FC = () => {
  const { title, category, food_name } = useSelector(
    (state: any) => state.production,
  );

  const { setResult } = useContext(CreateProductionContext);

  const { setVisibleCreateModal } = useContext(MyProductionsContext);

  const [categories, setCategories] = useState<string[]>([]);

  const [categorySelected, setCategorySelected] = useState('');

  const [foodsByCategory, setFoodsByCategory] = useState<string[]>([]);

  const [foods, setFoods] = useState<ResponseFoods[]>([]);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    api
      .get('foods')
      .then((response) => {
        setFoods(response.data);

        const res = new Set<string>();

        response.data.forEach((item: ResponseFoods) => {
          res.add(item.category);
        });

        const categories = Array.from(res);

        setCategories(categories);
      })
      .catch((error) => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    const res: string[] = [];
    foods.forEach((item) => {
      if (item.category === categorySelected) {
        res.push(item.food_name);
      }
    });
    setFoodsByCategory(res);
  }, [categorySelected]);

  useEffect(() => {
    dispatch(setFood({ food_name: foodsByCategory[0] }));
    form.setFieldsValue({
      alimento: foodsByCategory[0],
    });
  }, [foodsByCategory]);

  const handleTitleChange = (title: string) => {
    dispatch(setTitle({ title }));
  };

  const handleCategoryChange = (category: string) => {
    setCategorySelected(category);
    dispatch(setCategory({ category }));
  };

  const handleFoodChange = (food_name: string) => {
    dispatch(setFood({ food_name }));
  };

  const handleBatchCodesChange = (batch_code: BatchCode, index: number) => {
    dispatch(setBatchCodes({ batch_code, index }));
  };

  const handleFinish = () => {
    dispatch(createProductionRequest());
    setResult(true);
  };

  const handleCancel = () => {
    dispatch(resetFormProduction());
    setVisibleCreateModal(false);
    setResult(false);
  };

  return (
    <FormStyled
      form={form}
      name="dynamic_form_nest_item"
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{}}
    >
      <ItemStyled
        name="titulo"
        label="Título"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor digite o título!',
          },
        ]}
      >
        <InputStyled
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Digite o título"
        />
      </ItemStyled>
      <ItemStyled
        name="categoria"
        label="Categoria"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor selecione uma categoria!',
          },
        ]}
      >
        <SelectStyled
          value={category}
          onChange={(value) => handleCategoryChange(value.toString())}
          placeholder={'Por favor selecione uma categoria'}
        >
          {categories.map((item) => {
            return (
              <Select.Option
                key={item}
                onChange={handleCategoryChange}
                value={item}
              >
                {item}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>
      <ItemStyled
        name="alimento"
        label="Alimento"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor selecione uma alimento!',
          },
        ]}
      >
        <SelectStyled
          value={food_name}
          onChange={(value) => handleFoodChange(value.toString())}
          placeholder={'Por favor selecione um alimento'}
        >
          {foodsByCategory.map((item) => {
            return (
              <Select.Option
                key={item}
                onChange={handleFoodChange}
                value={item}
              >
                {item}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>
      <Form.List name="batch_codes">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...field}
                  name={[field.name, 'batch_code']}
                  label="Código do lote"
                  fieldKey={[field.fieldKey, 'Código do lote']}
                  rules={[
                    { required: true, message: 'Digite o código do lote!' },
                  ]}
                >
                  <ContentStyled>
                    <Input
                      placeholder="Código do lote"
                      onChange={(e) =>
                        handleBatchCodesChange(
                          { batch_code: e.target.value },
                          index,
                        )
                      }
                    />
                    <MinusCircleOutlinedStyled
                      onClick={() => {
                        remove(field.name);
                        dispatch(removeBatchCodes({ index }));
                      }}
                    />
                  </ContentStyled>
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  dispatch(addBatchCodes());
                }}
                block
                icon={<PlusOutlined />}
              >
                Adicionar Lote
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <ItemStyled>
        <ButtonStyled type="primary" htmlType="submit">
          Criar
        </ButtonStyled>
      </ItemStyled>
      <ItemStyled>
        <ButtonStyled onClick={handleCancel}>Cancelar</ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default FormCreateProduction;
