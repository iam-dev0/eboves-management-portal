import { Button, Input, Menu, Dropdown, Tooltip, notification } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { getAll } from './service';
import View from './View';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const [openOrderModal, setOpenOrderModal] = useState<number | null>(null);
  const actionRef = useRef<ActionType>();

  const { loading, dispatch } = props;

  const changeStatusHandler = (status, ids) => {
    dispatch({
      type: 'orders/changeStatus',
      payload: { ids, status: status.key },
      callback: (res) => {
        if (res.success) {
          notification.success({
            description: 'Updated Successfully',
            message: 'Updated',
          });
          // eslint-disable-next-line no-unused-expressions
          actionRef.current?.reload();
        }
      },
    });
  };

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

  const columns: ProColumns<any>[] = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      // hideInSearch:true,
      formItemProps: {
        placeholder: 'Name / Number / Product / Supplier Invoice',
      },
      onCellClick: (record: any) => {},

      renderText: (text, record) => (
        <div style={{ marginLeft: 10 }} onClick={() => setOpenOrderModal(record.id)}>
          <div style={{ textDecoration: 'underline' }}>
            <a>{text}</a>
          </div>
          <div style={{ fontSize: '8px' }}>{dayjs(record.updatedAt).format('YYYY-MM-DD')}</div>
        </div>
      ),
    },

    {
      title: 'Customer',
      // dataIndex: 'orderNumber',
      key: 'something',
      // hideInTable: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      // valueType:'option',
      valueEnum: {
        WEBSITE_DESKTOP: {
          text: 'Web',
        },
        WEBSITE_MOBILE: {
          text: 'Mobile Web',
        },
      },
    },
    {
      title: (_, type) => (type === 'table' ? 'Status' : 'Show'),
      dataIndex: 'status',
      // valueType:'option',
      valueEnum: {
        PENDING: {
          text: 'Pending Order',
          status: 'Default',
        },
        CONFIRMED: {
          text: 'confirmed',
          status: 'Processing',
        },
        OUT_OF_STOCK: {
          text: 'out of order',
          status: 'Error',
        },
        DISPATCHED: {
          text: 'dispatched',
          status: 'Processing',
        },
        RETURNED: {
          text: 'returned',
          status: 'Success',
        },
        DELIEVERED: {
          text: 'delieverd',
          status: 'Success',
        },
        OVERDUE: {
          text: 'Overdue orders',
          status: 'Error',
        },
        CANCELLED: {
          text: 'cancelled',
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
    // {
    //   title: 'Operation',
    //   key: 'action',
    //   hideInSearch: true,
    //   render: (_, record: any) => (
    //     <span className="table-operation">
    //       <a onClick={() => history.push(`suppliers/update/${record.id}`)}>Edit</a>
    //     </span>
    //   ),
    // },
  ];

  return (
    <PageHeaderWrapper extra={action}>
      <View isOpen={!!openOrderModal} onClose={() => setOpenOrderModal(null)} id={openOrderModal} />
      <IntlProvider value={enUSIntl}>
        <ProTable<any>
          loading={loading}
          className="OuterTable"
          headerTitle="All Orders"
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
          toolBarRender={(action, { selectedRowKeys }) => [
            selectedRowKeys && selectedRowKeys.length > 0 && (
              <Dropdown
                overlay={
                  <Menu onClick={(e) => changeStatusHandler(e, selectedRowKeys)}>
                    <Menu.Item key="CONFIRMED">Confirm</Menu.Item>
                    <Menu.Item key="CANCELED">Cancel</Menu.Item>
                    <Menu.Item key="DISPATCH">Dispatched</Menu.Item>
                    <Menu.Item key="OUT_OF_STOCK">Out of Stock</Menu.Item>
                    <Menu.Item key="DELIEVERED">Delivered</Menu.Item>
                    <Menu.Item key="RETURNED">Return</Menu.Item>
                  </Menu>
                }
              >
                <Button>Action</Button>
              </Dropdown>
            ),
          ]}
          tableAlertRender={false}
          request={(params) => getAll(params)}
          columns={columns}
          rowSelection={{}}
          pagination={{ showTotal: (total) => `Total ${total} items` }}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ orders, loading }: { orders: any; loading: { models: { [key: string]: boolean } } }) => ({
    orders,
    loading: loading.models.orders,
  }),
)(TableList);
