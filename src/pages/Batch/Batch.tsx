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
  ImageStyled,
  Overlay,
  SlideShow,
  ButtonNext,
  MySlides,
  ButtonPrev,
  Content,
} from './styles/Batch';
import 'moment/locale/pt-br';
import { useLocation } from 'react-router-dom';
import {
  FileTextOutlined,
  LoadingOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import Traceability from './components/Traceability';
import api from '../../services/api';
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
    src_videos: [],
    production_location: '',
    production_start: '',
    production_description: '',
    production_end: '',
    amount_produced: '',
    temp_min: '',
    temp_max: '',
    humi_min: '',
    humi_max: '',
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

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const showSlides = (n: number) => {
    var slides = document.getElementsByClassName('mySlides');

    if (n >= slides?.length) {
      setSlideIndex(0);
    }
    if (n < 0) {
      setSlideIndex(slides?.length - 1);
    }
  };

  const plusSlides = (n: number) => {
    setSlideIndex((c) => c + n);
    showSlides(slideIndex + n);
  };

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
              <TabsStyled defaultActiveKey="1">
                <TabPaneStyled
                  tab={
                    <span>
                      <FileTextOutlined />
                      Informações
                    </span>
                  }
                  key="1"
                >
                  <Container>
                    {batch['src_images']?.map((item: any, index: number) => {
                      return (
                        <Background
                          src={item.url}
                          className={index == slideIndex ? 'active' : ''}
                        />
                      );
                    })}
                    <Overlay>
                      <ButtonNext onClick={() => plusSlides(1)}>
                        &#10095;
                      </ButtonNext>
                      <ButtonPrev onClick={() => plusSlides(-1)}>
                        &#10094;
                      </ButtonPrev>
                    </Overlay>
                    <SlideShow>
                      {batch['src_images']?.map((item: any, index: number) => {
                        return (
                          <MySlides
                            key={item.url}
                            className={
                              index == slideIndex
                                ? 'mySlides active'
                                : 'mySlides'
                            }
                          >
                            <AvatarStyled
                              src={<ImageStyled src={item.url} />}
                            />
                          </MySlides>
                        );
                      })}
                    </SlideShow>
                    <Content>
                      <Information />
                    </Content>
                  </Container>
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
                {/* <TabPaneStyled
                  tab={
                    <span>
                      <FileTextOutlined />
                      Imagens
                    </span>
                  }
                  key="3"
                >
                  <SlideShow>
                    {batch['src_images']?.map((item: any, index: number) => {
                      return (
                        <MySlides
                          key={item.url}
                          className={
                            index == slideIndex ? 'mySlides active' : 'mySlides'
                          }
                        >
                          <Image width={300} src={item.url} />
                        </MySlides>
                      );
                    })}
                    <ButtonNext onClick={() => plusSlides(1)}>
                      &#10095;
                    </ButtonNext>
                    <ButtonPrev onClick={() => plusSlides(-1)}>
                      &#10094;
                    </ButtonPrev>
                  </SlideShow>
                </TabPaneStyled>
                <TabPaneStyled
                  tab={
                    <span>
                      <FileTextOutlined />
                      Vídeos
                    </span>
                  }
                  key="4"
                >
                  {batch['src_videos']?.map((item: any, index: number) => {
                    return (
                      <Item key={item.url}>
                        <ItemTitle>{item.name}</ItemTitle>

                        <Player>
                          <Player.Button />
                          <Player.Video src={item.url} />
                        </Player>
                      </Item>
                    );
                  })}
                </TabPaneStyled> */}
              </TabsStyled>
            </Container>
          ),
        ]
      )}
    </BatchContext.Provider>
  );
};

export default Batch;
