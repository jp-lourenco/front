import React, { useContext } from 'react';
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
    </ContainerInformation>
  );
};

export default Information;
