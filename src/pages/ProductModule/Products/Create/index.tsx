import React, { useEffect } from 'react';
import { Form, Button, Input, Select, Row, Col, Tag, Card, Spin, Cascader, Divider } from 'antd';
import { connect, Dispatch, history } from 'umi';
import { PageHeaderWrapper, GridContent, getPageTitle, MenuDataItem } from '@ant-design/pro-layout';
import UploadImages from '@/components/UploadImages';
import EditableTagGroup from '@/components/AddTags';
import { findPath } from '@/utils/utils';
import { upload } from '@/services/upload';
import { AttributeItem } from '../../Attributes/data';

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  products: any;
  brands: any;
  match: any;
  categories: any;
  attributes: any;
  suppliers: any;
  route: MenuDataItem;
}

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const productInitialValues = {
  productType: 'eboves',
  stockAvailableAt: 'web',
};

const filter = (inputValue: any, path: any): any => {
  return path.some(
    (option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { id } = props.match.params;
  const {
    loading,
    dispatch,
    products: { product },
    brands: { brands },
    categories: { categories },
    suppliers: { suppliers },
    attributes: { attributes },
  } = props;

  useEffect(() => {
    if (product.id) {
      const path = findPath(categories, {
        id: product.categoryId,
      })?.map((item: any) => item.id);

      const values = {
        ...product,
        categoryId: path,
        images: product.mainImage
          ? [
              { uid: 1, url: product.mainImage },
              ...product.images?.map((image: any) => ({
                uid: image.id,
                url: image.image,
              })),
            ]
          : [],
        attributes: product.attributes?.map((attribute: any) => attribute.id),
        descriptionImage: !product.descriptionImage || [{ uid: 1, url: product.descriptionImage }],
        metaKeywords: product.metaKeywords?.split(','),
      };
      form.setFieldsValue(values);
    }
  }, [product, categories]);

  useEffect(() => {
    if (id) dispatch({ type: 'products/fetchProduct', payload: id });
    dispatch({ type: 'suppliers/fetchSuppliers' });
    dispatch({ type: 'categories/fetchCategories' });
    dispatch({ type: 'brands/fetchBrands' });
    dispatch({ type: 'attributes/fetchAttributes' });
    dispatch({ type: 'categories/fetchCategories' });
    return () => {
      dispatch({ type: 'products/reset' });
      form.resetFields();
    };
  }, []);

  const onFinish = (values: any) => {
    if (!id) {
      dispatch({
        type: 'products/create',
        payload: {
          ...values,
          categoryId: values.categoryId[2],
          images: values.images?.filterImages(),
          descriptionImage: Array.isArray(values.descriptionImage)
            ? values.descriptionImage?.filterImages()
            : undefined,
          metaKeywords: values.metaKeywords?.join(),
        },
        callback: (res) => {
          if (res) history.push(`/product-module/products/${res.id}/variations/create`);
        },
      });
      return;
    }

    dispatch({
      type: 'products/updateProduct',
      payload: {
        ...values,
        id,
        categoryId: values.categoryId[2],
        images: values.images?.filterImages(),
        descriptionImage: Array.isArray(values.descriptionImage)
          ? values.descriptionImage?.filterImages()
          : undefined,
        metaKeywords: values.metaKeywords?.join(),
      },
      callback: (res) => {
        if (res) history.push(`/product-module/products`);
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
            <Divider orientation="left">Product Basic Information</Divider>
            <Form
              layout="vertical"
              form={form}
              initialValues={productInitialValues}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={16}>
                <Col lg={24} md={24} sm={24}>
                  <FormItem
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'it is required!' }]}
                  >
                    <Input placeholder="Enter here.." />
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <FormItem
                    name="supplierId"
                    label="Supplier"
                    rules={[{ required: true, message: 'it is required!' }]}
                  >
                    <Select
                      placeholder="please select"
                      filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      showSearch
                      autoClearSearchValue
                    >
                      {suppliers &&
                        suppliers.map((supplier: { id: number; name: string }) => (
                          <Option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </Option>
                        ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <FormItem
                    name="brandId"
                    label="Brand"
                    rules={[{ required: true, message: 'it is required!' }]}
                  >
                    <Select
                      placeholder="please select"
                      filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      showSearch
                      autoClearSearchValue
                    >
                      {brands &&
                        brands.map((brand: { id: number; name: string }) => (
                          <Option key={brand.id} value={brand.id}>
                            {brand.name}
                          </Option>
                        ))}
                    </Select>
                  </FormItem>
                </Col>

                <Col lg={12} md={12} sm={12}>
                  <FormItem name="productType" label="Product Type">
                    <Select placeholder="please select">
                      <Option value="eboves">Eboves</Option>
                      <Option value="supplier">Other Supplier</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <FormItem name="stockAvailableAt" label="Stock Available At">
                    <Select placeholder="please select">
                      <Option value="web">Web</Option>
                      <Option value="store">Store</Option>
                    </Select>
                  </FormItem>
                </Col>

                <Col lg={24} md={24} sm={24}>
                  <FormItem
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'it is required!' }]}
                  >
                    <Cascader showSearch={{ filter }} options={categories} />
                  </FormItem>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <FormItem name="description" label="Description">
                    <TextArea rows={4} placeholder="Enter.." />
                  </FormItem>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <FormItem name="additionalInformation" label="Additional Infromation">
                    <TextArea rows={4} placeholder="Enter.." />
                  </FormItem>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <Form.Item label="Images">
                    <Form.Item name="images" noStyle>
                      <UploadImages request={upload} data={{ folder: 'imagesproducts/' }} type="wall-list" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                {/* <Col lg={24} md={24} sm={24}>
                  <Form.Item label="Description Image">
                    <Form.Item name="descriptionImage" noStyle>
                      <UploadImages request={upload} data={{ folder: 'Name' }} />
                    </Form.Item>
                  </Form.Item>
                </Col> */}
                <Col lg={24} md={24} sm={24}>
                  <FormItem label="Attributes" name="attributes">
                    <Select
                      mode="multiple"
                      placeholder="Select attributes"
                      size="large"
                      // optionLabelProp="optionLable"
                      optionFilterProp="optionLable"
                    >
                      {attributes.map((attribute: AttributeItem) => (
                        <Option
                          key={attribute.id}
                          value={attribute.id}
                          optionLable={attribute.name}
                        >
                          {attribute.name} &nbsp;
                          <Tag color="blue"> {attribute.type}</Tag>
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Divider orientation="left">Seo Information</Divider>
                <Col lg={24} md={24} sm={24}>
                  <Form.Item name="metaKeywords" label="Meta Keywords">
                    <EditableTagGroup />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <Form.Item name="metaTitle" label="Meta Title">
                    <Input placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <Form.Item name="metaDescription" label="Meta Description">
                    <TextArea placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <FormItem>
                    <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </FormItem>
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
    products,
    categories,
    brands,
    suppliers,
    attributes,
    loading,
  }: {
    products: any;
    attributes: any;
    categories: any;
    brands: any;
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    products,
    attributes,
    categories,
    brands,
    suppliers,
    loading: loading.models.products || loading.models.products || loading.models.attributes,
  }),
)(CreateForm);
