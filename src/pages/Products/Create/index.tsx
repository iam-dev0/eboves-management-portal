import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Select, Row, Upload, Col, Tag, Card,Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect, Dispatch,history } from 'umi';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';


export interface FormValueType {
  name?: string;
  supplier?: number;
  brand?: number;
  productType?: string;
  stockAvailableAt?: string;
  category?: number;
  subCategory?: number;
  subSubCategory?: number;
}

interface CreateFormProps {
  dispatch: Dispatch;
  loading: boolean;
  productCreate: any;
}

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const productInitialValues: FormValueType = {
  productType: 'eboves',
  stockAvailableAt: 'web',
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [productForm] = Form.useForm();
  const [Subcategories, SetSubcategories] = useState<
    { id: number; name: string; categoryId: number }[]
  >([]);
  const [SubSubcategories, SetSubSubcategories] = useState<
    { id: number; name: string; categoryId: number }[]
  >([]);

  const {
    loading,
    dispatch,
    productCreate: { brands, categories, suppliers, attributes },
  } = props;

  useEffect(() => {
    dispatch({ type: 'productCreate/fetchBrands' });
    dispatch({ type: 'productCreate/fetchSuppliers' });
    dispatch({ type: 'productCreate/fetchAttributes' });
    dispatch({ type: 'productCreate/fetchCategories' });
  }, []);

  const onCategoryChangeHandler = (value: number) => {
    productForm.setFieldsValue({ subCategory: null, subSubCategory: null });
    dispatch({
      type: 'productCreate/fetchSubcategores',
      payload: value,
      callback: (response: any) => SetSubcategories(response),
    });
  };
  const onSubCategoryChangeHandler = (value: number) => {
    productForm.setFieldsValue({ subSubCategory: null });
    dispatch({
      type: 'productCreate/fetchSubcategores',
      payload: value,
      callback: (response: any) => SetSubSubcategories(response),
    });
  };

  const normFile = (e: any) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values: any) => {
    dispatch({
      type: 'productCreate/create',
      payload: values,
      callback:(res)=>{history.push(`/products/${res.id}/variation/Create`)}
    });
  };
  return (
    <PageHeaderWrapper>
      <GridContent>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <Form
              layout="vertical"
              form={productForm}
              initialValues={productInitialValues}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col lg={24} md={24} sm={24}>
                  <FormItem
                    name="name"
                    label="Name"
                    // rules={[{ required: true, message: 'its is required!' }]}
                  >
                    <Input placeholder="Enter here.." />
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <FormItem name="supplierId" label="Supplier">
                    <Select placeholder="please select">
                      {suppliers &&
                        suppliers.map((supplier: { id: number; companyName: string }) => (
                          <Option key={supplier.id} value={supplier.id}>
                            {supplier.companyName}
                          </Option>
                        ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <FormItem name="brandId" label="Brand">
                    <Select placeholder="please select">
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

                <Col lg={8} md={8} sm={8}>
                  <FormItem name="categoryId" label="Category">
                    <Select onChange={onCategoryChangeHandler} placeholder="please select">
                      {categories &&
                        categories.map((category: { id: number; name: string }) => (
                          <Option key={category.id} value={category.id}>
                            {category.name}
                          </Option>
                        ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={8} md={8} sm={8}>
                  <FormItem name="subCategoryId" label="Sub Category">
                    <Select placeholder="please select" onChange={onSubCategoryChangeHandler}>
                      {Subcategories &&
                        Subcategories.map(
                          (category: { id: number; name: string; categoryId: number }) => {
                            return (
                              <Option key={category.id} value={category.id}>
                                {category.name}{' '}
                              </Option>
                            );
                          },
                        )}
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={8} md={8} sm={8}>
                  <FormItem label="Sub Sub Category" name="subSubCategoryId">
                    <Select placeholder="please select">
                      {SubSubcategories &&
                        SubSubcategories.map(
                          (category: { id: number; name: string; categoryId: number }) => {
                            return (
                              <Option key={category.id} value={category.id}>
                                {category.name}{' '}
                              </Option>
                            );
                          },
                        )}
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <FormItem
                    name="description"
                    label="Description"
                    // rules={[{ required: true, message: '', min: 5 }]}
                  >
                    <TextArea rows={4} placeholder="Enter.." />
                  </FormItem>
                </Col>
                <Col lg={24} md={24} sm={24}>
                  <Form.Item label="Images">
                    <Form.Item
                      name="images"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger listType="picture-card" name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>
                </Col>

                <Col lg={24} md={24} sm={24}>
                  <FormItem
                    label="Attributes"
                    name="attributes"
                    // rules={[{ required: true, message: '', min: 5 }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select attributes"
                      size="large"
                      // optionLabelProp="optionLable"
                      optionFilterProp="optionLable"
                    >
                      {attributes.map((attribute: { id: number; name: string; type: string }) => (
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
    productCreate,
    loading,
  }: {
    productCreate: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    productCreate,
    loading: loading.models.productCreate,
  }),
)(CreateForm);
