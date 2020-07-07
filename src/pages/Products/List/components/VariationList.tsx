import React, { useState } from 'react';
import { Table, Switch ,Dropdown, Menu} from 'antd';
import { connect } from 'umi';
import { RightOutlined, DownOutlined, EditFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import VariationView from '../../View/components/VariationView';
import styles from '../index.less';


const menu = (
  <Menu>
    <Menu.Item icon={<EditFilled />}>Edit</Menu.Item>
    <Menu.Item icon={<DeleteOutlined />}>Delete</Menu.Item>
  </Menu>
);

const NestedTable: React.FC<any> = (props) => {
  const [selectedRowKeys, SetselectedRowKeys] = useState<[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const {
    product,
    dispatch,
    products: { variation, variationsList },
  } = props;

  const columns = [
    { title: 'Product', dataIndex: 'name', width: '20%', className: 'NestFirtColum' },
    { title: 'Product Type', width: '15%', render: () => product.productType },
    { title: 'Sku', dataIndex: 'sku', width: '15%' },
    {
      title: 'Active',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
      width: '10%',
      render: (text, record) => {
        return (
          <Switch
            defaultChecked={text}
            // onChange={(value) => onChangeProductStatus(record.id, value)}
          />
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
      render: () => (
        <span className="table-operation">
          <a>View</a> |&nbsp;
          <Dropdown overlay={menu}>
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
      setExpandedRowKeys(expanded ? [record.key] : []);
      if (expanded) dispatch({ type: 'products/fetchVariation', payload: record.id });
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
      pagination={false}
      columns={columns}
      expandable={expandable}
      rowSelection={rowSelection}
      dataSource={variationsList}
    />
  );
};

export default connect(
  ({ products, loading }: { products: any; loading: { models: { [key: string]: boolean } } }) => ({
    products,
    loading: loading.models.products,
  }),
)(NestedTable);
