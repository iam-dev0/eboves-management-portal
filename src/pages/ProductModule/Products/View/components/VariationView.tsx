import React from 'react';
import { Descriptions, Card, Row, Col, Statistic, Badge } from 'antd';

import { LikeOutlined } from '@ant-design/icons';
import styles from '../index.less';

const size = 'small';

const VariationView: React.FC<{}> = ({ variation }: any) => {
  return (
    <Card bordered={false} title={variation?.name}>
      <Descriptions size={size}>
        <Descriptions.Item label="Slug">{variation?.slug}</Descriptions.Item>
        <Descriptions.Item label="Sku">{variation?.sku}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {variation?.active ? (
            <Badge status="success" text="Active" />
          ) : (
            <Badge status="error" text="Inactive" />
          )}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size={size}>
        <Descriptions.Item label="Status" span={3}>
          {variation?.active}
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.stockview}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="In Hand" value={1128} prefix={<LikeOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Booked" value={93} />
          </Col>
          <Col span={6}>
            <Statistic title="Return" value={1128} prefix={<LikeOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Delivered" value={93} />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default VariationView;
