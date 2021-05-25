import React, { useContext } from 'react';
import moment from 'moment';
import { CaretRightOutlined, FileOutlined } from '@ant-design/icons';
import { BatchContext } from '../Batch';
import {
  ContainerText,
  Label,
  Text,
  HeaderPanel,
  ImagePanel,
  CollapseStyled,
  ExpandIconStyled,
  PanelStyled,
  ContentPanel,
  TitlePanel,
  SubtitlePanel,
  Item,
  ItemTitle,
} from '../styles/Batch';
import Player from '../../../components/Player';

const Traceability: React.FC = () => {
  const { batch, histories } = useContext(BatchContext);

  return (
    <CollapseStyled
      bordered={false}
      ghost={false}
      expandIcon={({ isActive }) => (
        <ExpandIconStyled className="expand-icon" rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition="right"
    >
      <PanelStyled
        header={
          <HeaderPanel>
            <ImagePanel src="/producer2.jpg" />
            <ContentPanel>
              <TitlePanel>Produtor</TitlePanel>

              <SubtitlePanel>{batch?.producer}</SubtitlePanel>
            </ContentPanel>
          </HeaderPanel>
        }
        key="1"
      >
        {batch?.batch_code && (
          <ContainerText>
            <Label>Código do lote:</Label>
            <Text>{batch?.batch_code}</Text>
          </ContainerText>
        )}
        {batch?.production_location && (
          <ContainerText>
            <Label>Local da produção:</Label>
            <Text>{batch?.production_location}</Text>
          </ContainerText>
        )}
        {batch?.production_start && (
          <ContainerText>
            <Label>Início da produção:</Label>
            <Text>{moment(batch?.production_start).format('llll')}</Text>
          </ContainerText>
        )}
        {batch?.production_description && (
          <ContainerText>
            <Label>Descrição da produção:</Label>
            <Text>{batch?.production_description}</Text>
          </ContainerText>
        )}
        {batch?.production_end && (
          <ContainerText>
            <Label>Final da produção:</Label>
            <Text>{moment(batch?.production_end).format('llll')}</Text>
          </ContainerText>
        )}
        {batch?.amount_produced && (
          <ContainerText>
            <Label>Quantidade produzida:</Label>
            <Text>{batch?.amount_produced}kg</Text>
          </ContainerText>
        )}
        {batch?.temp_min && batch?.temp_max && (
          <ContainerText>
            <Label>Temperatura:</Label>
            <Text>
              Min: {batch?.temp_min}°C - Max: {batch?.temp_max}°C
            </Text>
          </ContainerText>
        )}
        {batch?.humi_min && batch?.humi_max && (
          <ContainerText>
            <Label>Humidade:</Label>
            <Text>
              Min: {batch?.humi_min}% - Max: {batch?.humi_max}%
            </Text>
          </ContainerText>
        )}
        <ContainerText>
          <Label>Produtor enviou:</Label>
          <Text>{moment(batch?.history[0]?.date).format('llll')}</Text>
        </ContainerText>
        {batch.src_videos?.map((item: any, index: number) => {
          return (
            <Item key={item.url}>
              <FileOutlined style={{ fontSize: '32px', color: '#08c' }} />
              <ItemTitle>{item.name}</ItemTitle>

              <Player>
                <Player.Button />
                <Player.Video src={item.url} />
              </Player>
            </Item>
          );
        })}
      </PanelStyled>
      {histories?.map((history: any[], index: number) => {
        return (
          <PanelStyled
            header={
              <HeaderPanel>
                <ImagePanel
                  src={`/${history[0].transition.split(' ')[0]}.jpg`}
                />
                <ContentPanel>
                  <TitlePanel>{history[0].transition.split(' ')[0]}</TitlePanel>
                  <SubtitlePanel>{history[0].company_name}</SubtitlePanel>
                </ContentPanel>
              </HeaderPanel>
            }
            key={`item-${index}`}
          >
            {history?.map((item: any, ind: number) => {
              if (item.transition == 'Transformador recebeu') {
                return (
                  <>
                    <ContainerText>
                      <Label>{item.transition}:</Label>
                      <Text>{moment(item?.date).format('llll')}</Text>
                    </ContainerText>
                    {batch?.transformation_description && (
                      <ContainerText>
                        <Label>Descrição da transformação:</Label>
                        <Text>{batch?.transformation_description}</Text>
                      </ContainerText>
                    )}
                    {batch?.processed_quantity && (
                      <ContainerText>
                        <Label>Quantidade Transformada:</Label>
                        <Text>{batch?.processed_quantity}kg</Text>
                      </ContainerText>
                    )}
                    {batch?.packing_size && (
                      <ContainerText>
                        <Label>Tamanho da embalagem:</Label>
                        <Text>{batch?.packing_size}gr</Text>
                      </ContainerText>
                    )}
                    {batch?.packing_date && (
                      <ContainerText>
                        <Label>Data de embalamento:</Label>
                        <Text>
                          {moment(batch?.packing_date).format('llll')}
                        </Text>
                      </ContainerText>
                    )}
                  </>
                );
              } else if (ind == 1) {
                return (
                  <>
                    {item?.max_value_temp &&
                      item?.min_value_temp &&
                      item?.average_value_temp && (
                        <>
                          <ContainerText>
                            <Label>Temperatura:</Label>
                            <Text>
                              Min: {item.min_value_temp}°C - Max:{' '}
                              {item.max_value_temp}°C
                            </Text>
                          </ContainerText>
                          <ContainerText>
                            <Label>Temperatura Média:</Label>
                            <Text>{item.average_value_temp}°C</Text>
                          </ContainerText>
                        </>
                      )}
                    {item?.max_value_humi &&
                      item?.min_value_humi &&
                      item?.average_value_humi && (
                        <>
                          <ContainerText>
                            <Label>Humidade:</Label>
                            <Text>
                              Min: {item.min_value_humi}% - Max:{' '}
                              {item.max_value_humi}%
                            </Text>
                          </ContainerText>
                          <ContainerText>
                            <Label>Humidade Média:</Label>
                            <Text>{item.average_value_humi}%</Text>
                          </ContainerText>
                        </>
                      )}
                    <ContainerText>
                      <Label>{item.transition}:</Label>
                      <Text>{moment(item?.date).format('llll')}</Text>
                    </ContainerText>
                  </>
                );
              } else if (ind == 0) {
                return (
                  <>
                    <ContainerText>
                      <Label>{item.transition}:</Label>
                      <Text>{moment(item?.date).format('llll')}</Text>
                    </ContainerText>
                  </>
                );
              }
            })}
          </PanelStyled>
        );
      })}

      <PanelStyled
        header={
          <HeaderPanel>
            <ImagePanel src="/shopkeeper.jpg" />
            <ContentPanel>
              <TitlePanel>Lojista</TitlePanel>
              <SubtitlePanel>
                {batch.history[batch?.history?.length - 1]?.company_name}
              </SubtitlePanel>
            </ContentPanel>
          </HeaderPanel>
        }
        key="3"
      >
        <ContainerText>
          <Label>
            {batch.history[batch?.history?.length - 1]?.transition}:
          </Label>
          <Text>
            {moment(batch.history[batch?.history?.length - 1]?.date).format(
              'llll',
            )}
          </Text>
        </ContainerText>
      </PanelStyled>
    </CollapseStyled>
  );
};

export default Traceability;
