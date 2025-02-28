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
import Barcode from './react-barcode.js';
import 'moment/locale/pt-br';
import moment from 'moment';

interface GS1AndQr {
  uri: string;
  barcodeRef: string;
}

const QrcodeList: React.FC = () => {
  const { selectedRowKeys } = useContext(MyProductionsContext);
  const [data, setData] = useState<Batch[]>([]);
  const [codes, setCodes] = useState<GS1AndQr[]>([]);
  const [title, setTitle] = useState<string>();
  const [gtin, setGtin] = useState<string>();
  const [sscc, setSscc] = useState<string>();
  const [batchCode, setBatchCode] = useState<string>();

  const [productionLocation, setProductionLocation] = useState<string>();
  const [productionDate, setProductionDate] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [packingDate, setPackingDate] = useState<string>();
  const [amountProduced, setAmountProduced] = useState<string>();
  const { myProductions } = useSelector((state: any) => state.production);

  useEffect(() => {
    let result: Batch[] = [];
    selectedRowKeys.forEach((qrcode) => {
      myProductions.forEach((production: Production) => {
        production.batchs?.forEach((batch: Batch) => {
          if (qrcode == batch.key) {
            result.push(batch);
            setTitle(production.title);
            production.production_location &&
              setProductionLocation(production.production_location);

            production.production_end &&
              setProductionDate(production.production_end);

            production.expiration_date &&
              setExpirationDate(production.expiration_date);

            production.gtin && setGtin(production.gtin);
            production.sscc && setSscc(production.sscc);

            batch.batch_code && setBatchCode(batch.batch_code);
            batch.packing_date && setPackingDate(batch.packing_date);
            batch.amount_produced &&
              setAmountProduced(('000000' + batch.amount_produced).slice(-6));
          }
        });
      });
      setData(result);
    });
  }, [selectedRowKeys]);

  useEffect(() => {
    let result: GS1AndQr[] = [];
    data.forEach((batch: Batch) => {
      let qrCodeCanvas = document.getElementById(
        batch.key,
      ) as HTMLCanvasElement;
      let qrCodeDataUri = qrCodeCanvas?.toDataURL('image/jpg', 0.3);

      let barcodeCanvas = document.getElementById(
        `barcode-${batch.key}`,
      ) as HTMLCanvasElement;

      let barcodeDataUri = barcodeCanvas?.toDataURL('image/jpg', 0.3);

      result.push({
        uri: qrCodeDataUri,
        barcodeRef: barcodeDataUri,
      });
    });
    setCodes(result);
  }, [data]);

  const CreateValueGS1 = () => {
    let valueGS1 = '';

    if (gtin) {
      valueGS1 = valueGS1 + '(01)' + gtin;
    }

    if (amountProduced) {
      valueGS1 = valueGS1 + '(3102)' + amountProduced;
    }

    if (batchCode) {
      valueGS1 = valueGS1 + '(10)' + batchCode;
    }

    if (productionDate) {
      valueGS1 = valueGS1 + '(11)' + moment(productionDate).format('YYMMDD');
    }

    if (packingDate) {
      valueGS1 = valueGS1 + '(13)' + moment(packingDate).format('YYMMDD');
    }

    if (expirationDate) {
      valueGS1 = valueGS1 + '(17)' + moment(expirationDate).format('YYMMDD');
    }

    if (sscc) {
      valueGS1 = valueGS1 + '(00)' + sscc;
    }

    return valueGS1;
  };

  const PdfDocument = () => {
    return (
      <Document>
        {codes.map((code, index) => {
          return (
            <Page key={code.uri} size="A4">
              <View style={{ textAlign: 'center', margin: 30 }}>
                <Text style={{ margin: 10, fontSize: 20 }}>{title}</Text>
                {productionLocation && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Local: {productionLocation}
                  </Text>
                )}
                {productionDate && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Data de produção: {moment(productionDate).format('LL')}
                  </Text>
                )}
                {gtin && (
                  <Text style={{ margin: 3, fontSize: 16 }}>GTIN: {gtin}</Text>
                )}
                {amountProduced && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Peso: {Number(amountProduced)} kg
                  </Text>
                )}
                {packingDate && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Data de embalamento: {moment(packingDate).format('LL')}
                  </Text>
                )}
                {expirationDate && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Data de validade: {moment(expirationDate).format('LL')}
                  </Text>
                )}
                {sscc && (
                  <Text style={{ margin: 3, fontSize: 16 }}>SSCC: {sscc}</Text>
                )}

                <Text style={{ margin: 10 }}>
                  Lote: {data[index]?.batch_code}
                </Text>
                <Image src={code.uri} />
                <Image src={code.barcodeRef} />
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
                <Barcode
                  id={'barcode-' + item.key?.toString()}
                  value={CreateValueGS1()}
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
