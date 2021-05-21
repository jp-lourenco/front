import React, { createContext, useState } from 'react';
import SensorsTable from './components/SensorsTable';
import TableHeader from './components/TableHeader';
import CreateSensorModal from './components/CreateSensor/CreateSensorModal';

export const MySensorsContext = createContext({
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
});

const MySensors: React.FC = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);

  return (
    <MySensorsContext.Provider
      value={{
        visibleCreateModal,
        setVisibleCreateModal,
      }}
    >
      <TableHeader />
      <SensorsTable />
      <CreateSensorModal />
    </MySensorsContext.Provider>
  );
};

export default MySensors;
