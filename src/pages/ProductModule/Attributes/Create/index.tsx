import React, { useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, AutoComplete } from 'antd';
import { connect } from 'umi';
import { update } from 'lodash';

const { Option } = Select;

const options = [
  { id: 0, value: 'ml' },
  { id: 0, value: 'mm' },
];
const CreateOrUpdate: React.FC<any> = ({
  onClose,
  Open,
  isUpdate,
  setEditDrawer,
  loading,
  data,
  dispatch,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (!isUpdate)
      dispatch({
        type: 'attributes/create',
        payload: values,
        callback: () => {
          form.resetFields();
          onClose();
        },
      });

    dispatch({
      type: 'attributes/update',
      payload: { ...values, id: data.id },
      callback: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  if (update && data) form.setFieldsValue(data);
  return (
    <Drawer
      title="Create a new account"
      width={720}
      // loading={loading}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      visible={Open}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => {
              form.resetFields();
              setEditDrawer({ isUpdate: false, data: undefined });
              onClose();
            }}
            loading={loading}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button loading={loading} onClick={()=>form.submit()} type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={22}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={22}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Select placeholder="Please choose the type">
                <Option value="text">Text</Option>
                <Option value="image">Image</Option>
                <Option value="numeric">Numeric</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={22}>
            <Form.Item
              name="unit"
              label="Unit"
              // rules={[{ required: true, message: 'Please choose the approver' }]}
            >
              <AutoComplete options={options} placeholder="control mode" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default connect(
  ({
    attributes,
    loading,
  }: {
    attributes: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    attributes,
    loading: loading.models.attributes,
  }),
)(CreateOrUpdate);
