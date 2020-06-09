import React, { forwardRef } from 'react';
import { Form, Button, Card, Input, Row, Col, Divider, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';

const FormItem = Form.Item;

const CreateVariationForm: React.FC<any> = forwardRef<any, any>(
  ({ showRemove, attributes, createNewVariation, RemoveVariation, sn }, ref) => {

    const cardHeaderButtons = () => {
      return (
        <>
          {showRemove && <Button onClick={() => RemoveVariation(sn)}> Remove </Button>}{' '}
          <Button onClick={createNewVariation} type="primary">
            <PlusOutlined /> Add
          </Button>
        </>
      );
    };

    const attributeField = (attribute:any) => {
      console.log(attribute)
      return (
        <>
          <Divider orientation="left" plain>
           {attribute.label[0]}
          </Divider>
          <Col lg={18} md={18} sm={18}>
            <Form.Item
              label="Value"
              name={[attribute.key, 'attributeValue']}
              fieldKey={[attribute.key, 'price']}
              rules={[{ required: true, message: 'Missing Price' }]}
            >
              <Input placeholder="Price" />
            </Form.Item>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <Form.Item
              label="Alt"
              name={[attribute.key, 'Alter']}
              fieldKey={[attribute.key, 'attribute']}
              rules={[{ required: true, message: 'Missing' }]}
            >
              <Input placeholder="enter alter value" />
            </Form.Item>
          </Col>
        </>
      );
    };
    return (
      <Card
        title={`${sn}) Variation Information`}
        className={styles.card}
        bordered={false}
        extra={cardHeaderButtons()}
      >
        <Form layout="vertical" ref={ref}>
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
            {attributes && attributes.length > 1 && (
              <Col lg={24} md={24} sm={24}>
                <Divider orientation="left">Attributes</Divider>
                <Form.List name="attributes">
                  {() => {
                    return (
                      <div>
                        <Row gutter={12}>
                          {attributes.map((attribute) => (
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
              <Form.List name="barcodes" style={{}}>
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
  },
);

export default CreateVariationForm;
