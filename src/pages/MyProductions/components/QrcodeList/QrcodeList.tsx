import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import { MyProductionsContext } from '../../MyProductions';
import {
  CodeItem,
  Container,
  ContainerItem,
  ContainerList,
  Header,
  QRCodeStyled,
  TitleList,
} from './styles/QrcodeList';
import { Batch, Production } from '../../../../store/modules/production/types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Image, View, Text } from '@react-pdf/renderer';

const QrcodeList: React.FC = () => {
  const { selectedRowKeys } = useContext(MyProductionsContext);
  const [data, setData] = useState<Batch[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const [title, setTitle] = useState<string>();
  const { myProductions } = useSelector((state: any) => state.production);

  useEffect(() => {
    let result: Batch[] = [];
    selectedRowKeys.forEach((qrcode) => {
      myProductions.forEach((production: Production) => {
        production.batchs?.forEach((batch: Batch) => {
          if (qrcode == batch.key) {
            result.push(batch);
            setTitle(production.title);
          }
        });
      });
      setData(result);
    });
  }, [selectedRowKeys]);

  useEffect(() => {
    let result: string[] = [];
    data.forEach((batch: Batch) => {
      let qrCodeCanvas = document.getElementById(
        batch.key,
      ) as HTMLCanvasElement;
      let qrCodeDataUri = qrCodeCanvas?.toDataURL('image/jpg', 0.3);
      result.push(qrCodeDataUri);
    });
    setUris(result);
  }, [data]);

  const PdfDocument = () => {
    return (
      <Document>
        {uris.map((uri, index) => {
          return (
            <Page key={uri} size="A4">
              <View style={{ textAlign: 'center', margin: 30 }}>
                <Text style={{ margin: 10, fontSize: 20 }}>{title}</Text>
                <Text style={{ margin: 10 }}>{data[index]?.batch_code}</Text>
                <Image src={uri} />
              </View>
            </Page>
          );
        })}
      </Document>
    );
  };

  const DownloadPdf = () => {
    return (
      <PDFDownloadLink
        document={<PdfDocument />}
        fileName="lotes_qrcodes.pdf"
        style={{
          height: '24px',
          padding: '0px 12px',
          fontSize: '14px',
          color: '#fff',
          borderRadius: '24px',
          textDecoration: 'none',
          backgroundColor: '#1890ff',
        }}
      >
        {({ loading }) =>
          loading ? 'carregando...' : `Download QR Codes (${data.length})`
        }
      </PDFDownloadLink>
    );
  };

  return (
    <Container selectedRowKeys={selectedRowKeys}>
      <Header>
        <TitleList>Lotes selecionados</TitleList>
        <DownloadPdf />
      </Header>
      <ContainerList>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item: Batch) => (
            <List.Item>
              <ContainerItem>
                <CodeItem>{item.batch_code}</CodeItem>
                <QRCodeStyled
                  id={item.key?.toString()}
                  value={`https://localhost:3000/rastreabilidade/${item?.key?.toString()}`}
                />
              </ContainerItem>
            </List.Item>
          )}
        />
      </ContainerList>
    </Container>
  );
};

export default QrcodeList;
