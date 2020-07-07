import React from 'react';
import { Descriptions, Card,Row, Col, Statistic } from 'antd';

import { LikeOutlined } from '@ant-design/icons';
import styles from '../index.less';

const size = 'small';

const VariationView: React.FC<{}> = () => {
  return (
    <Card bordered={false} title="1) Variation">
      <Descriptions size={size}>
        <Descriptions.Item label="Slug">1810000000</Descriptions.Item>
        <Descriptions.Item label="Sku">Hangzhou, Zhejiang</Descriptions.Item>
        {/* <Descriptions.Item label="Price">Hangzhou, Zhejiang</Descriptions.Item> */}
        <Descriptions.Item label="Status">empty</Descriptions.Item>
      </Descriptions>
      <Descriptions size={size}>
        <Descriptions.Item label="Status" span={3}>
          empty
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.stockview}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="In Hand" value={1128} prefix={<LikeOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Unmerged" value={93} />
          </Col>
          <Col span={6}>
            <Statistic title="In Hand" value={1128} prefix={<LikeOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Unmerged" value={93} />
          </Col>
        </Row>
      </div>
      {/* <Descriptions size={size} bordered>
        <Descriptions.Item label="Bracode">bracode</Descriptions.Item>
        <Descriptions.Item label="Price" span={2}>
          price
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size={size}>
        <Descriptions.Item label="Description" span={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        </Descriptions.Item>
        <Descriptions.Item label="Size" span={3}>
          empty
        </Descriptions.Item>
        <Descriptions.Item label="Shade" span={2}>
          empty
        </Descriptions.Item>
        <Descriptions.Item label="Alt">empty</Descriptions.Item>
        <Descriptions.Item label="Other" span={3}>
          empty
        </Descriptions.Item>
        <Descriptions.Item label="Images" span={3}>
          empty
        </Descriptions.Item>
      </Descriptions> */}
    </Card>
  );
};

export default VariationView;
