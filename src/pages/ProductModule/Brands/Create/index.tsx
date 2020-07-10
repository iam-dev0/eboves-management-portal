import React, { useEffect } from 'react';
import { Form, Button, Input, Select, Card, Spin, Divider } from 'antd';

import { connect, Dispatch, history } from 'umi';
import { PageHeaderWrapper, GridContent, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import UploadImages from '@/components/UploadImages';
import EditableTagGroup from '@/components/AddTags';
import { upload } from '../service';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  brands: any;
  route: MenuDataItem;
  match: any;
}

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const {
    loading,
    dispatch,
    brands: { brand },
  } = props;
  const { id } = props.match.params;
  const [form] = Form.useForm();

  useEffect(() => {
    if (id)
      dispatch({
        type: 'brands/fetch',
        payload: id,
      });
  }, []);

  useEffect(() => {
    if (brand) {
      const values = {
        ...brand,
        logo: [{ uid: 1, url: brand.logo1 }],
        storyCover: [{ uid: 1, url: brand.storyCover }],
        metaKeywords: brand.metaKeywords?.split(','),
      };
      form.setFieldsValue(values);
    }
  }, [brand]);
  const onFinish = (values: any) => {
    dispatch({
      type: 'brands/create',
      payload: {
        ...values,
        storyCover: values.storyCover?.map((item: any) => ({ ...item, id: item.uid })),
        logo: values.logo?.map((item: any) => ({ ...item, id: item.uid })),
        metaKeywords: values.metaKeywords?.join(),
      },
      callback: () => {
        history.push(`/product-module/brands`);
      },
    });
  };
  return (
    <PageHeaderWrapper
      title={getPageTitle({
        title: props.route.name,
      })}
    >
      <GridContent>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <Form name="validate_other" {...formItemLayout} onFinish={onFinish} form={form}>
              <Divider orientation="left">Basic Information</Divider>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item
                name="supplierId"
                label="Supplier"
                rules={[{ required: true, message: 'Please select your country!' }]}
              >
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="logo"
                label="Logo"
                // valuePropName="fileList"
                // getValueFromEvent={normFile}
              >
                <UploadImages request={upload} />
              </Form.Item>
              <Divider orientation="left">Meta Information</Divider>

              <Form.Item name="metaKeywords" label="Meta Keywords">
                <EditableTagGroup />
              </Form.Item>
              <Form.Item name="metaTitle" label="Meta Title">
                <Input placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item name="metaDescription" label="Meta Description">
                <TextArea placeholder="Please enter user name" />
              </Form.Item>

              <Divider orientation="left">Extended Information</Divider>
              <Form.Item
                name="storyText"
                label="Story Text"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <TextArea placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item label="Story Cover">
                <Form.Item
                  name="storyCover"
                  // valuePropName="fileList"
                  // getValueFromEvent={normFile}
                  noStyle
                >
                  <UploadImages wall request={upload} />
                </Form.Item>
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
  ({ brands, loading }: { brands: any; loading: { models: { [key: string]: boolean } } }) => ({
    brands,
    loading: loading.models.brands,
  }),
)(CreateForm);
