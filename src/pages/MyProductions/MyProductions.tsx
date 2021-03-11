import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import ProductionsTable from './components/ProductionsTable';
import { Batch, Production } from '../../store/modules/production/types';
import TraceModal from './components/TraceModal';
import EditModal from './components/EditModal';

export const MyProductionsContext = createContext({
  batchSelected: {
    key: '',
    batch_code: '',
    current_state: '',
    history: [],
  },
  setBatchSelected: (batchSelected: Batch) => {},
  visibleTraceModal: false,
  setVisibleTraceModal: (visibleTraceModal: boolean) => {},
  productionSelected: { key: '' },
  setProductionSelected: (productionSelected: Production) => {},
  visibleEditModal: false,
  setVisibleEditModal: (visibleEditModal: boolean) => {},
});

const MyProductions: React.FC = () => {
  const [visibleTraceModal, setVisibleTraceModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [productionSelected, setProductionSelected] = useState<any>({});
  const [batchSelected, setBatchSelected] = useState<any>({
    key: '',
    batch_code: '',
    current_state: '',
    history: [],
  });

  return (
    <MyProductionsContext.Provider
      value={{
        batchSelected,
        setBatchSelected,
        visibleTraceModal,
        setVisibleTraceModal,
        productionSelected,
        setProductionSelected,
        visibleEditModal,
        setVisibleEditModal,
      }}
    >
      <TableHeader />
      <ProductionsTable />
      <TraceModal />
      <EditModal />
    </MyProductionsContext.Provider>
  );
};

export default MyProductions;
