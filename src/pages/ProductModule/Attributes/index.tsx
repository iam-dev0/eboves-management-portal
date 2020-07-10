import {
  DownOutlined,
  PlusOutlined,
  RightOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, Input, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { fetchAttributes } from './service';
import { AttributeItem } from './data';
import CreateOrUpdate from './Create';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [editDrawer, setEditDrawer] = useState<{
    isUpdate: boolean;
    data: AttributeItem | undefined;
  }>({
    isUpdate: false,
    data: undefined,
  });

  const { loading, dispatch } = props;

  const toggleActiveStatus = (id: number) => {
    dispatch({ type: 'attributes/toggleActiveStatus', payload: id });
  };

  const handleBulkDelete = (ids: any) => {
    dispatch({
      type: 'attributes/bulkDelete',
      payload: ids,
      callback: () => {
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.reload();
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.clearSelected();
      },
    });
  };

  const onEditClickHandler = (record: AttributeItem) => {
    setEditDrawer({ isUpdate: true, data: record });
    setOpenDrawer(true);
  };
  
  const columns: ProColumns<AttributeItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      renderText: (text, record) => (
        <span>
          {text}{' '}
          {record.unit && (
            <Tag style={{ fontSize: '10px' }} color="green">
              {record.unit}
            </Tag>
          )}
        </span>
      ),
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
      onFilter: (value: any, record: AttributeItem) => {
        const v = value.toLowerCase() === 'true';
        return record.active === v;
      },
      renderText: (text, record) => {
        const active = text === 'Active';
        return (
          <Switch
            defaultChecked={active}
            onChange={() => {
              toggleActiveStatus(record.id);
            }}
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
      render: (_, record: AttributeItem) => (
        <span onClick={() => onEditClickHandler(record)} className="table-operation">
          <a>
            Edit <EditOutlined />
          </a>
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable<AttributeItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Outlets"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<AttributeItem>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRowKeys }) => [
            <Button type="primary" onClick={() => setOpenDrawer(true)}>
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
          request={(params) => fetchAttributes(params)}
          columns={columns}
          rowSelection={{}}
          pagination={{ showTotal: (total) => `Total ${total} items` }}
        />
      </IntlProvider>
      <CreateOrUpdate
        onClose={() => {
          setEditDrawer({ isUpdate: false, data: undefined });
          setOpenDrawer(false);
          // eslint-disable-next-line no-unused-expressions
          actionRef.current?.reload();
       
         
        }}
        Open={openDrawer}
        isUpdate={editDrawer.isUpdate}
        data={editDrawer.data}
        setEditDrawer={setEditDrawer}
      />
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    attributes,
    loading,
  }: {
    attributes: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    attributes,
    loading: loading.models.attributes,
  }),
)(TableList);
