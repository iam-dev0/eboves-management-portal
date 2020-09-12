import React, { useEffect } from 'react';
import { Form, Button, Card, Spin, Divider, Row, Col } from 'antd';
import { connect, Dispatch } from 'umi';
import {
  PageHeaderWrapper,
  GridContent,
  getPageTitle,
  MenuDataItem,
  RouteContext,
} from '@ant-design/pro-layout';
import OrderBasicView from '../Components/OrderBasicView';
import EditableTable from '../Components/EditableTable';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  route: MenuDataItem;
  stock: any;
  match: any;
}

// const { TextArea } = Input;
// const { Option } = Select;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { loading, dispatch } = props;

  const [form] = Form.useForm();

  const { id } = props.match.params;

  const {
    stock: { stockOrder },
  } = props;

  useEffect(() => {
    dispatch({ type: 'stock/fetchOrder', payload: id });
  }, []);

  useEffect(() => {
    if (stockOrder)
      form.setFieldsValue({
        variations: stockOrder?.variations?.map((item: any) => {
          return {
            ...item,
            id: item.productVariationId,
            quantity: item.requestedQuantity,
            supplierPrice: item.requestedPrice,
          };
        }),
      });
  }, [stockOrder]);

  const onFinish = (values: any) => {
    dispatch({
      type: 'stock/stockReceived',
      payload: {
        outletId: stockOrder.outletId,
        id: stockOrder.id,
        supplierId: stockOrder.supplierId,
        ...values,
      },
      // callback: () => {
      //   history.push(`/procurement-module/suppliers`);
      // },
    });
  };

  const onFinishFailed = (error: any) => {
    form.scrollToField(error.errorFields[0].name, {
      behavior: 'smooth',
      block: 'center',
      scrollMode: 'if-needed',
    });
  };

  const action = (
    <RouteContext.Consumer>
      {() => (
        <>
          <Button type="primary" onClick={form.submit}>
            Receive
          </Button>
          <Button style={{ margin: '0px 5px 0px 5px' }}>Cancel</Button>
        </>
      )}
    </RouteContext.Consumer>
  );

  return (
    <PageHeaderWrapper
      title={getPageTitle({
        title: props.route.name,
      })}
      extra={action}
    >
      <GridContent>
        <Spin spinning={loading}>
          <Card
            bordered={false}
            style={{ marginBottom: '15px' }}
            title={`${stockOrder?.orderNumber} (${stockOrder?.status})`}
          >
            <OrderBasicView OrderInfo={stockOrder} />
          </Card>

          <Card bordered={false}>
            <Form
              name="validate_other"
              // {...formItemLayout}
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="stock_movement"
              form={form}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={16}>
                <Divider orientation="left">Products</Divider>
                <Col lg={4} md={4} sm={4} offset={2}>
                  <p>
                    Choose products to add to this order, or choose a CSV file of products to
                    import.
                  </p>
                </Col>
                <Col lg={18} md={18} sm={28}>
                  <Form.Item name="variations">
                    <EditableTable outlet={stockOrder.outlet} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Spin>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ stock, loading }: { stock: any; loading: { models: { [key: string]: boolean } } }) => ({
    stock,
    loading: false,
  }),
)(CreateForm);
