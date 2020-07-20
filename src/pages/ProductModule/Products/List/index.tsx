import {
  DownOutlined,
  PlusOutlined,
  MinusOutlined,
  EditFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { connect, history, Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';
import { ProductItem } from '../data';
import { fetchProducts } from '../service';
import style from './index.less';
import NestedTable from './components/VariationList';

function toObject(arr: any): { [key: string]: string | number | boolean | {} | null } {
  if (!arr) return {};
  const rv = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) rv[arr[i].id] = arr[i].name;
  return rv;
}

const TableList: React.FC<any> = (props) => {
  const [sorter, setSorter] = useState<string>('');

  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const actionRef = useRef<ActionType>();

  const {
    loading,
    dispatch,
    brands: { brands },
    suppliers: { suppliers },
  } = props;

  useEffect(() => {
    dispatch({ type: 'brands/fetchBrands' });
    dispatch({ type: 'suppliers/fetchSuppliers' });
  }, []);

  const toggleProductActiveStatus = (id: number) => {
    dispatch({ type: 'products/toggleProductActiveStatus', payload: id });
  };

  const handleBulkDelete = (ids: any) => {
    dispatch({
      type: 'products/bulkDelete',
      payload: ids,
      callback: () => {
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.reload();
        // eslint-disable-next-line no-unused-expressions
        actionRef.current?.clearSelected();
      },
    });
  };



  const columns: ProColumns<ProductItem>[] = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '20%',
      renderText: (text, record) => (
        <div>
          <div>{text}</div>
          <div className={style.VariationsCount}>{record.variations?.length} variants</div>
        </div>
      ),
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
      width: '10%',
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
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      width: '10%',
      renderText: (_, record) => {
        const priceArray = record?.variations?.map((i) => i.price);
        if (priceArray && priceArray.length > 0) {
          const max = Math.max.apply(null, priceArray);
          const min = Math.min.apply(null, priceArray);
          return max === min ? (
            <div>PKR {max}</div>
          ) : (
            <div>
              PRK {min}-{max}
            </div>
          );
        }
        return <div>PKR 0</div>;
      },
    },
    {
      title: 'Active',
      dataIndex: 'active',
      sorter: true,
      width: '10%',
      // filterDropdownVisible:false,
      valueEnum: {
        true: {
          text: 'Active',
        },
        false: {
          text: 'Inactive',
        },
      },
      onFilter: (value: any, record: ProductItem) => {
        const v = value.toLowerCase() === 'true';
        return record.active === v;
      },
      renderText: (text, record) => {
        const active = text === 'Active';
        return (
          <Switch defaultChecked={active} onChange={() => toggleProductActiveStatus(record.id)} />
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
      render: (_, record: ProductItem) => (
        <span className="table-operation">
          <Link to={`/product-module/products/${record.id}`}>View</Link> |&nbsp;
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" icon={<EditFilled />}>
                <Link to={`/product-module/products/update/${record.id}`}> Edit</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<PlusOutlined />}>
                  <Link to={`products/${record.id}/variations/create`}>Add SKU</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>
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
      if (expanded)
        dispatch({ type: 'products/fetchProductVariations', payload: { id: record.id } });
    },
    expandIcon: ({ expanded, onExpand, record }: any) => {
      if (record.variations.length > 0)
        return expanded ? (
          <MinusOutlined onClick={(e) => onExpand(record, e)} />
        ) : (
          <PlusOutlined onClick={(e) => onExpand(record, e)} />
        );

      return null;
    },
    expandedRowRender: (record: ProductItem) => (
      <div className={style.nestedRows}>
        <NestedTable product={record} />
      </div>
    ),
    rowExpandable: (record: ProductItem) => record.variations?.length,
  };

  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl}>
        <ProTable<ProductItem>
          loading={loading}
          className="OuterTable"
          headerTitle="Our Products"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<ProductItem>;
            if (sorterResult.field && sorterResult.order) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            } else setSorter('');
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRowKeys }) => [
            <Button type="primary" onClick={() => history.push('products/create')}>
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
    brands,
    suppliers,
    loading,
  }: {
    products: any;
    brands: any;
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    products,
    brands,
    suppliers,
    loading: loading.models.products,
  }),
)(TableList);
