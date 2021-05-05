import React, { createContext, useEffect, useState } from 'react';
import {
  Header,
  TitlePage,
  ContainerLoading,
  TabPaneStyled,
  TabsStyled,
  Container,
  Background,
  AvatarStyled,
  Overlay,
} from './styles/Batch';
import 'moment/locale/pt-br';
import {
  FileTextOutlined,
  LoadingOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import Traceability from './components/Traceability';
import api from '../../services/api';
import { useLocation } from 'react-router-dom';
import Information from './components/Information';

// export interface BatchInterface {
//   producer: string;
//   batch_code: string;
//   production_location: string;
//   production_start: string;
//   production_description: string;
//   production_end: string;
//   amount_produced: string;
//   temp_min: string;
//   umi_min: string;
//   history: any[];
//   transformation_description: string;
//   processed_quantity: string;
//   packing_size: string;
//   packing_date: string;
// }

export const BatchContext = createContext({
  batch: {
    food_name: '',
    producer: '',
    batch_code: '',
    production_location: '',
    production_start: '',
    production_description: '',
    production_end: '',
    amount_produced: '',
    temp_min: '',
    temp_max: '',
    umi_min: '',
    umi_max: '',
    history: [{ date: '', transition: '', company_name: '' }],
    transformation_description: '',
    processed_quantity: '',
    packing_size: '',
    packing_date: '',
  },
  histories: [[{ date: '', transition: '', company_name: '' }]],
});

const arrayToMatrix = (array: any[]) => {
  let response: any[] = [];
  array.forEach((_: any, index: any) => {
    if (index == 0) return;
    if (index % 2 == 0) {
      response = [...response, [array[index - 1], array[index]]];
      return;
    }
  });
  return response;
};

const Batch: React.FC = () => {
  const location = useLocation();

  const [loadingRequest, setLoadingRequest] = useState<boolean>(true);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);

  const [batchId, _] = useState(
    location.pathname.split('/rastreabilidade/')[1],
  );
  const [batch, setBatch] = useState<any>();
  const [histories, setHistories] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`productions/batchs/${batchId}`)
      .then((response) => {
        setBatch(response.data);
        setErrorRequest(false);
        setLoadingRequest(false);
        setHistories(arrayToMatrix(response.data.history));
      })
      .catch((error) => {
        setBatch({});
        setErrorRequest(true);
        setLoadingRequest(false);
      });
  }, [batchId]);

  console.log(batch);
  return (
    <BatchContext.Provider
      value={{
        batch,
        histories,
      }}
    >
      <Header>
        <TitlePage>Bioma</TitlePage>
      </Header>
      {loadingRequest && !errorRequest ? (
        <ContainerLoading>
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </ContainerLoading>
      ) : (
        [
          errorRequest ? (
            <ContainerLoading>
              <h1>Produto não encontrado!</h1>
            </ContainerLoading>
          ) : (
            <Container>
              <Background />
              <Overlay />
              <AvatarStyled src={batch['src_images'][0]} />
              <TabsStyled defaultActiveKey="1">
                <TabPaneStyled
                  tab={
                    <span>
                      <FileTextOutlined />
                      Informação
                    </span>
                  }
                  key="1"
                >
                  <Information />
                </TabPaneStyled>
                <TabPaneStyled
                  tab={
                    <span>
                      <QrcodeOutlined />
                      Rastreabilidade
                    </span>
                  }
                  key="2"
                >
                  <Traceability />
                </TabPaneStyled>
              </TabsStyled>
            </Container>
          ),
        ]
      )}
    </BatchContext.Provider>
  );
};

export default Batch;
