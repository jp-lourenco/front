import React, { useContext, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space, Input, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTempMin,
  setTempMax,
  setUmiMin,
  setUmiMax,
  setProductionDescription,
  setProductionEnd,
  setProductionLocation,
  setProductionStart,
  setTitle,
  removeBatchCodes,
  addBatchCodes,
  setBatchCodes,
  editProductionRequest,
  resetFormProduction,
} from '../../../../store/modules/production/actions';
import { BatchCode } from '../../../../store/modules/production/types';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import {
  DatePickerStyled,
  ContentStyled,
  MinusCircleOutlinedStyled,
} from '../../styles/MyProductions';
import { MyProductionsContext } from '../../MyProductions';
import { EditProductionContext } from './EditModal';
import 'moment/locale/pt-br';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pt_BR';

const EditForm: React.FC = () => {
  const {
    title,
    production_start,
    production_location,
    production_description,
    production_end,
    temp_max,
    temp_min,
    umi_max,
    umi_min,
  } = useSelector((state: any) => state.production);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      production_start: production_start && moment(production_start),
      production_end: production_end && moment(production_end),
      production_description: production_description,
      production_location: production_location,
      temp_max: temp_max,
      temp_min: temp_min,
      umi_max: umi_max,
      umi_min: umi_min,
    });
  }, [title]);

  const { productionSelected, setVisibleEditModal } = useContext(
    MyProductionsContext,
  );

  const { setResult } = useContext(EditProductionContext);

  const dispatch = useDispatch();

  const handleBatchCodesChange = (batch_code: BatchCode, index: number) => {
    dispatch(setBatchCodes({ batch_code, index }));
  };

  const handleFinish = () => {
    setResult(true);
    dispatch(editProductionRequest({ _id: productionSelected['key'] }));
  };

  const handleCancel = () => {
    dispatch(resetFormProduction());
    setVisibleEditModal(false);
    setResult(false);
  };

  return (
    <FormStyled
      form={form}
      name="form"
      layout="vertical"
      onFinish={() => handleFinish()}
      initialValues={{}}
    >
      <ItemStyled
        name="title"
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
          defaultValue={title}
          onChange={(item) => dispatch(setTitle({ title: item.target.value }))}
          placeholder="Digite o título"
        />
      </ItemStyled>
      <ItemStyled name="production_start" label="Início da produção">
        <DatePickerStyled
          locale={locale}
          format={'DD-MM-YYYY'}
          onChange={(dateString) =>
            dispatch(
              setProductionStart({ production_start: dateString?.toString() }),
            )
          }
        />
      </ItemStyled>
      <ItemStyled name="production_location" label="Local da produção">
        <InputStyled
          defaultValue={production_location}
          value={production_location}
          onChange={(item) =>
            dispatch(
              setProductionLocation({ production_location: item.target.value }),
            )
          }
          placeholder="Digite o local da produção"
        />
      </ItemStyled>
      <ItemStyled name="production_description" label="Descrição da produção">
        <InputStyled
          defaultValue={production_description}
          value={production_description}
          onChange={(item) =>
            dispatch(
              setProductionDescription({
                production_description: item.target.value,
              }),
            )
          }
          placeholder="Digite a descrição da produção"
        />
      </ItemStyled>
      <ItemStyled name="production_end" label="Fim da produção">
        <DatePickerStyled
          locale={locale}
          format={'DD-MM-YYYY'}
          onChange={(dateString) =>
            dispatch(
              setProductionEnd({ production_end: dateString?.toString() }),
            )
          }
        />
      </ItemStyled>
      <ItemStyled
        name="temp"
        label="Temperatura Ideal"
        style={{ marginBottom: 0 }}
      >
        <ItemStyled
          name="temp_min"
          label="Miníma"
          style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
          <InputNumber
            onChange={(value) =>
              dispatch(
                setTempMin({
                  temp_min: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
        <ItemStyled
          name="temp_max"
          label="Maxíma"
          style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
          <InputNumber
            onChange={(value) =>
              dispatch(
                setTempMax({
                  temp_max: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
      </ItemStyled>
      <ItemStyled label="Humidade Ideal" style={{ marginBottom: 0 }}>
        <ItemStyled
          name="umi_min"
          label="Miníma"
          style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
          <InputNumber
            onChange={(value) =>
              dispatch(
                setUmiMin({
                  umi_min: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
        <ItemStyled
          name="umi_max"
          label="Maxíma"
          style={{ display: 'inline-block', width: 'calc(50%)' }}
        >
          <InputNumber
            onChange={(value) =>
              dispatch(
                setUmiMax({
                  umi_max: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
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
          Adicionar informação
        </ButtonStyled>
      </ItemStyled>
      <ItemStyled>
        <ButtonStyled onClick={handleCancel}>Cancelar</ButtonStyled>
      </ItemStyled>
    </FormStyled>
  );
};

export default EditForm;
