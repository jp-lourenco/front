import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import { MySubBatchsContext } from '../../MySubBatchs';
import {
  CodeItem,
  Container,
  ContainerItem,
  ContainerList,
  Header,
  QRCodeStyled,
  TitleList,
} from './styles/QrcodeList';
import 'moment/locale/pt-br';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Image, View, Text } from '@react-pdf/renderer';
import { SubBatch } from '../../../../store/modules/subbatch/types';
import Barcode from '../../../MyProductions/components/QrcodeList/react-barcode';
interface GS1AndQr {
  uri: string;
  barcodeRef: string;
}

const QrcodeList: React.FC = () => {
  const { selectedRowKeys } = useContext(MySubBatchsContext);
  const [data, setData] = useState<SubBatch[]>([]);
  const [uris, setUris] = useState<GS1AndQr[]>([]);
  const [title, setTitle] = useState<string>();
  const [subBatchCode, setSubBatchCode] = useState<string>();

  const [gtin, setGtin] = useState<string>();
  const [sscc, setSscc] = useState<string>();
  const [expirationDate, setExpirationDate] = useState<string>();
  const [amountTransoformed, setAmountTransoformed] = useState<string>();
  const { mySubBatchs } = useSelector((state: any) => state.subbatch);

  useEffect(() => {
    let result: SubBatch[] = [];
    selectedRowKeys.forEach((qrcode: string) => {
      console.log(qrcode);
      mySubBatchs.forEach((subbatch: SubBatch) => {
        if (qrcode == subbatch.key) {
          result.push(subbatch);
          setTitle(subbatch.product_name);

          subbatch.expiration_date &&
            setExpirationDate(subbatch.expiration_date);

          subbatch.gtin && setGtin(subbatch.gtin);
          subbatch.sscc && setSscc(subbatch.sscc);

          subbatch.subbatch_code && setSubBatchCode(subbatch.subbatch_code);

          subbatch.processed_quantity &&
            setAmountTransoformed(
              ('000000' + subbatch.processed_quantity).slice(-6),
            );
        }
      });
      setData(result);
    });
  }, [selectedRowKeys]);

  useEffect(() => {
    let result: GS1AndQr[] = [];
    data.forEach((subbatch: SubBatch) => {
      let qrCodeCanvas = document.getElementById(
        subbatch.key,
      ) as HTMLCanvasElement;
      let qrCodeDataUri = qrCodeCanvas?.toDataURL('image/jpg', 0.3);

      let barcodeCanvas = document.getElementById(
        `barcode-${subbatch.key}`,
      ) as HTMLCanvasElement;

      let barcodeDataUri = barcodeCanvas?.toDataURL('image/jpg', 0.3);

      result.push({
        uri: qrCodeDataUri,
        barcodeRef: barcodeDataUri,
      });
    });

    setUris(result);
  }, [data]);

  const CreateValueGS1 = () => {
    let valueGS1 = '';

    if (gtin) {
      valueGS1 = valueGS1 + '(01)' + gtin;
    }

    if (amountTransoformed) {
      valueGS1 = valueGS1 + '(3102)' + amountTransoformed;
    }

    if (subBatchCode) {
      valueGS1 = valueGS1 + '(10)' + subBatchCode;
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
        {uris.map((uri, index) => {
          return (
            <Page key={uri.uri} size="A4">
              <View style={{ textAlign: 'center', margin: 30 }}>
                <Text style={{ margin: 10, fontSize: 20 }}>{title}</Text>
                {gtin && (
                  <Text style={{ margin: 3, fontSize: 16 }}>GTIN: {gtin}</Text>
                )}
                {amountTransoformed && (
                  <Text style={{ margin: 3, fontSize: 16 }}>
                    Peso: {Number(amountTransoformed)} kg
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
                <Text style={{ margin: 10 }}>{data[index]?.subbatch_code}</Text>
                <Image src={uri.uri} />
                <Image src={uri.barcodeRef} />
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
          renderItem={(item: SubBatch) => (
            <List.Item>
              <ContainerItem>
                <CodeItem>{item.subbatch_code}</CodeItem>
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
