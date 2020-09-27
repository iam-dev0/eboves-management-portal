import { Modal, Tag, Table, Row, Card, Col, Descriptions, Timeline, Button } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import { FieldTimeOutlined, UserOutlined, PrinterFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import PriceInvoice from '@/assets/PrintInvoice';

const OrderView: React.FC<any> = ({
  isOpen,
  onClose,
  id,
  loading,
  dispatch,
  orders: { order },
}) => {
  //   const { loading, dispatch } = props;
  //   const { id } = props.match.params;

  useEffect(() => {
    if (id)
      dispatch({
        type: 'orders/fetchOrder',
        payload: id,
      });

    return () => {
      dispatch({
        type: 'orders/putOrder',
        payload: {},
      });
    };
  }, [id]);

  const getPriceElement = (discountedprice: number, discountedPercentage: number) => {
    if (discountedPercentage > 0) {
      const orignal = discountedprice / (1 - discountedPercentage / 100);
      return (
        <div style={{ fontSize: '14px' }}>
          RS: {discountedprice} <del>{orignal}</del>
        </div>
      );
    }
    return <div style={{ fontSize: '14px' }}>RS: {discountedprice}</div>;
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: any) => (
        <div style={{ marginLeft: 10 }}>
          <div style={{ textDecoration: 'underline' }}>
            <a>{text}</a>
          </div>
          <div style={{ fontSize: '11px' }}>{record.sku}</div>
        </div>
      ),
    },

    {
      title: 'Amount',
      dataIndex: 'sellingPrice',
      render: (text: string, record: any) => (
        <div>{getPriceElement(text, record?.discountedPercentage)}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => <Tag>{text?.toUpperCase()}</Tag>,
    },
  ];

  const PrintInvoiceHandler = () => {
    const wInvice = window.open();
    // wInvice?.document.write=`Invoice# ${order.orderNumber}`;
    // eslint-disable-next-line no-unused-expressions
    wInvice?.document.write(PriceInvoice(order));
    setTimeout( ()=> {
      // eslint-disable-next-line no-unused-expressions
      wInvice?.window.print();
      // eslint-disable-next-line no-unused-expressions
      wInvice?.document.close();
      return false;
    }, 1000);
    // console.log('Printing Customer Invoices');
  };
  return (
    <Modal title="Order Detail" visible={isOpen} footer={false} width="80%" onCancel={onClose}>
      <Card
        loading={loading}
        style={{ marginTop: 8, padding: 0 }}
        title={
          <div>
            <div>
              {order?.orderNumber} ({order?.status})
            </div>
            <div>
              <FieldTimeOutlined /> {dayjs(order?.createAt).format('dddd, MMMM D YYYY, h:mm:ss a')}
            </div>
          </div>
        }
        bodyStyle={{ padding: 5 }}
        extra={
          <>
            <Button type="primary" icon={<PrinterFilled />} onClick={PrintInvoiceHandler}>
              Print Invoice
            </Button>
          </>
        }
      >
        <Row>
          <Col lg={17} md={16} sm={24}>
            <Card title="Detail" bordered={false} bodyStyle={{ padding: 0 }}>
              <Table
                columns={columns}
                dataSource={order?.products}
                pagination={false}
                style={{ width: '100%' }}
              />
            </Card>
            <Card title="Notes" bordered={false} style={{ marginTop: 50 }}>
              <Descriptions>
                <Descriptions.Item span={3} label="Order Notes">
                  kaskdfjakljsaf ksjadfl kj sadfklj
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Internal Notes">
                  what is this?
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col lg={6} md={8} sm={24} style={{ margin: 20 }}>
            {/* <Col>
              <Card
                title={
                  <div>
                    <UserOutlined /> Customer Details
                  </div>
                }
                style={{ marginTop: 10 }}
              >
               todo
              </Card>
            </Col> */}
            <Col>
              <Card
                title={
                  <div>
                    <UserOutlined /> Shipping Information
                  </div>
                }
                style={{ marginTop: 10 }}
              >
                <Descriptions className="custom-description">
                  <Descriptions.Item span={3} label="Name">
                    {order?.shippingInfo?.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Phone">
                    {order?.shippingInfo?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="email">
                    {order?.shippingInfo?.email}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Delivery To">
                    {order?.shippingInfo?.address}, {order?.shippingInfo?.city?.name}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card
                title={
                  <div>
                    <UserOutlined /> Price Detail
                  </div>
                }
                style={{ marginTop: 10 }}
              >
                {' '}
                <Descriptions className="custom-description">
                  <Descriptions.Item span={3} label="Sub Total">
                    Pkr.{order?.amount + order?.discountedAmount}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Shipment">
                    {order?.shippingCharges}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="GST">
                    {order?.tax}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Discount Percentage">
                    {order?.discountedPercentage} %
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Discount Amount">
                    {order?.discountedAmount}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Discount Reason">
                    {order?.discountReason}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Payable">
                    Pkr. {order?.amount + order?.shippingCharges}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col>
              <Card title="Timeline" style={{ marginTop: 10 }}>
                <Timeline mode="left">
                  <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Solve initial network problems
                  </Timeline.Item>
                  <Timeline.Item>Technical testing</Timeline.Item>
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Network problems being solved
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default connect(
  ({ orders, loading }: { orders: any; loading: { models: { [key: string]: boolean } } }) => ({
    orders,
    loading: loading.models.orders,
  }),
)(OrderView);
