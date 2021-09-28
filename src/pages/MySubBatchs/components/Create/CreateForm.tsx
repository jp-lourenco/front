import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Select, Space, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ButtonStyled,
  SelectStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import {
  ContentStyled,
  DatePickerStyled,
  MinusCircleOutlinedStyled,
} from '../../styles/MySubBatchs';
import api from '../../../../services/api';
import {
  addBatchCodes,
  createSubBatchRequest,
  removeBatchCodes,
  resetFormSubBacth,
  setBatchCodes,
  setBatchCode,
  setAmountTrasformed,
  setTransformationStart,
  setTransformationEnd,
  setProductName,
  setTransformationDescription,
  setSubBatchCode,
} from '../../../../store/modules/subbatch/actions';

import { CreateSubBatchContext } from '../Create/CreateModal';
import { MySubBatchsContext } from '../../MySubBatchs';

import 'moment/locale/pt-br';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pt_BR';

interface ResponseFoods {
  _id: string;
  category: string;
  created: string;
  food_name: string;
  updated: string;
}

const FormCreateProduction: React.FC = () => {
  const { product_name, batch_code, batch_codes, batchs, amount_transformed } =
    useSelector((state: any) => state.subbatch);

  const { setResult } = useContext(CreateSubBatchContext);

  const { setVisibleCreateModal } = useContext(MySubBatchsContext);

  const [batchCodesAvailable, setBatchCodesAvailable] = useState<any[]>([]);

  const [allBatchCodesAvailable, setAllBatchCodesAvailable] = useState<any[]>(
    [],
  );

  const [batchCodeSelected, setBatchCodeSelected] = useState<any>({});

  const [amountTransformedMax, setAmountTransformedMax] = useState(1);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const headerParams = {
      Authorization: 'Bearer ' + token,
    };
    api
      .get('batchsByCurrentState', { headers: headerParams })
      .then((response) => {
        setBatchCodesAvailable(response.data);
        setAllBatchCodesAvailable(response.data);
      })
      .catch((error) => {});
  }, []);

  const handleBatchCodeChange = (batch_code: string) => {
    const batchSelected = batchCodesAvailable.filter(
      (item) => item._id == batch_code,
    );
    setAmountTransformedMax(batchSelected[0].amount_avaiable);
    dispatch(setBatchCode({ batch_code }));
    setBatchCodeSelected(batchSelected[0]);
  };

  const handleProductNameChange = (product_name: string) => {
    dispatch(setProductName({ product_name }));
  };

  const handleSubBatchCodeChange = (subbatch_code: string) => {
    dispatch(setSubBatchCode({ subbatch_code }));
  };

  const handleTransformationDescriptionChange = (
    transformation_description: string,
  ) => {
    dispatch(setTransformationDescription({ transformation_description }));
  };

  const handleBatchCodesChange = (_id: string, index: number) => {
    const batchSelected = batchCodesAvailable.filter((item) => item._id == _id);
    if (batchSelected != undefined) {
      const batch_code = {
        batch_code: _id,
        amount_avaiable: batchSelected[0].amount_avaiable,
        amount_produced: batchSelected[0].amount_produced,
        amount_transformed: 1,
      };
      dispatch(setBatchCodes({ batch_code, index }));
    }
  };

  const handleBatchCodesAmountTransformedChange = (
    _id: string,
    index: number,
    amount_transformed: any,
  ) => {
    const batchSelected = batchCodesAvailable.filter((item) => item._id == _id);
    if (batchSelected != undefined) {
      const batch_code = {
        batch_code: _id,
        amount_avaiable: batchSelected[0].amount_avaiable,
        amount_produced: batchSelected[0].amount_produced,
        amount_transformed: amount_transformed,
      };
      dispatch(setBatchCodes({ batch_code, index }));
    }
  };

  const handleFinish = () => {
    dispatch(createSubBatchRequest());
    setResult(true);
  };

  const handleCancel = () => {
    dispatch(resetFormSubBacth());
    setVisibleCreateModal(false);
    setResult(false);
  };

  const getBatchsAvailable = () => {
    let flag;
    return allBatchCodesAvailable.filter((item) => {
      flag = true;
      if (item._id == batch_code) {
        flag = false;
        return flag;
      }
      console.log(batch_codes);
      batch_codes.forEach((e: any) => {
        if (item._id == e.batch_code) {
          flag = false;
          return flag;
        }
      });
      return flag;
    });
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
        name="batch_code"
        label="Código do lote"
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
          onChange={(value) => {
            handleBatchCodeChange(value.toString());
          }}
          placeholder={'Por favor selecione um lote'}
          disabled={batch_codes.length > 0 ? true : false}
        >
          {batchCodesAvailable.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id}>
                {`${item.batch_code} (${item.amount_avaiable} Kg)`}
              </Select.Option>
            );
          })}
        </SelectStyled>
      </ItemStyled>
      <ItemStyled
        name="amount_transformed"
        label="Quantidade Transformada"
        style={{ display: 'inline-block', width: '100%' }}
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
      >
        <InputNumber
          min={1}
          max={amountTransformedMax}
          onChange={(value) => {
            dispatch(
              setAmountTrasformed({ amount_transformed: Number(value) }),
            );
          }}
        />
      </ItemStyled>
      <Form.List name="batch_codes">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <>
                <Space
                  key={field.key}
                  style={{
                    display: 'flex',
                    marginBottom: 2,
                    flexDirection: 'column',
                  }}
                  align="baseline"
                >
                  <Form.Item>
                    <ContentStyled style={{ marginBottom: 10 }}>
                      <ItemStyled
                        {...field}
                        name={[field.name, 'subbatch_code']}
                        label="Código do lote"
                        fieldKey={[field.fieldKey, 'Código do lote']}
                        rules={[
                          {
                            required: true,
                            message: 'Digite o código do lote!',
                          },
                        ]}
                        hasFeedback
                      >
                        <SelectStyled
                          value={batchs}
                          onChange={(value) =>
                            handleBatchCodesChange(value.toString(), index)
                          }
                          placeholder={'Por favor selecione um lote'}
                          disabled={index + 2 == fields.length ? true : false}
                        >
                          {batchCodesAvailable.map((item) => {
                            return (
                              <Select.Option
                                key={item._id}
                                onChange={handleBatchCodesChange}
                                value={item._id}
                              >
                                {`${item.batch_code} (${item.amount_avaiable} Kg)`}
                              </Select.Option>
                            );
                          })}
                        </SelectStyled>
                      </ItemStyled>
                    </ContentStyled>
                    <ItemStyled
                      {...field}
                      name={[field.name, 'amount_transformed']}
                      label="Quantidade Transformada"
                      fieldKey={[field.fieldKey, 'Quantidade Transformada']}
                      rules={[
                        {
                          required: true,
                          message: 'Digite a quantidade transformada!',
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber
                        min={1}
                        max={batch_codes[index].amount_avaiable}
                        onChange={(value) => {
                          handleBatchCodesAmountTransformedChange(
                            batch_codes[index].batch_code,
                            index,
                            value,
                          );
                        }}
                      />
                    </ItemStyled>
                  </Form.Item>
                </Space>
              </>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  var flag;
                  const batchsAvailable = getBatchsAvailable();
                  setBatchCodesAvailable(batchsAvailable);
                  add();
                  dispatch(addBatchCodes());
                }}
                block
                icon={<PlusOutlined />}
                disabled={
                  batch_code == '' ||
                  amount_transformed == 0 ||
                  batchCodesAvailable.length == 1
                    ? true
                    : false
                }
              >
                Adicionar Lote
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <ItemStyled
        name="subbatch_code"
        label="Código do Sublote"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor digite o código!',
          },
        ]}
      >
        <InputStyled
          value={product_name}
          onChange={(e) => handleSubBatchCodeChange(e.target.value)}
          placeholder="Digite o código"
        />
      </ItemStyled>

      <ItemStyled
        name="product_name"
        label="Nome do produto"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor digite o nome!',
          },
        ]}
      >
        <InputStyled
          value={product_name}
          onChange={(e) => handleProductNameChange(e.target.value)}
          placeholder="Digite o nome"
        />
      </ItemStyled>

      <ItemStyled
        name="transformation_start"
        label="Início da transformação"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor selecione uma data!',
          },
        ]}
      >
        <DatePickerStyled
          locale={locale}
          format={'DD-MM-YYYY'}
          onChange={(dateString) =>
            dispatch(
              setTransformationStart({
                transformation_start: dateString?.toString(),
              }),
            )
          }
        />
      </ItemStyled>

      <ItemStyled
        name="transformation_end"
        label="Fim da transformação"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor selecione uma data!',
          },
        ]}
      >
        <DatePickerStyled
          locale={locale}
          format={'DD-MM-YYYY'}
          onChange={(dateString) =>
            dispatch(
              setTransformationEnd({
                transformation_end: dateString?.toString(),
              }),
            )
          }
        />
      </ItemStyled>

      <ItemStyled
        name="transformation_description"
        label="Descrição da transformação"
        required
        tooltip="Este é um campo obrigatório"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor digite a descrição!',
          },
        ]}
      >
        <InputStyled
          value={product_name}
          onChange={(e) =>
            handleTransformationDescriptionChange(e.target.value)
          }
          placeholder="Digite a descrição"
        />
      </ItemStyled>

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
