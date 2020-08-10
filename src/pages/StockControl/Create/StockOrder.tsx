import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Card, Spin, Divider, Row, Col, DatePicker } from 'antd';

import { connect, Dispatch, history } from 'umi';
import {
  PageHeaderWrapper,
  GridContent,
  getPageTitle,
  MenuDataItem,
  RouteContext,
} from '@ant-design/pro-layout';
import DeliverySvg from '@/assets/svgs/delivery.svg';
import { ModelType } from '../model';
import EditableTable from './Components/EditableTable';
import { OutletItem } from '@/pages/ProductModule/Outlets/data';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  outlets: any;
  suppliers: any;
  route: MenuDataItem;
  match: any;
}

const { TextArea } = Input;
const { Option } = Select;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [outlet, setOutlet] = useState<OutletItem>();
  const {
    loading,
    dispatch,
    outlets: { outlets },
    suppliers: { suppliers },
  } = props;
  // const { id } = props.match.params;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({ type: 'suppliers/fetchSuppliers' });
    dispatch({ type: 'outlets/fetchOutlets' });
  }, []);

  useEffect(() => {
    if (outlets.length > 0) {
      setOutlet(outlets[0]);
      form.setFieldsValue({ outletId: outlets[0]?.id });
    }
  }, [outlets]);

  const outletChangeHandler = (value: any) => {
    setOutlet(outlets[outlets.findIndex((d: any) => d.id === value)]);
  };
  const onFinish = (values: any) => {
    // if (!id) {
    //   dispatch({
    //     type: 'suppliers/create',
    //     payload: values,
    //     callback: () => {
    //       history.push(`/procurement-module/suppliers`);
    //     },
    //   });
    //   return;
    // }
    // dispatch({
    //   type: 'suppliers/update',
    //   payload: { id, ...values },
    //   callback: () => {
    //     history.push(`/procurement-module/suppliers`);
    //   },
    // });
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
          <Button type="primary">Save</Button>
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
                <Divider orientation="left">Order Details</Divider>
                <Col lg={4} md={4} sm={4} offset={2}>
                  <p>
                    Adding details for this order helps you stay on top of all your orders and means
                    your staff can easily identify incoming items.
                  </p>
                </Col>
                <Col lg={18} md={18} sm={28}>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Item
                        name="supplierId"
                        label="Supplier"
                        rules={[{ required: true, message: 'Choose a Supplier' }]}
                      >
                        <Select
                          placeholder="Choose a Supplier"
                          size="large"
                          optionFilterProp="optionLable"
                        >
                          {suppliers?.map((item: OutletItem) => (
                            <Option key={item.id} value={item.id} optionLable={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Item
                        name="outletId"
                        label="Deliever to"
                        rules={[{ required: true, message: 'Choose an Outlet' }]}
                      >
                        <Select
                          allowClear
                          placeholder="Choose a Outlet"
                          optionFilterProp="optionLable"
                          defaultValue={1}
                          onChange={outletChangeHandler}
                        >
                          {outlets?.map((item: OutletItem) => (
                            <Option key={item.id} value={item.id} optionLable={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Item name="supplierInvoiceNumber" label="Supplier Invoice Number">
                        <Input placeholder="Enter a supplier invoice number" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Item name="deliverDate" label="Delivery Date">
                        <DatePicker style={{ width: '100%' }} placeholder="Choose Date" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item
                          name="orderNumber"
                          label="Order Number"
                          rules={[{ required: true, message: 'Enter a Uniqe Order Number' }]}
                        >
                          <Input placeholder="Please enter user name" />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item name="note" label="Note">
                          <TextArea placeholder="Enter a note for this order" rows={3} />
                        </Form.Item>
                      </Col>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                      <Card
                        title={
                          <div>
                            <Row>
                              <Col lg={3} md={3} sm={3}>
                                <img src={DeliverySvg} alt="DeliverySvg" width="40px" />
                              </Col>
                              <Col>
                                <span>M191-0</span>
                                <br />
                                <small>
                                  <small>Due: Tue, 4 Aug 2020</small>
                                </small>
                              </Col>
                            </Row>
                          </div>
                        }
                        style={{ marginLeft: '12px' }}
                      >
                        <p>
                          This number and delivery date will be visible to your cashiers and
                          managers to help them identify inbound inventory.
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={16}>
                <Divider orientation="left">Products</Divider>
                <Col lg={4} md={4} sm={4} offset={2}>
                  <p>
                    Choose products to add to this order, or choose a CSV file of products to
                    import.
                  </p>
                </Col>
                <Col lg={18} md={18} sm={28}>
                  <EditableTable outlet={outlet} />
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
  ({
    suppliers,
    outlets,
    loading,
  }: {
    suppliers: ModelType;
    outlets: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    outlets,
    suppliers,
    // loading: loading.models.suppliers,
    loading: false,
  }),
)(CreateForm);
