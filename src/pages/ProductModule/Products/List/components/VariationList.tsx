import React, { useState } from 'react';
import { Table, Switch, Dropdown, Menu, Spin } from 'antd';
import { connect, Link } from 'umi';
import { RightOutlined, DownOutlined, EditFilled, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import VariationView from '../../View/components/VariationView';
import styles from '../index.less';

const NestedTable: React.FC<any> = (props) => {
  const [selectedRowKeys, SetselectedRowKeys] = useState<[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const {
    product,
    dispatch,
    products: { variation, variationsList },
  } = props;

  const toggleVariationActiveStatus = (id: number) => {
    dispatch({
      type: 'products/toggleVariationActiveStatus',
      payload: { vid: id, pid: product.id },
    });
  };

  const columns = [
    { title: 'Product', dataIndex: 'name', width: '20%', className: 'NestFirtColum' },
    {
      title: 'Product Type',
      width: '10%',
      render: () => product.productType.charAt(0).toUpperCase() + product.productType.slice(1),
    },
    { title: 'Sku', dataIndex: 'sku', width: '15%' },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      render: (text: number) => <div>PKR {text}</div>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      width: '10%',
      render: (text, record) => {
        return (
          <Switch defaultChecked={text} onChange={() => toggleVariationActiveStatus(record.id)} />
        );
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_, record: any) => (
        <span className="table-operation">
          <Link to={`/product-module/products/${product.id}/${record.id}`}>View</Link> |&nbsp;
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item icon={<EditFilled />}>Edit</Menu.Item>
                <Menu.Item icon={<DeleteOutlined />}>Delete</Menu.Item>
              </Menu>
            }
          >
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    SetselectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const expandable = {
    expandedRowKeys,
    onExpand: (expanded: boolean, record: any) => {
      setExpandedRowKeys(expanded ? [record.id] : []);
      if (expanded)
        dispatch({ type: 'products/fetchVariation', payload: { vid: record.id, pid: product.id } });
    },
    expandIcon: ({ expanded, onExpand, record }: any) =>
      expanded ? (
        <DownOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <RightOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowRender: (record) => (
      <div className={styles.rowInfromation}>
        <VariationView variation={variation} />
      </div>
    ),
    rowExpandable: (record) => true,
  };
  return (
    <Table
      className="NestedTable"
      showHeader={false}
      rowKey="id"
      pagination={false}
      columns={columns}
      expandable={expandable}
      rowSelection={rowSelection}
      dataSource={variationsList}
    />
  );
};

export default connect(({ products, loading }: { products: any; loading: any }) => ({
  products,
}))(NestedTable);
