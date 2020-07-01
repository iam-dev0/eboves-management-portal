import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Input, Row, Col, Divider, Descriptions, Spin, Tooltip } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { getARandomNumber, capitalizeFirstLetter } from '@/utils/utils';
import { PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { FormInstance } from 'antd/lib/form';
import styles from './style.less';

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
  const [variationForms, setVariationForms] = useState<any[]>([
    { id: getARandomNumber(), form: React.createRef<FormInstance>() },
  ]);

  const {
    loading,
    dispatch,
    match,
    productCreate: { product },
  } = props;

  useEffect(() => {
    dispatch({ type: 'productCreate/fetchProduct', payload: match.params.id });
  }, []);

  const addVarition = () => {
    setVariationForms((state) => [
      ...state,
      { id: getARandomNumber(), form: React.createRef<FormInstance>() },
    ]);
  };

  const RemoveVariation = (id: number) => {
    setVariationForms((state) => state.filter((elmt) => id !== elmt.id));
  };

  const cardHeaderButtons = (index: number) => {
    return (
      <>
        {variationForms.length > 1 && (
          <span onClick={() => RemoveVariation(index)} className={styles.removeButton}>
            x
          </span>
        )}
      </>
    );
  };

  const onSubmit = () => {
    variationForms.map(async ({form:{current}}) => {
      current.validateFields().then((values:any) => {
        // Do something with 
        console.log(values);
      });
    });
  };
  const attributeField = (attribute: any) => {
    return (
      <>
        <Col lg={18} md={18} sm={18}>
          <Form.Item
            label={capitalizeFirstLetter(attribute.name)}
            name={[attribute.name, 'value']}
            // fieldKey={[attribute.id, 'price']}
            rules={[{ required: true, message: 'Missing Price' }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
        </Col>
        <Col lg={6} md={6} sm={6}>
          <Form.Item
            label="Alt"
            name={[attribute.name, 'alt']}
            // fieldKey={[attribute.id, 'attribute']}
            rules={[{ required: true, message: 'Missing' }]}
          >
            <Input placeholder="enter alter value" />
          </Form.Item>
        </Col>
      </>
    );
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
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="Name">{product?.name}</Descriptions.Item>
          <Descriptions.Item label="Brand">{product?.name}</Descriptions.Item>
          <Descriptions.Item label="Product Typoe">{product?.name}</Descriptions.Item>
          <Descriptions.Item label="Created At">{product?.createdAt}</Descriptions.Item>
          {/* <Descriptions.Item label="date">2017-07-07 ~ 2017-08-08</Descriptions.Item>
            <Descriptions.Item label="des">somethig</Descriptions.Item> */}
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  const variationForm = (elemnt: any, index: number) => (
    <Card
      title={`${index + 1}) Variation Information`}
      className={styles.card}
      bordered={false}
      key={elemnt.id}
      extra={cardHeaderButtons(elemnt.id)}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col lg={12} md={12} sm={12}>
            <FormItem name="sku" label="SKU">
              <Input placeholder="Enter." />
            </FormItem>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <FormItem name="slug" label="Slug">
              <Input placeholder="Enter." />
            </FormItem>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <FormItem name="price" label="Retail Price">
              <Input placeholder="Enter." />
            </FormItem>
          </Col>
          {product?.attributes && product?.attributes?.length > 1 && (
            <Col lg={24} md={24} sm={24}>
              <Divider orientation="left">Attributes</Divider>
              <Form.List name="attributes">
                {() => {
                  return (
                    <div>
                      <Row gutter={12}>
                        {product?.attributes.map((attribute: any) => (
                          <>{attributeField(attribute)}</>
                        ))}
                      </Row>
                    </div>
                  );
                }}
              </Form.List>
            </Col>
          )}
          <Col lg={24} md={24} sm={24}>
            <Divider orientation="left">Barcodes</Divider>
            <Form.List name="barcodes">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={12}>
                        <Col lg={11} md={10} sm={10}>
                          <Form.Item
                            {...field}
                            label="Barcode"
                            name={[field.name, 'barcode']}
                            fieldKey={[field.fieldKey, 'barcode']}
                            rules={[{ required: true, message: 'Missing barcode' }]}
                          >
                            <Input placeholder="barcode" />
                          </Form.Item>
                        </Col>
                        <Col lg={11} md={10} sm={10}>
                          <Form.Item
                            {...field}
                            label="Supplier Price"
                            name={[field.name, 'Supplier Price']}
                            fieldKey={[field.fieldKey, 'price']}
                            rules={[{ required: true, message: 'Missing Price' }]}
                          >
                            <Input placeholder="Price" />
                          </Form.Item>
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                          <MinusCircleOutlined
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
              }}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  const extra = (
    <div style={{ marginTop: '35px' }}>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper
      content={description}
      extra={action}
      title={`id: ${match.params.id}`}
      extraContent={extra}
    >
      <Spin spinning={loading}>
        <div className={styles.addfloadbutton}>
          <Tooltip title="add new variation">
            <Button
              shape="circle"
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={addVarition}
            />
          </Tooltip>
        </div>

        {variationForms.map((elemnt, index) => variationForm(elemnt, index))}
      </Spin>
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
)(CreateVariationForm);
