import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import {
  Container,
  ButtonStyled,
  SelectStyled,
  FormStyled,
  ItemStyled,
} from './styles/SearchQrcode';
import api from '../../services/api';
import { Select } from 'antd';

const SearchQrcode: React.FC = () => {
  const [batchSelected, setBatchSelected] = useState<string>();
  const [foodSelected, setFoodSelected] = useState<string>();
  const [categorySelected, setCategorySelected] = useState<string>();

  const [categories, setCategories] = useState<string[]>([]);
  const [foods, setFoods] = useState<string[]>([]);
  const [batchCodes, setbatchCodes] = useState<string[]>([]);

  const [qrcode, setQrcode] = useState<string>();

  useEffect(() => {
    api
      .get('productions/categories', { headers: { user_id: '1' } })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    api
      .get('productions/categories/foods', {
        params: {
          category: categorySelected,
        },
        headers: { user_id: '1' },
      })
      .then((response) => {
        setFoods(response.data.foods);
      })
      .catch((error) => {
        setFoods([]);
      });
  }, [categorySelected]);

  useEffect(() => {
    api
      .get('productions/foods/batch_codes', {
        params: {
          food_name: foodSelected,
        },
        headers: { user_id: '1' },
      })
      .then((response) => {
        setbatchCodes(response.data.batch_codes);
      })
      .catch((error) => {
        setbatchCodes([]);
      });
  }, [foodSelected]);

  const handleFinish = () => {
    setQrcode('');
    api
      .get('productions/batchs/qrcode', {
        params: {
          food_name: foodSelected,
          batch_code: batchSelected,
        },
      })
      .then((response) => {
        setQrcode(response.data.qrcode);
      })
      .catch((error) => {
        setQrcode('');
      });
  };

  return (
    <Container>
      <FormStyled
        name="form"
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{}}
      >
        <ItemStyled
          name="Categoria"
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
            value={categorySelected}
            onChange={(value) => setCategorySelected(value.toString())}
            placeholder={'Por favor selecione uma categoria'}
          >
            {categories.map((item) => {
              return (
                <Select.Option onChange={setCategorySelected} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </SelectStyled>
        </ItemStyled>
        {foods.length > 0 ? (
          <ItemStyled
            name="Alimento"
            label="Alimento"
            required
            tooltip="Este é um campo obrigatório"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor selecione um alimento!',
              },
            ]}
          >
            <SelectStyled
              value={foodSelected}
              onChange={(value) => setFoodSelected(value.toString())}
              placeholder={'Por favor selecione um alimento'}
            >
              {foods.map((item) => {
                return (
                  <Select.Option onChange={setFoodSelected} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </SelectStyled>
          </ItemStyled>
        ) : null}
        {batchCodes.length > 0 ? (
          <ItemStyled
            name="Lote"
            label="Lote"
            required
            tooltip="Este é um campo obrigatório"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor selecione um lote!',
              },
            ]}
          >
            <SelectStyled
              value={batchSelected}
              onChange={(value) => setBatchSelected(value.toString())}
              placeholder={'Por favor selecione um lote'}
            >
              {batchCodes.map((item) => {
                return (
                  <Select.Option onChange={setCategorySelected} value={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </SelectStyled>
          </ItemStyled>
        ) : null}
        <ItemStyled>
          <ButtonStyled type="primary" htmlType="submit">
            Pesquisar
          </ButtonStyled>
        </ItemStyled>
      </FormStyled>
      {qrcode ? <QRCode value={qrcode} /> : null}
    </Container>
  );
};

export default SearchQrcode;
