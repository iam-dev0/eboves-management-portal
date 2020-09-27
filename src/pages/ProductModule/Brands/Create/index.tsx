import React, { useEffect } from 'react';
import { Form, Button, Input, Select, Card, Spin, Divider } from 'antd';

import { connect, Dispatch, history } from 'umi';
import { PageHeaderWrapper, GridContent, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import UploadImages from '@/components/UploadImages';
import EditableTagGroup from '@/components/AddTags';
import { upload } from '@/services/upload';
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
    suppliers: { suppliers },
  } = props;
  const { id } = props.match.params;
  const [form] = Form.useForm();

  useEffect(() => {
    if (id)
      dispatch({
        type: 'brands/fetch',
        payload: id,
      });
    dispatch({
      type: 'suppliers/fetchSuppliers',
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
    if (brand) {
      const values = {
        ...brand,
        logo: brand.logo ? [{ uid: 1, url: brand.logo }] : undefined,
        storyCover: brand.storyCover?[{ uid: 1, url: brand.storyCover }]:undefined,
        metaKeywords: brand.metaKeywords?.split(','),
      };
      form.setFieldsValue(values);
    }
  }, [brand]);

  const onFinish = (values: any) => {
    if (!id) {
      dispatch({
        type: 'brands/create',
        payload: {
          ...values,
          storyCover: values.storyCover
            ?.filter((file: any) => file.response?.url || file.url)
            .map((file: any) => ({ id: file.uid, url: file.response.url || file.url })),
          logo: values.logo
            ?.filter((file: any) => file.response?.url || file.url)
            .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
          metaKeywords: values.metaKeywords?.join(),
        },
        callback: () => {
          history.push(`/product-module/brands`);
        },
      });
      return;
    }
    dispatch({
      type: 'brands/update',
      payload: {
        ...values,
        id,
        storyCover: values.storyCover
          ?.filter((file: any) => file.response?.url || file.url)
          .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
        logo: values.logo
          ?.filter((file: any) => file.response?.url || file.url)
          .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
        metaKeywords: values.metaKeywords?.join(),
      },
      callback: () => {
        history.push(`/product-module/brands`);
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
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
              {/* <Form.Item
                name="supplierId"
                label="Supplier"
                rules={[{ required: true, message: 'Please select your country!' }]}
              >
                <Select placeholder="Please select a supplier">
                  {suppliers.map((supplier: any) => (
                    <Option value={supplier.id} key={supplier.id}>
                      {supplier.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
              <Form.Item name="logo" label="Logo">
                <UploadImages request={upload} data={{ folder: 'images/brands/logo/' }}/>
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

              <Divider orientation="left">Seo Information</Divider>
              <Form.Item name="storyText" label="Story Text">
                <TextArea placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item label="Story Cover">
                <Form.Item name="storyCover" noStyle>
                  <UploadImages wall request={upload} data={{ folder: 'images/brands/banners/' }}/>
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
    loading: loading.models.brands || loading.models.suppliers,
  }),
)(CreateForm);
