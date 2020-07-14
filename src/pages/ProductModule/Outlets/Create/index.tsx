/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, AutoComplete, Cascader } from 'antd';
import { connect } from 'umi';
import { update } from 'lodash';

const { Option } = Select;

const CreateOrUpdate: React.FC<any> = ({
  onClose,
  Open,
  isUpdate,
  setEditDrawer,
  loading,
  data,
  dispatch,
  outlets: { Countries },
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'outlets/fetchCountries',
    });
    dispatch({
      type: 'outlets/fetchUsers',
    });
  }, []);

  const onFinish = (values: any) => {
    if (!isUpdate) {
      dispatch({
        type: 'outlets/create',
        payload: { ...values, managerId: 1, cityId: values.cityId[1] },
        callback: () => {
          onClose();
          form.resetFields();
        },
      });
      return;
    }
    dispatch({
      type: 'outlets/update',
      payload: { ...values, managerId: 1, id: data.id, cityId: values.cityId[1] },
      callback: () => {
        onClose();
        form.resetFields();
      },
    });
  };

  const defaultSelected = () => {
    if (update && data) {
      const values = [];
      for (const { children } of Countries) {
        for (const { id, countryId } of children) {
          if (id === data.cityId) {
            values.push(countryId, data.cityId);
            break;
          }
        }
      }

      form.setFieldsValue({ ...data, cityId: values });
    }
  };

  if (update && data) {
    defaultSelected();
  }

  return (
    <Drawer
      title="Create a new account"
      width={720}
      // loading={loading}
      onClose={() => {
        onClose();
        form.resetFields();
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
              onClose();
              form.resetFields();
              setEditDrawer({ isUpdate: false, data: undefined });
            }}
            loading={loading}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button loading={loading} onClick={() => form.submit()} type="primary" htmlType="submit">
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
          <Col span={12}>
            <Form.Item
              name="cityId"
              label="City"
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Cascader options={Countries} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="managerId"
              label="Manager"
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
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter outlet address" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default connect(
  ({ outlets, loading }: { outlets: any; loading: { models: { [key: string]: boolean } } }) => ({
    outlets,
    loading: loading.models.outlets,
  }),
)(CreateOrUpdate);
