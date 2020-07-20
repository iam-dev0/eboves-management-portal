import React, { useEffect } from 'react';
import { Form, Button, Input, Select, Card, Spin, Divider } from 'antd';

import { connect, Dispatch, history } from 'umi';
import { PageHeaderWrapper, GridContent, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import { ModelType } from '../model';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  brands: any;
  suppliers: any;
  route: MenuDataItem;
  match: any;
}

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const {
    loading,
    dispatch,
    brands: { brand },
    suppliers: { suppliers, supplier },
  } = props;
  const { id } = props.match.params;
  const [form] = Form.useForm();

  useEffect(() => {
    if (id)
      dispatch({
        type: 'suppliers/fetchSupplier',
        payload: id,
      });

    return () => {
      dispatch({
        type: 'brands/resetStates',
      });
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (supplier.id) {
      form.setFieldsValue(supplier);
    }
  }, [supplier]);

  const onFinish = (values: any) => {
    if (!id) {
      dispatch({
        type: 'suppliers/create',
        payload: values,
        callback: () => {
          history.push(`/procurement-module/suppliers`);
        },
      });
      return;
    }
    dispatch({
      type: 'suppliers/update',
      payload: { id, ...values },
      callback: () => {
        history.push(`/procurement-module/suppliers`);
      },
    });
  };

  const onFinishFailed = (error: any) => {
    form.scrollToField(error.errorFields[0].name, {
      behavior: 'smooth',
      block: 'center',
      scrollMode: 'if-needed',
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="92">
        <Option value="92">+92</Option>
        {/* <Option value="87">+87</Option> */}
      </Select>
    </Form.Item>
  );
  return (
    <PageHeaderWrapper
      title={getPageTitle({
        title: props.route.name,
      })}
    >
      <GridContent>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
              form={form}
              onFinishFailed={onFinishFailed}
            >
              <Divider orientation="left">Basic Information</Divider>
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item name="code" label="Supplier Code">
                <Input placeholder="enter." />
              </Form.Item>
              <Form.Item name="countryId" label="Country">
                <Select placeholder="Please select a supplier">
                  {suppliers.map((supplier: any) => (
                    <Option value={supplier.id} key={supplier.id}>
                      {supplier.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Brands" name="brands">
                <Select
                  mode="multiple"
                  placeholder="Select attributes"
                  optionFilterProp="optionLable"
                >
                  {suppliers.map((supplier: any) => (
                    <Option value={supplier.id} key={supplier.id}>
                      {supplier.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="website" label="Website">
                <Input placeholder="Please enter.." />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <TextArea rows={4} placeholder="Enter.." />
              </Form.Item>

              <Divider orientation="left">Contact Information</Divider>

              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "It's required" }]}
              >
                <Input placeholder="Please enter." />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input placeholder="Please enter." />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "It's required" }]}
              >
                <Input addonBefore={prefixSelector} />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    brands,
    suppliers,
    loading,
  }: {
    brands: ModelType;
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    brands,
    suppliers,
    // loading: loading.models.suppliers,
    loading: false,
  }),
)(CreateForm);
