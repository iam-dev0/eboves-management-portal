import React, { useState, useEffect, ReactElement } from 'react';
import {
  Form,
  Button,
  Card,
  Input,
  Row,
  Col,
  Divider,
  Descriptions,
  Spin,
  Tooltip,
  InputNumber,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import { capitalizeFirstLetter } from '@/utils/utils';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import UploadImages from '@/components/UploadImages';
import dayjs from 'dayjs';
import styles from './style.less';
import { upload } from '../service';

const FormItem = Form.Item;

export interface BarcodeType {
  barcode?: string;
  supplyPrice?: number;
}

export interface FormVarationsValueType {
  sku?: string;
  slug?: string;
  costPrice?: number;
  barcodes?: Array<BarcodeType>;
}

const CreateVariationForm: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const {
    loading,
    dispatch,
    match,
    products: { product },
  } = props;

  const { id } = match.params;
  useEffect(() => {
    dispatch({ type: 'products/fetchProduct', payload: id });
    form.setFieldsValue({ variations: [{}] });
  }, []);

  const cardHeaderButtons = (remove: any, name: any, show: boolean) => {
    return (
      <>
        {show && (
          <span onClick={() => remove(name)} className={styles.removeButton}>
            x
          </span>
        )}
      </>
    );
  };

  const getAttributeValues = (attribute: any): any => {
    if (attribute?.length > 0) {
      const attributes = [];
      const incommingAttribute = product?.attributes;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < incommingAttribute?.length; i++) {
        attributes.push({
          id: incommingAttribute[i].id,
          value: !Array.isArray(attribute[i].value)
            ? attribute[i].value
            : attribute[i].value.filterImages[0],
          alt: attribute[i].alt,
        });
      }

      return attributes;
    }
    return undefined;
  };
  const onFinish = (values: any) => {
    dispatch({
      type: 'products/createVariations',
      payload: {
        // ...values,
        productId: id,
        variations: values.variations.map((vairation: any) => {
          return {
            ...vairation,
            images: vairation.images?.filterImages(),
            attributes: getAttributeValues(vairation.attributes),
          };
        }),
      },
      callback: (res) => {
        // eslint-disable-next-line no-restricted-globals
        if (res) history.push(`/product-module/products/${id}`);
      },
    });
  };

  const action = (
    <RouteContext.Consumer>
      {() => (
        <>
          <Button.Group>
            <Button>View</Button>
            <Button style={{ marginRight: '5px' }}>Edit</Button>
          </Button.Group>
          <Button type="primary">Delete</Button>
        </>
      )}
    </RouteContext.Consumer>
  );

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 3}>
          <Descriptions.Item label="Name">{product?.name}</Descriptions.Item>
          <Descriptions.Item label="Brand">{product?.brand?.name}</Descriptions.Item>
          <Descriptions.Item label="Supplier">{product?.supplier?.name}</Descriptions.Item>
          <Descriptions.Item label="Product Typoe">{product?.productType}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(product?.createdAt).format('DD-MM-YYYY hh:mm')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  const extra = (
    <div style={{ marginTop: '35px' }}>
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </div>
  );

  const Barcodes = (fields: any, { add, remove }: any): any => {
    return (
      <div>
        <Divider orientation="left">Barcodes</Divider>
        {fields.map((field: any) => (
          <Row key={field.key} gutter={12}>
            <Col lg={11} md={10} sm={10}>
              <Form.Item
                {...field}
                label="Barcode"
                name={[field.name, 'barcode']}
                fieldKey={[field.key, 'barcode']}
                rules={[{ required: true, message: 'Missing barcode' }]}
              >
                <Input placeholder="barcode" />
              </Form.Item>
            </Col>
            <Col lg={2} md={2} sm={2}>
              <MinusCircleOutlined
                style={{ marginTop: '40px' }}
                onClick={() => {
                  remove(field.name);
                }}
              />
            </Col>
          </Row>
        ))}

        <Form.Item>
          <Button
            type="dashed"
            onClick={() => {
              add();
            }}
            block
          >
            <PlusOutlined /> Add field
          </Button>
        </Form.Item>
      </div>
    );
  };

  const AttributeItem = (attribute: any, index: number) => {
    switch (attribute.type) {
      case 'image':
        return (
          <>
            <Row gutter={12}>
              <Col lg={8} md={8} sm={8}>
                <Form.Item
                  label={capitalizeFirstLetter(attribute.name)}
                  name={[index, 'value']}
                  // fieldKey={[attribute.id, 'attribute']}
                >
                  <UploadImages type="button" />
                </Form.Item>
              </Col>
              <Col lg={16} md={16} sm={16}>
                <Form.Item
                  label="Alt"
                  name={[index, 'alt']}
                  // fieldKey={[attribute.id, 'attribute']}
                  rules={[{ required: true, message: 'Missing' }]}
                >
                  <Input placeholder="enter alter value" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      default:
        return (
          <Row gutter={12}>
            <Col lg={18} md={18} sm={18}>
              <Form.Item
                label={capitalizeFirstLetter(attribute.name)}
                name={[index, 'value']}
                // fieldKey={[attribute.id, 'attribute']}
                rules={[{ required: true, message: 'Missing Price' }]}
              >
                <Input placeholder="enter here" />
              </Form.Item>
            </Col>
          </Row>
        );
    }
  };
  const AttributesList = () => {
    return (
      <div>
        <Divider orientation="left">Attributes</Divider>
        {product?.attributes?.map((attribute: any, index: number) =>
          AttributeItem(attribute, index),
        )}
      </div>
    );
  };

  const FormVaritions = (fields: any, { add, remove }: any) => {
    return (
      <div>
        {fields.map((field: any) => (
          <Card
            title={`${field.key + 1}) Variation Information`}
            className={styles.card}
            bordered={false}
            key={field.key}
            extra={cardHeaderButtons(remove, field.name, fields.length > 1)}
          >
            <Row gutter={16}>
              <Col lg={8} md={8} sm={24}>
                <FormItem
                  name={[field.name, 'sku']}
                  label="SKU"
                  rules={[{ required: true, message: 'Sku is required' }]}
                >
                  <Input placeholder="Enter." />
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={24}>
                <FormItem
                  name={[field.name, 'price']}
                  label="Retail Price"
                  rules={[{ required: true, message: 'price is required' }]}
                  initialValue={0}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value = '0') => value.replace(/Rs.\s?|(,*)/g, '')}
                  />
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8}>
                <FormItem
                  name={[field.name, 'supplierPrice']}
                  label="Supplier Price"
                  rules={[{ required: true, message: 'price is required' }]}
                  initialValue={0}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value = '0') => value.replace(/Rs.\s?|(,*)/g, '')}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <FormItem name={[field.name, 'shortDescription']} label="Feature Description">
                  <Input.TextArea placeholder="Enter." />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <FormItem name={[field.name, 'images']} label="Images">
                  <UploadImages type="wall-list" request={upload} />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              {product?.attributes?.length > 0 && (
                <Col lg={22} md={22} sm={22} offset={1}>
                  <Form.List name={[field.name, 'attributes']}>{AttributesList}</Form.List>
                </Col>
              )}
            </Row>
            <Row gutter={16}>
              <Col lg={22} md={22} sm={22} offset={1}>
                <Form.List name={[field.name, 'barcodes']}>{Barcodes}</Form.List>
              </Col>
            </Row>
          </Card>
        ))}

        <Form.Item>
          <div className={styles.addfloadbutton}>
            <Tooltip title="Add SKU">
              <Button
                shape="circle"
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={add}
              />
            </Tooltip>
          </div>
        </Form.Item>
      </div>
    );
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
      content={description}
      extra={action}
      title={`id: ${match.params.id}`}
      extraContent={extra}
    >
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={onFinishFailed}>
          <Form.List name="variations">{FormVaritions}</Form.List>
        </Form>
      </Spin>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ products, loading }: { products: any; loading: { models: { [key: string]: boolean } } }) => ({
    products,
    loading: loading.models.products,
  }),
)(CreateVariationForm);
