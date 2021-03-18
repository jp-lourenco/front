import { useEffect, useState } from 'react';
import { Button, DatePicker } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import locale from 'antd/es/date-picker/locale/pt_BR';

const { RangePicker } = DatePicker;

interface RangeFilterDropdownProps extends FilterDropdownProps {
  setSelectedKeys: (selectedKeys: any) => void;
  clearFilters: () => void;
}

const DropdownRangePicker = (props: RangeFilterDropdownProps) => {
  const [dateRange, setDateRange] = useState(null);

  const handleChangeDate = (value: any) => {
    if (value?.length > 1) {
      const range = { start: value[0], end: value[1] };
      setDateRange(value);
      props.setSelectedKeys([range]);
    }
  };

  useEffect(() => {
    if (props.visible === false) {
      props.confirm();
    }
  }, [props.visible]);

  return (
    <>
      <div style={{ padding: 8 }}>
        <RangePicker
          locale={locale}
          value={dateRange}
          onOk={() => console.log('change')}
          onChange={handleChangeDate}
          format={'DD-MM-YYYY'}
        />
      </div>
      <div style={{ padding: 8 }}>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setDateRange(null);
            props.clearFilters();
          }}
        >
          Reset
        </Button>
        <Button
          disabled={props.selectedKeys.length > 1 ? true : false}
          type="primary"
          size="small"
          onClick={() => {
            props.confirm();
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default DropdownRangePicker;
