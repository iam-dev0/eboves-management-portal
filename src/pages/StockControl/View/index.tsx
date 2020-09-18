import { DownloadOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { connect, history, Link } from 'umi';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ProColumns, IntlProvider, enUSIntl } from '@ant-design/pro-table';
import OrderBasicView from '../Components/OrderBasicView';
import { generateStockRequestPdf } from '../service';

const StockRequestView: React.FC<any> = (props) => {
  const { loading, dispatch } = props;
  const { id } = props.match.params;
  const {
    stock: { stockOrder },
  } = props;

  useEffect(() => {
    dispatch({ type: 'stock/fetchOrder', payload: id });
  }, []);

  const onPrintHandler = async () => {
    const blob = await generateStockRequestPdf(id);
    if (blob) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      // eslint-disable-next-line no-unused-expressions
      window.open(data)?.print();
      // const link = document.createElement('a');
      // link.href = data;
      // link.download = 'file.pdf';
      // link.click();
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    }
  };

  const onDownloadHandler = async () => {
    const blob = await generateStockRequestPdf(id);
    if (blob) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([blob], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      // eslint-disable-next-line no-unused-expressions
      const link = document.createElement('a');
      link.href = data;
      link.download = 'file.pdf';
      link.click();
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    }
  };

  const onCancelHandler = () => {
    dispatch({ type: 'stock/cancelOrder', payload: id });
  };

  const onSendHandler = () => {
    dispatch({ type: 'stock/sendOrder', payload: id });
  };
  const action = (
    <RouteContext.Consumer>
      {() => (
        <>
          <Button.Group style={{ marginRight: '10px' }}>
            {(stockOrder.status === 'OPEN' || stockOrder.status === 'SENT') && (
              <Button onClick={onSendHandler}>Send</Button>
            )}
            {(stockOrder.status === 'OPEN' || stockOrder.status === 'SENT') && (
              <Link to={`/stock-control-module/stock-movement/${id}/receive`}>
                <Button type="primary">Receive</Button>
              </Link>
            )}
            {(stockOrder.status === 'OPEN' || stockOrder.status === 'SENT') && (
              <Button type="primary" icon={<EditOutlined />}>
                Edit
              </Button>
            )}
            <Button type="primary" onClick={onPrintHandler} icon={<PrinterOutlined />}>
              Print
            </Button>
            <Button type="primary" onClick={onDownloadHandler} icon={<DownloadOutlined />}>
              Download
            </Button>
          </Button.Group>
          {(stockOrder.status === 'OPEN' || stockOrder.status === 'SENT') && (
            <Button onClick={onCancelHandler}>Cancel</Button>
          )}
        </>
      )}
    </RouteContext.Consumer>
  );

  const columns: ProColumns<any>[] = [
    {
      title: 'Order No',
      fixed: 'left',
      width: '95px',
      render: (text, record, index) => index,
    },
    {
      title: 'Name',
      dataIndex: 'supplier',
      render:(text:any)=>text?.companyName,
      fixed: 'left',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      sorter: true,
    },
    {
      title: 'Stock',
      dataIndex: 'availableQuantity',
      sorter: true,
    },
    {
      title: 'Ordered',
      dataIndex: 'requestedQuantity',
      sorter: true,
    },
    {
      title: 'Received',
      dataIndex: 'receivedQuantity',
      sorter: true,
    },
    {
      title: 'Requested Cost',
      dataIndex: 'requestedPrice',
      sorter: true,
    },
    {
      title: 'Suppy Cost',
      dataIndex: 'receivedPrice',
      sorter: true,
    },
    {
      title: 'Retail Price',
      dataIndex: 'price',
      sorter: true,
    },
    {
      title: 'Total Retail Price',
      dataIndex: '',
      fixed: 'right',
      sorter: true,
      render: (text, record) =>
        record.price * (record.receivedQuantity || record.requestedQuantity),
    },
  ];

  return (
    <PageHeaderWrapper extra={action}>
      <Card title={`${stockOrder?.orderNumber} (${stockOrder?.status})`} bordered={false}>
        <OrderBasicView OrderInfo={stockOrder} />
      </Card>
      <IntlProvider value={enUSIntl}>
        <ProTable<any>
          loading={loading}
          search={false}
          dataSource={stockOrder?.variations}
          headerTitle="Products"
          rowKey="id"
          toolBarRender={() => [
            <Button type="primary" onClick={() => history.push('suppliers/create')}>
              <DownloadOutlined /> Import Products
            </Button>,
          ]}
          tableAlertRender={false}
          columns={columns}
          pagination={false}
          scroll={{ x: 2000 }}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    suppliers,
    stock,
    loading,
  }: {
    stock: any;
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    suppliers,
    stock,
    loading: loading.models.suppliers,
  }),
)(StockRequestView);
