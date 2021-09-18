import React, { useContext, useEffect, useState } from 'react';
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { MyProductionsContext } from '../../MyProductions';
import api from '../../../../services/api';
import { UploadStyled } from '../../styles/MyProductions';

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const EditImages: React.FC = () => {
  const [previewVisible, setPreviwVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const { productionSelected } = useContext(MyProductionsContext);

  const [fileList, setFileList] = useState<any>(
    productionSelected['images_filename'],
  );

  useEffect(() => {
    setFileList(productionSelected['images_filename']);
  }, [productionSelected]);

  const token = localStorage.getItem('token');

  const handleRemove = (file: any) => {
    api
      .delete(
        `productions/${productionSelected['key']}/image/${file?.filename}`,
        { headers: { Authorization: 'Bearer ' + token } },
      )
      .then((response) => {})
      .catch((error) => {});
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviwVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleCancel = () => setPreviwVisible(false);

  const handleChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
    console.log(fileList);
  };

  const UploadButton = () => (
    <Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>
  );

  return (
    <>
      <UploadStyled
        action={`http://localhost:5000/api/v1/productions/${productionSelected['key']}/image`}
        headers={{ Authorization: 'Bearer ' + token }}
        listType="picture"
        fileList={
          productionSelected['images_filename']?.length > 0 ? fileList : []
        }
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={10}
      >
        {fileList?.length >= 10 ? null : <UploadButton />}
      </UploadStyled>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default EditImages;
