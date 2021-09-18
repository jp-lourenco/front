import React, { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTransformationDescription,
  setTransformationEnd,
  setTransformationStart,
  setProductName,
  editSubBatchRequest,
  resetFormSubBacth,
  setGtin,
  setSscc,
  setExpirationDate,
} from '../../../../store/modules/subbatch/actions';
import {
  ButtonStyled,
  FormStyled,
  ItemStyled,
  InputStyled,
} from '../../../../styles/App';
import { DatePickerStyled } from '../../styles/MySubBatchs';
import { MySubBatchsContext } from '../../MySubBatchs';
import { EditSubBatchContext } from './EditModal';
import 'moment/locale/pt-br';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pt_BR';

const EditForm: React.FC = () => {
  const {
    product_name,
    transformation_start,
    transformation_end,
    transformation_description,
    packing_size,
    gtin,
    sscc,
    expiration_date,
  } = useSelector((state: any) => state.subbatch);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      product_name: product_name,
      transformation_start:
        transformation_start && moment(transformation_start),
      transformation_end: transformation_end && moment(transformation_end),
      transformation_description: transformation_description,
      gtin: gtin,
      sscc: sscc,
      expiration_date: expiration_date && moment(expiration_date),
    });
  }, [product_name]);

  const { subBatchSelected, setVisibleEditModal } =
    useContext(MySubBatchsContext);

  const { setResult } = useContext(EditSubBatchContext);

  const dispatch = useDispatch();

  const handleFinish = () => {
    setResult(true);
    dispatch(editSubBatchRequest({ _id: subBatchSelected['key'] }));
  };

  const handleCancel = () => {
    dispatch(resetFormSubBacth());
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
          defaultValue={product_name}
          onChange={(item) =>
            dispatch(setProductName({ product_name: item.target.value }))
          }
          placeholder="Digite o nome"
        />
      </ItemStyled>
      <ItemStyled name="gtin" label="GTIN">
        <InputStyled
          defaultValue={gtin}
          value={gtin}
          onChange={(item) => dispatch(setGtin({ gtin: item.target.value }))}
          placeholder="Digite o GTIN do produto"
        />
      </ItemStyled>

      <ItemStyled name="sscc" label="SSCC">
        <InputStyled
          defaultValue={sscc}
          value={sscc}
          onChange={(item) => dispatch(setSscc({ sscc: item.target.value }))}
          placeholder="Digite o SSCC do produto"
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
            message: 'Por favor digite o nome!',
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
        name="transformation_description"
        label="Descrição da transformação"
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
          defaultValue={transformation_description}
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
      <ItemStyled
        name="transformation_end"
        label="Fim da transformação"
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

      <ItemStyled name="expiration_date" label="Data de validade">
        <DatePickerStyled
          locale={locale}
          format={'DD-MM-YYYY'}
          onChange={(dateString) =>
            dispatch(
              setExpirationDate({ expiration_date: dateString?.toString() }),
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
};

export default EditForm;
