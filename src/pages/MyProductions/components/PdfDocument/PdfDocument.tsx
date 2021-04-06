import React, { useEffect, useState } from 'react';
import { Document, Page, Image, View } from '@react-pdf/renderer';
import { Batch } from '../../../../store/modules/production/types';

const PdfDocument = ({ batchs }: { batchs: Batch[] }) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    console.log('useefect');
    let result: string[] = [];
    batchs.forEach((batch: Batch) => {
      let qrCodeCanvas = document.getElementById(
        batch.key,
      ) as HTMLCanvasElement;
      let qrCodeDataUri = qrCodeCanvas?.toDataURL('image/jpg', 0.3);
      console.log(qrCodeDataUri);

      result.push(qrCodeDataUri);
      setData(result);
    });
  }, []);

  console.log(batchs);

  return (
    <Document>
      <Page size="A4">
        {data.map((uri) => {
          return (
            <View key={uri}>
              <Image src={uri} />
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default PdfDocument;
