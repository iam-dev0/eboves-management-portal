import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class DynamicFields extends Component {
  id = 1;

  add = () => {
    const { getFieldValue, setFieldsValue, name } = this.props;
    const keys = getFieldValue(`${name}List`);
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(this.id++);

    setFieldsValue({
      [`${name}List`]: nextKeys,
    });
  };

  remove = (k) => () => {
    const { getFieldValue, setFieldsValue, name } = this.props;
    const keys = getFieldValue(`${name}List`);

    if (keys.length === 1) return;
    setFieldsValue({
      [`${name}List`]: keys.filter((key) => key !== k),
    });
  };

  defaultValidation = (name) => ({
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        whitespace: true,
        message: `Please input ${name}.`,
      },
    ],
  });

  addSingleField = () => {
    const { getFieldDecorator, getFieldValue, fields: obj, name } = this.props;
    getFieldDecorator(`${name}List`, { initialValue: [0] });
    const fieldCounter = getFieldValue(`${name}List`);
    return fieldCounter.map((k) => (
      <Form.Item key={k}>
        {getFieldDecorator(
          `${name}[${k}]`,
          obj.validation || this.defaultValidation(name),
        )(obj.field())}
        {fieldCounter.length > 1 ? (
          <MinusCircleOutlined className="dynamic-delete-button" onClick={this.remove(k)} />
        ) : null}
      </Form.Item>
    ));
  };

  addMultipleFields = () => {
    const { getFieldDecorator, getFieldValue, fields, name } = this.props;
    getFieldDecorator(`${name}List`, { initialValue: [0] });
    const fieldCounter = getFieldValue(`${name}List`);

    return fieldCounter.reduce((preResult, k) => {
      const row = fields.map((obj, i) => (
        <Form.Item key={`${k}${obj.name}`}>
          {getFieldDecorator(
            `${name}[${k}][${obj.name}]`,
            obj.validation || this.defaultValidation(name),
          )(obj.field())}
          {fieldCounter.length > 1 && fields.length - 1 === i ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={this.remove(k)}
            />
          ) : null}
        </Form.Item>
      ));

      return [...preResult, ...row];
    }, []);
  };

  render() {
    const { fields, name } = this.props;
    return (
      <>
        {Array.isArray(fields) ? this.addMultipleFields() : this.addSingleField()}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <PlusOutlined /> Add &nbsp; {name}
          </Button>
        </Form.Item>
      </>
    );
  }
}

export default DynamicFields;
