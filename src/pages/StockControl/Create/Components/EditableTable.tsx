import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, AutoComplete, InputNumber, Row, Col } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { searchVairations } from '@/pages/ProductModule/Products/service';
import ScanSvg from '@/assets/svgs/scan.svg';

const EditableContext = React.createContext<any>();

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [supplierPrice, setSupplierPrice] = useState<any>(0);

  const save = (e) => {
    handleSave({ ...record, [dataIndex]: e.target.value || record[dataIndex] });
  };

  const saveSupplier = () => {
    handleSave({ ...record, [dataIndex]: supplierPrice || record[dataIndex] });
  };

  let childNode = children;

  const quantityValiation = (_: any, value: any) => {
    if (value > 0) {
      return Promise.resolve();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Quantity must be greater than 0');
  };

  if (editable) {
    switch (dataIndex) {
      case 'supplierPrice':
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            initialValue={record[dataIndex]}
            rules={[
              {
                validator: quantityValiation,
              },
            ]}
          >
            <InputNumber
              value={supplierPrice}
              formatter={(value) => {
                return `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }}
              parser={(value = '0') => {
                // eslint-disable-next-line radix
                return parseInt(value.replace(/Rs.\s?|(,*)/g, ''));
              }}
              style={{ margin: 0, width: '120px', borderRadius: '0px' }}
              onChange={(value) => setSupplierPrice(value)}
              onBlur={saveSupplier}
            />
          </Form.Item>
        );
        break;
      default:
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                validator: quantityValiation,
              },
            ]}
          >
            <Input
              min={1}
              defaultValue={record[dataIndex]}
              onBlur={save}
              style={{ margin: 0, width: '120px', borderRadius: '0px' }}
            />
          </Form.Item>
        );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableTableFooter: React.FC<any> = ({ handleAdd, outlet }) => {
  const [options, setOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>('');
  const onSeachHandler = async (value: string) => {
    const vars = await searchVairations({ name: value, pageSize: 4, outlet: outlet?.id });
    const items: any[] = [];

    // eslint-disable-next-line no-unused-expressions
    vars?.data?.map((v: any) => {
      items.push({
        value: (
          <div style={{ padding: '7px' }}>
            <Row>
              <Col lg={2} md={2} sm={2}>
                <div className="vd-id-badge vd-id-badge--small">
                  <div
                    className="vd-id-badge__image"
                    style={{
                      backgroundImage: `url(${ScanSvg})`,
                    }}
                  />
                </div>
              </Col>
              <Col>
                <div>{v.name}</div>
                <div style={{ fontSize: '10px' }}>{v.sku}</div>
              </Col>
            </Row>
          </div>
        ),
        lable: v,
      });
    });
    setOptions(items);
  };

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: '100%' }}
      value={value}
      onSelect={(_, option) => {
        handleAdd(option.lable);
        setValue('');
      }}
      // eslint-disable-next-line no-shadow
      onChange={(value: string) => setValue(value)}
      options={options}
      onSearch={onSeachHandler}
    >
      <Input
        prefix={<SearchOutlined />}
        style={{ width: '100%', borderRadius: '0px' }}
        size="large"
        placeholder="Search Products"
      />
    </AutoComplete>
  );
};

const EditableTable: React.FC<any> = ({ outlet }) => {
  const [dataSource, setdataSource] = useState<any>([
    {
      id: '0',
      name: 'm3sK x8 QFTyX7 TPVS Z9MG',
      availableQuantity: '32',
      sku: '3938-388',
      quantity: '3',
      supplierPrice: '120',
      totalCost: '3',
    },
  ]);

  const handleDelete = (key: number) => {
    setdataSource(dataSource.filter((item: any) => item.id !== key));
  };

  const handleAdd = (newData: any) => {
    const exist = dataSource.findIndex((d: any) => d.id === newData.id);
    if (exist === -1) setdataSource([...dataSource, { quantity: 1, ...newData }]);
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    if (index !== -1) newData[index] = row;
    setdataSource(newData);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '40%',
      render: (text: string, record: any) => {
        return (
          <div>
            <div>{text}</div>
            <div style={{ fontSize: '11px', fontWeight: 'normal' }}>{record.sku}</div>
          </div>
        );
      },
    },
    {
      title: () => (
        <div>
          <div>Current Inventory </div>
          <small style={{ fontWeight: 'normal' }}>{outlet?.name || 'all outlets'}</small>
        </div>
      ),
      dataIndex: 'availableQuantity',
      width: '100px',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true,
      width: '120px',
    },
    {
      title: 'Supply Price',
      dataIndex: 'supplierPrice',
      editable: true,
      width: '130px',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      render: (_: any, record: any) => record.supplierPrice * record.quantity,
      width: '120px',
    },
    {
      title: '',
      dataIndex: '',
      render: (text: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Popconfirm>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const newcolumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Table
        className="CustomEditableTable"
        components={components}
        rowKey="id"
        size="small"
        rowClassName={() => 'editable-row'}
        bordered
        footer={() => <EditableTableFooter handleAdd={handleAdd} outlet={outlet} />}
        dataSource={dataSource}
        columns={newcolumns}
        pagination={false}
      />
    </div>
  );
};

export default EditableTable;
