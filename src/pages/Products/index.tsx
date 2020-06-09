import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Switch, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { fetchProducts, getAllBrands } from './service';








// /**
//  * 添加节点
//  * @param fields
//  */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

// /**
//  * 更新节点
//  * @param fields
//  */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateRule({
//       name: fields.name,
//       brandId: fields.brandId,
//       productType: fields.productType,
//     });
//     hide();

//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };

// /**
//  *  删除节点
//  * @param selectedRows
//  */
// const handleRemove = async (selectedRows: TableListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       id: selectedRows.map((row) => row.id),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };


function toObject(arr: any) {
  if (!arr) return null;
  const rv = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++)
    rv[arr[i].id] = arr[i].name;
  return rv;
}


const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allBrands, SetallBrands] = useState<{ [key: string]: string }>({});
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();



  useEffect(() => {
    getAllBrands().then((bra) => {
      SetallBrands(toObject(bra))
    });
  }, [])


  const onChangeProductStatus = (id: number, status: boolean) => {
    setLoading(true);
    updateProductStatus(id, status).then((data: any) => {
      if (data.success) {
        setLoading(false);
      }
    })
  }
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Product',
      dataIndex: 'name',
      // rules: [
      //   {
      //     required: true,
      //     message: '规则名称为必填项',
      //   },
      // ],
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      valueType: 'text',
    },
    {
      title: 'Brands',
      dataIndex: 'brandId',
      valueEnum: allBrands,
      hideInTable: true,
    },
    {
      title: 'sku',
      dataIndex: 'sku',
      sorter: true,
      hideInForm: true,
      // renderText: (val: string) => `${val} 万`,
    },
    {
      title: 'active',
      dataIndex: 'active',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' }
      },
      renderText: (text, record) => {
        return <Switch defaultChecked={text} onChange={(value) => onChangeProductStatus(record.id, value)} />
      }
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
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            configure
          </a>
          {/* <Divider type="vertical" /> */}
          <a href="">Subscribe to alerts</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <IntlProvider value={enUSIntl} >
        <ProTable<TableListItem>
          loading={loading}
          headerTitle="Our Products"
          actionRef={actionRef}
          rowKey="id"
          search={{ searchText: 'Search', resetText: 'Rest', submitText: 'Submit' }}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<TableListItem>;
            if (sorterResult.field) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            }
          }}
          params={{
            sorter,
          }}
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
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
        />
      </IntlProvider>

      <CreateForm
        onClose={() => {
          handleModalVisible(false);
        }}
        Open={createModalVisible}
      />




      {
        stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                handleUpdateModalVisible(false);
                setStepFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null
      }
    </PageHeaderWrapper >
  );
};

export default TableList;
