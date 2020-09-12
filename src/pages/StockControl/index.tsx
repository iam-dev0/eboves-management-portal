import { Button, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect, history, Link } from 'umi';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';


import { getAllStockRequests } from './service';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();

  const { loading, dispatch } = props;

  const action = (
    <RouteContext.Consumer>
      {() => (
        <>
          <Button.Group>
            <Link to="/stock-control-module/purchase-order/add">
              <Button type="primary">Order Stock</Button>
            </Link>
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

  const columns: ProColumns<any>[] = [
    {
      title: 'Number',
      dataIndex: 'orderNumber',
      formItemProps: {
        placeholder: 'Name / Number / Product / Supplier Invoice',
      },
      renderText: (text, record) => (
        <span style={{ textDecoration: 'underline', marginLeft: '10px' }}>
          <Link to={`/stock-control-module/stock-movement/${record.id}`}> {text}</Link>
        </span>
      ),
    },
    {
      title: (_, type) => (type === 'table' ? 'From' : 'Suppliers'),
      dataIndex: 'supplier',
      renderText: (text) => text?.name,
      sorter: true,
    },
    {
      title: (_, type) => (type === 'table' ? 'To' : 'Outlets'),
      dataIndex: 'outlet',
      renderText: (text) => text?.name,
      sorter: true,
    },
    {
      title: 'Items',
      dataIndex: 'variations',
      renderText: (text) => text.length,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: (_, type) => (type === 'table' ? 'Status' : 'Show'),
      dataIndex: 'status',
      sorter: true,
      // valueType:'option',
      valueEnum: {
        OPEN: {
          text: 'Open orders',
          status: 'Default',
        },
        RETURN_OPEN: {
          text: 'Open returns',
          status: 'Default',
        },
        SENT: {
          text: 'Sent orders',
          status: 'Processing',
        },
        DISPATCHED: {
          text: 'Sent returns',
          status: 'Processing',
        },
        RETURN_SENT: {
          text: 'Dispatched orders',
          status: 'Processing',
        },
        RECEIVED: {
          text: 'Received orders',
          status: 'Success',
        },
        OVERDUE: {
          text: 'Overdue orders',
          status: 'Error',
        },
        CANCELLED: {
          text: 'Cancelled orders',
          status: 'Error',
        },
        RECEIVE_FAIL: {
          text: 'Failed orderss',
          status: 'Error',
        },
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'date',
      hideInSearch: true,
    },
    {
      key: 'action',
      hideInSearch: true,
      render: (_, record: any) => (
        <>
          <span className="table-operation">
            <a onClick={() => history.push(`/stock-control-module/stock-movement/${record.id}`)}>
              View
            </a>
          </span>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper extra={action}>
      <IntlProvider value={enUSIntl}>
        <ProTable<any>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Stock Requests"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<any>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={() => []}
          tableAlertRender={false}
          request={(params) => getAllStockRequests(params)}
          columns={columns}
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
