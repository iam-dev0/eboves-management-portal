import { DownOutlined, PlusOutlined, MinusOutlined, EditFilled, DeleteOutlined } from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { TableListItem } from './data';
import { fetchProducts } from './service';

import NestedTable from './components/VariationList';

function toObject(arr: any): { [key: string]: string | number | boolean | {} | null } {
  if (!arr) return {};
  const rv = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) rv[arr[i].id] = arr[i].name;
  return rv;
}

const menu = (
  <Menu>
    <Menu.Item icon={<EditFilled />}>Edit</Menu.Item>
    <Menu.Item icon={<DeleteOutlined />}>Delete</Menu.Item>
    <Menu.Item icon={<PlusOutlined />} >Add New Variation</Menu.Item>
  </Menu>
);

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const actionRef = useRef<ActionType>();

  const {
    dispatch,
    products: { brands, suppliers },
  } = props;

  useEffect(() => {
    dispatch({ type: 'products/fetchBrands' });
    dispatch({ type: 'products/fetchSuppliers' });
  }, []);

  const onChangeProductStatus = (id: number, status: boolean) => {
    setLoading(true);
    updateProductStatus(id, status).then((data: any) => {
      if (data.success) {
        setLoading(false);
      }
    });
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      valueEnum: {
        eboves: {
          text: 'Eboves',
        },
        supplier: {
          text: 'Suppliers',
        },
      },
      sorter: true,
      width: '15%',
    },
    {
      title: 'Brands',
      dataIndex: 'brandId',
      valueEnum: toObject(brands),
      hideInTable: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Suppliers',
      dataIndex: 'supplierId',
      valueEnum: toObject(suppliers),
      hideInTable: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Sku',
      dataIndex: 'sku',
      hideInSearch: true,
      width: '15%',
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

      renderText: (text, record) => {
        const active=text === 'Active';
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
      render: (_, record) => (
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
  const expandable = {
    expandedRowKeys,
    onExpand: (expanded: boolean, record: any) => {
      setExpandedRowKeys(expanded ? [record.id] : []);
    },
    expandIcon: ({ expanded, onExpand, record }: any) =>
      expanded ? (
        <MinusOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <PlusOutlined onClick={(e) => onExpand(record, e)} />
      ),
    expandedRowRender: (record) => (
      <div>
        <NestedTable />
      </div>
    ),
    rowExpandable: (record) => true,
  };

  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable<TableListItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Products"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<TableListItem>;
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
          request={(params) => fetchProducts(params)}
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
  ({
    products,
    loading,
  }: {
    products: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    products,
    loading: loading.models.products,
  }),
)(TableList);
