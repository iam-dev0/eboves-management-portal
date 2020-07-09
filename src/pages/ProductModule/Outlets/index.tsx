import {
  DownOutlined,
  PlusOutlined,
  EditFilled,
  DeleteOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, Input, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { fetchOutlets } from './service';
import { OutletItem } from './data';
import style from './index.less';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const {
    loading,
    dispatch,
    // outlets,
  } = props;

  const onChangeProductStatus = (id: number, status: boolean) => {
    dispatch({ type: 'products/updateOutletActiveStatus', payload: id });
  };
  const columns: ProColumns<OutletItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      hideInSearch:true,
      hideInForm:true,
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
      onFilter: (value:any, record:OutletItem) => {
        const v = value.toLowerCase() === 'true';
        return record.active === v;
      },
      renderText: (text, record) => {
        const active = text === 'Active';
        if (record.default) return <Tag className='tag-primary-color'>Default</Tag>;
        return (
          <Switch
            defaultChecked={active}
            onChange={(value) => onChangeProductStatus(record.id, value)}
          />
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
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
      render: () => (
        <span className="table-operation">
          <a>View</a> |&nbsp;
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const expandable = {
    expandedRowKeys,
    onExpand: (expanded: boolean, record: any) => {
      setExpandedRowKeys(expanded ? [record.id] : []);
    },
    expandIcon: ({ expanded, onExpand, record }: any) =>
      expanded ? (
        <DownOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <RightOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowRender: (record: OutletItem) => (
      <div className={`customExpendableRow ${style.addressExpand}`}>
        <p>
          <span>Address : </span>
          <span>{record.address}</span>
        </p>
      </div>
    ),
    rowExpandable: () => true,
  };
  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable<OutletItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Outlets"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<OutletItem>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={() => history.push('/products/Create')}>
              <PlusOutlined /> New
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async (e) => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
                      }
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="remove">remove</Menu.Item>
                    <Menu.Item key="approval">approve</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  button <DownOutlined />
                </Button>
              </Dropdown>
            ),
          ]}
          tableAlertRender={false}
          request={(params) => fetchOutlets(params)}
          columns={columns}
          rowSelection={{}}
          pagination={{ showTotal: (total) => `Total ${total} items` }}
          expandable={expandable}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ outlets, loading }: { outlets: any; loading: { models: { [key: string]: boolean } } }) => ({
    outlets,
    loading: loading.models.outlets,
  }),
)(TableList);
