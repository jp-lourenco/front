import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import FormCreateProduction from './components/FormCreateProduction';
import ResultCreateProduction from './components/ResultCreateProduction';
import { Container } from './styles/CreateProduction';

export const CreateProductionContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateProduction: React.FC = () => {
  const { loadingCreateProductionRequest } = useSelector(
    (state: any) => state.production,
  );

  const [result, setResult] = useState<boolean>(false);

  return (
    <CreateProductionContext.Provider value={{ result, setResult }}>
      <Container>
        {result == false ? (
          <FormCreateProduction />
        ) : (
          [
            loadingCreateProductionRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <ResultCreateProduction />
            ),
          ]
        )}
      </Container>
    </CreateProductionContext.Provider>
  );
};

export default CreateProduction;
