import { Tag, Descriptions, Badge } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';

const SupplierView: React.FC<any> = (props) => {
  const {
    id,
    dispatch,
    suppliers: {
      supplier: { companyName, active, code, email, website, description },
    },
  } = props;

  useEffect(() => {
    if (id)
      dispatch({
        type: 'suppliers/fetchSupplier',
        payload: id,
      });

    return () => {
      dispatch({
        type: 'brands/resetStates',
      });
    };
  }, []);
  
  return (
    <Descriptions title="Supplier Information" bordered size="small">
      <Descriptions.Item label="Compnay Name">{companyName}</Descriptions.Item>
      <Descriptions.Item label="Supplier Code">{code}</Descriptions.Item>
      <Descriptions.Item label="Status">
        {active ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="error" text="Inactive" />
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Person Name">Awais</Descriptions.Item>
      <Descriptions.Item label="Person Email">{email}</Descriptions.Item>
      <Descriptions.Item label="Website" span={3}>
        {website}
      </Descriptions.Item>
      <Descriptions.Item label="Brands" span={3}>
        <Tag color="green">brand1</Tag>
        <Tag color="green">brand1</Tag>
        <Tag color="green">brand1</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Description">{description}</Descriptions.Item>
    </Descriptions>
  );
};

export default connect(
  ({
    suppliers,
    loading,
  }: {
    suppliers: any;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    suppliers,
    loading: loading.models.suppliers,
  }),
)(SupplierView);
