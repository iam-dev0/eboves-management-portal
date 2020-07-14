import {
  DownOutlined,
  PlusOutlined,
  RightOutlined,
  ApartmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, Input, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { fetchAllCategories } from './service';
import { CategoryItem } from './data';

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();

  const {
    loading,
    dispatch,
    // outlets,
  } = props;

  const toggleActiveStatus = (id: number) => {
    dispatch({
      type: 'categories/toggleActiveStatus',
      payload: id,
      callback: () => {
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.reload();
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.clearSelected();
      },
    });
  };

  const handleBulkDelete = (ids: any) => {
    dispatch({
      type: 'categories/bulkDelete',
      payload: ids,
      callback: () => {
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.reload();
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.clearSelected();
      },
    });
  };

  const columns: ProColumns<CategoryItem>[] = [
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
      onFilter: (value: any, record: CategoryItem) => {
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
      render: (text, record) => (
        <span className="table-operation">
          <a>View</a> |&nbsp;
          <a
            onClick={(e) => {
              history.push(`categories/update/${record.id}`);
              e.preventDefault();
            }}
          >
            Edit
          </a>
          {record.level !== 2 && (
            <>
              |&nbsp;
              <a
                onClick={(e) => {
                  history.push('categories/Create', { categoryId: record.id });
                  e.preventDefault();
                }}
              >
                <ApartmentOutlined /> Add
              </a>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable<CategoryItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Outlets"
          childrenColumnName="childrens"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<CategoryItem>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRowKeys }) => [
            <Button type="primary" onClick={() => history.push('categories/Create')}>
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
          request={(params) => fetchAllCategories(params)}
          columns={columns}
          rowSelection={{}}
          pagination={{ showTotal: () => `All categories` }}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    categories,
    loading,
  }: {
    categories: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    categories,
    loading: loading.models.categories,
  }),
)(TableList);
