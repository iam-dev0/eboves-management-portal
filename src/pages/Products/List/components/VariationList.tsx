import React, { useState } from 'react';
import { Table, Switch } from 'antd';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import VariationView from '../../View/components/VariationView';
import styles from '../index.less';

function NestedTable() {
  const [selectedRowKeys, SetselectedRowKeys] = useState<[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const columns = [
    { title: 'Product', dataIndex: 'name', key: 'name', width: '20%', className: 'NestFirtColum' },
    { title: 'Product Type', dataIndex: 'platform', key: 'platform', width: '15%' },
    { title: 'Sku', dataIndex: 'version', key: 'version', width: '15%' },
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
    { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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
    },
    expandIcon: ({ expanded, onExpand, record }:any) =>
      expanded ? (
        <DownOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <RightOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowRender: (record) => (
      <div className={styles.rowInfromation}>
        <VariationView />
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
      dataSource={data}
    />
  );
}

export default NestedTable;
