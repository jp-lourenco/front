import React, { useContext, useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBatchCode,
  setAmountProduced,
  setPackingSize,
  setTransformationDescription,
  setProcessedQuantity,
  editBatchTransformerRequest,
  setPackingDate,
  editBatchRequest,
} from '../../../../store/modules/batch/actions';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import { DatePickerStyled } from '../../styles/MyProductions';
import { MyProductionsContext } from '../../MyProductions';
import { EditBatchContext } from './EditBatchModal';
import 'moment/locale/pt-br';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { useUserRole } from '../../../../hooks/useUserRole';

const EditBatchForm: React.FC = () => {
  const userRole = useUserRole();

  const {
    batch_code,
    packing_date,
    packing_size,
    processed_quantity,
    transformation_description,
    amount_produced,
  } = useSelector((state: any) => state.batch);

  const { batchSelected, setVisibleEditBatchModal } = useContext(
    MyProductionsContext,
  );

  const [form] = Form.useForm();
  const [formTransform] = Form.useForm();

  useEffect(() => {
    if (['ADMIN_PRODUCER', 'MANAGER_PRODUCER'].includes(userRole)) {
      form.setFieldsValue({
        batch_code: batch_code,
        amount_produced: amount_produced,
      });
    } else if (
      ['ADMIN_TRANSFORMER', 'MANAGER_TRANSFORMER'].includes(userRole)
    ) {
      formTransform.setFieldsValue({
        packing_date: packing_date && moment(packing_date),
        packing_size: packing_size,
        processed_quantity: processed_quantity,
        transformation_description: transformation_description,
      });
    }
  }, [
    batch_code,
    amount_produced,
    packing_date,
    packing_size,
    processed_quantity,
    transformation_description,
  ]);

  const { setResult } = useContext(EditBatchContext);

  const dispatch = useDispatch();

  const handleFinish = () => {
    setResult(true);
    dispatch(editBatchRequest({ batch_id: batchSelected['key'] }));
  };

  const handleFinishTransformer = () => {
    setResult(true);
    dispatch(editBatchTransformerRequest({ batch_id: batchSelected['key'] }));
  };

  const handleCancel = () => {
    setVisibleEditBatchModal(false);
    setResult(false);
  };

  if (['ADMIN_PRODUCER', 'MANAGER_PRODUCER'].includes(userRole)) {
    return (
      <FormStyled
        form={form}
        name="form"
        layout="vertical"
        onFinish={() => handleFinish()}
        initialValues={{
          batch_code: batch_code,
          amount_produced: amount_produced,
        }}
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
              message: 'Por favor digite o código do lote!',
            },
          ]}
        >
          <InputStyled
            value={batch_code}
            onChange={(item) =>
              dispatch(setBatchCode({ batch_code: item.target.value }))
            }
            placeholder="Digite o código do lote"
          />
        </ItemStyled>
        <ItemStyled name="amount_produced" label="Quantidade Produzida">
          <InputNumber
            onChange={(value) =>
              dispatch(
                setAmountProduced({
                  amount_produced: Number(value),
                }),
              )
            }
          />
        </ItemStyled>

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
  }

  if (['ADMIN_PRODUCER', 'MANAGER_PRODUCER'].includes(userRole)) {
    return (
      <FormStyled
        form={formTransform}
        name="form"
        layout="vertical"
        onFinish={() => handleFinishTransformer()}
        initialValues={{
          transformation_description: transformation_description,
          processed_quantity: processed_quantity,
          packing_size: packing_size,
        }}
      >
        <ItemStyled
          name="transformation_description"
          label="Descrição da transformação"
          required
          tooltip="Este é um campo obrigatório"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor digite a descrição da transformação!',
            },
          ]}
        >
          <InputStyled
            value={transformation_description}
            onChange={(item) =>
              dispatch(
                setTransformationDescription({
                  transformation_description: item.target.value,
                }),
              )
            }
            placeholder="Digite a descrição da transformação"
          />
        </ItemStyled>
        <ItemStyled name="processed_quantity" label="Quantidade Transformada">
          <InputNumber
            onChange={(value) =>
              dispatch(
                setProcessedQuantity({
                  processed_quantity: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
        <ItemStyled name="packing_size" label="Tamnho da embalagem">
          <InputNumber
            onChange={(value) =>
              dispatch(
                setPackingSize({
                  packing_size: Number(value),
                }),
              )
            }
          />
        </ItemStyled>
        <ItemStyled name="packing_date" label="Data de embalamento">
          <DatePickerStyled
            locale={locale}
            format={'DD-MM-YYYY'}
            onChange={(dateString) =>
              dispatch(setPackingDate({ packing_date: dateString?.toString() }))
            }
          />
        </ItemStyled>
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
  }

  return <></>;
};

export default EditBatchForm;
