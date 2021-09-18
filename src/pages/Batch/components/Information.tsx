import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BatchContext } from '../Batch';
import {
  ContainerText,
  LabelInformation,
  TextInformation,
  ContainerInformation,
} from '../styles/Batch';

const Information: React.FC = () => {
  const { batch } = useContext(BatchContext);

  return (
    <ContainerInformation>
      {!batch.product_name ? (
        <>
          <ContainerText>
            <LabelInformation>Nome local:</LabelInformation>
            <TextInformation>{batch.food_name}</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Reino:</LabelInformation>
            <TextInformation>Plantae</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Ordem:</LabelInformation>
            <TextInformation>Rosales</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Família:</LabelInformation>
            <TextInformation>Rosaceae</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Subfamília:</LabelInformation>
            <TextInformation>Maloideae</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Género:</LabelInformation>
            <TextInformation>Malus</TextInformation>
          </ContainerText>
        </>
      ) : (
        <>
          <ContainerText>
            <LabelInformation>Nome do produto:</LabelInformation>
            <TextInformation>{batch.product_name}</TextInformation>
          </ContainerText>
          <ContainerText>
            <LabelInformation>Lote:</LabelInformation>
            <TextInformation>{batch.subbatch_code}</TextInformation>
          </ContainerText>
          <LabelInformation>Produtos base:</LabelInformation>

          {batch.batchs_father.map((item: any, index: number) => {
            return (
              <ContainerText>
                <TextInformation color="blue" key={index}>
                  Lote: {item.code} ({item.amount_transformed} kg) -{' '}
                  {item.title}
                  {'  -  '}
                  <Link to={`/rastreabilidade/${item.batch_code}`}>
                    Ver mais
                  </Link>
                </TextInformation>
              </ContainerText>
            );
          })}
        </>
      )}
    </ContainerInformation>
  );
};

export default Information;
