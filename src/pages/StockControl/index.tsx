import { PlusOutlined, DeleteOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Switch, Input, Tag, Descriptions, Badge } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import styles from './index.less';
import { getAllSuppliers as fetchSuppliers } from '../ProcurementModule/Suppliers/index';
import { SupplierItem } from './data';
import SupplierView from './View';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const { loading, dispatch } = props;

  const action = (
    <RouteContext.Consumer>
      {() => (
        <>
          <Button.Group>
            <Button type="primary">Order Stock</Button>
            <Button type="primary" style={{ margin: '0px 5px 0px 5px' }}>
              Receive Stock
            </Button>
            <Button type="primary" style={{ margin: '0px 5px 0px 5px' }}>
              Stock Transfer
            </Button>
          </Button.Group>
          <Button type="primary">Return Stock</Button>
        </>
      )}
    </RouteContext.Consumer>
  );

  const toggleActiveStatus = (id: number) => {
    dispatch({ type: 'suppliers/toggleActiveStatus', payload: id });
  };

  const handleBulkDelete = (ids: any) => {
    dispatch({
      type: 'suppliers/bulkDelete',
      payload: ids,
      callback: () => {
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.reload();
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.clearSelected();
      },
    });
  };

  const columns: ProColumns<SupplierItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      sorter: true,
      width: '10%',
      valueEnum: {
        true: {
          text: 'Active',
        },
        false: {
          text: 'Inactive',
        },
      },
      onFilter: (value: any, record: SupplierItem) => {
        const v = value.toLowerCase() === 'true';
        return record.active === v;
      },
      renderText: (text, record) => {
        return (
          <Switch
            defaultChecked={text === 'Active'}
            onChange={() => toggleActiveStatus(record.id)}
          />
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: SupplierItem) => (
        <span className="table-operation">
          <a onClick={() => history.push(`suppliers/update/${record.id}`)}>Edit</a>
        </span>
      ),
    },
  ];

  const expandable = {
    expandedRowKeys,
    onExpand: (expanded: boolean, record: any) => {
      setExpandedRowKeys(expanded ? [record.id] : []);
      if (expanded) dispatch({ type: 'products/fetchSupplier', payload: record.id });
    },
    expandIcon: ({ expanded, onExpand, record }: any) =>
      expanded ? (
        <DownOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <RightOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowRender: (record: SupplierItem) => (
      <div className={`${styles.ExpentableRow} supplierExpandableRow`}>
        <SupplierView id={record.id} />
      </div>
    ),
    rowExpandable: () => true,
  };
  return (
    <PageHeaderWrapper extra={action}>
      <IntlProvider value={enUSIntl}>
        <ProTable<SupplierItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our suppliers"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<SupplierItem>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRowKeys }) => [
            <Button type="primary" onClick={() => history.push('suppliers/create')}>
              <PlusOutlined /> New
            </Button>,
            selectedRowKeys && selectedRowKeys.length > 0 && (
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleBulkDelete(selectedRowKeys)}
              >
                Delete
              </Button>
            ),
          ]}
          tableAlertRender={false}
          request={(params) => fetchSuppliers(params)}
          columns={columns}
          rowSelection={{}}
          expandable={expandable}
          pagination={{ showTotal: (total) => `Total ${total} items` }}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    suppliers,
    loading,
  }: {
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    suppliers,
    loading: loading.models.suppliers,
  }),
)(TableList);
