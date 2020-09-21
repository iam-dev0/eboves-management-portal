import React, { useEffect } from 'react';
import { Form, Button, Input, Select, Card, Spin, Divider, Cascader } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { PageHeaderWrapper, GridContent, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import UploadImages from '@/components/UploadImages';
import EditableTagGroup from '@/components/AddTags';
import { findPath } from '@/utils/utils';
import { upload } from '@/services/upload';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  categories: any;
  location: any;
  route: MenuDataItem;
  match: any;
}

const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const filter = (inputValue: any, path: any): any => {
  return path.some(
    (option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const {
    loading,
    dispatch,
    categories: { categories, category },
  } = props;

  const { id } = props.match.params;

  const categoryId = props.location?.state?.categoryId;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'categories/fetchCategories',
    });

    if (id)
      dispatch({
        type: 'categories/fetchCategory',
        payload: id,
      });
    return () => {
      dispatch({
        type: 'categories/resetStates',
      });
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (category) {
      const values = {
        ...category,
        categoryId: [],
        image: category.image ? [{ uid: 1, url: category.image }] : undefined,
        storyCover: category.storyCover ? [{ uid: 1, url: category.storyCover }] : undefined,
        metaKeywords: category.metaKeywords?.split(','),
      };
      form.setFieldsValue(values);
    }

    if ((categoryId || category) && categories?.length > 0) {
      // eslint-disable-next-line radix
      const path = findPath(categories, {
        id: category ? category.categoryId : categoryId,
      })?.map((item: any) => item.id);
      if (path) form.setFieldsValue({ categoryId: path });
    }
  }, [categories, category]);

  const onFinish = (values: any) => {
    if (!id) {
      dispatch({
        type: 'categories/create',
        payload: {
          ...values,
          categoryId:
            values.categoryId?.length > 0 ? values.categoryId[values.categoryId.length - 1] : null,
          storyCover: values.storyCover
            ?.filter((file: any) => file.response?.url || file.url)
            .map((file: any) => ({ id: file.uid, url: file.response.url || file.url })),
          image: values.logo
            ?.filter((file: any) => file.response?.url || file.url)
            .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
          metaKeywords: values.metaKeywords?.join(),
        },
        callback: () => {
          history.push(`/product-module/categories`);
        },
      });
      return;
    }
    dispatch({
      type: 'categories/update',
      payload: {
        ...values,
        id,
        categoryId:
          values.categoryId?.length > 0 ? values.categoryId[values.categoryId.length - 1] : null,
        storyCover: values.storyCover
          ?.filter((file: any) => file.response?.url || file.url)
          .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
        image: values.image
          ?.filter((file: any) => file.response?.url || file.url)
          .map((file: any) => ({ id: file.uid, url: file.response?.url || file.url })),
        metaKeywords: values.metaKeywords?.join(),
      },
      callback: () => {
        history.push(`/product-module/categories`);
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
                rules={[{ required: true, message: 'Please enter name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
              <Form.Item name="slug" label="Slug">
                <Input placeholder="Please here" />
              </Form.Item>
              <Form.Item name="categoryId" label="Parent Category">
                <Cascader showSearch={{ filter }} options={categories} changeOnSelect />
              </Form.Item>
              <Form.Item name="image" label="Image">
                <UploadImages request={upload} data={{ folder: 'imagesbrands/logo/' }}/>
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
                  <UploadImages wall request={upload} data={{ folder: 'imagesbrands/banners/' }}/>
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
    categories,
    loading,
  }: {
    categories: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    categories,
    loading: loading.models.categories,
  }),
)(CreateForm);
