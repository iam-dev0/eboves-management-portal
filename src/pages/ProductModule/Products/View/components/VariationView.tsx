import React from 'react';
import { Descriptions, Card, Row, Col, Statistic, Badge, Tabs } from 'antd';

import { LikeOutlined } from '@ant-design/icons';
import styles from '../index.less';
import Gallery from 'react-photo-gallery';

const size = 'small';
const tabPosition = 'left';

const VariationView: React.FC<any> = ({
  variation: {
    id,
    name,
    price,
    slug,
    sku,
    active,
    shortDescription,
    attributeValues,
    barcodes,
    images,
  },
}: any) => {
  const photos = images
    ? images?.map((image: { id: string; image: string }) => ({
        src: image.image,
        width: Math.floor(Math.random() * 4) + 1,
        height: Math.floor(Math.random() * 4) + 1,
      }))
    : [];
  return (
    <Card bordered={false} title={`${id}) ${name}`} id={id}>
      <div className={styles.basicInfo}>
        <Descriptions size={size}>
          <Descriptions.Item label="Slug">{slug}</Descriptions.Item>
          <Descriptions.Item label="Sku">{sku}</Descriptions.Item>
          <Descriptions.Item label="Price">{price}</Descriptions.Item>
          <Descriptions.Item label="Status">
            {active ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            )}
          </Descriptions.Item>
        </Descriptions>

        <div className={styles.stockview}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="Inhand Inventory" value={1128} prefix={<LikeOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="Booked Inventory" value={93} />
            </Col>
            <Col span={6}>
              <Statistic title="Dispatched Inventory" value={1128} prefix={<LikeOutlined />} />
            </Col>
            <Col span={6}>
              <Statistic title="Delivered Inventory" value={93} />
            </Col>
          </Row>
        </div>
      </div>
      <Tabs tabPosition={tabPosition} className={styles.productTabs}>
        <Tabs.TabPane tab="More Information" key="1">
          {barcodes?.map(
            ({ supplierPrice, barcode }: { supplierPrice: number; barcode: string }) => (
              <Descriptions size={size} bordered>
                <Descriptions.Item label="Bracode">{barcode}</Descriptions.Item>
                <Descriptions.Item label="Supplier Price" span={2}>
                  {supplierPrice}
                </Descriptions.Item>
              </Descriptions>
            ),
          )}

          <Descriptions bordered size={size}>
            <Descriptions.Item label="Description" span={3}>
              {shortDescription}
            </Descriptions.Item>

            {attributeValues?.map((AV: any) =>
              AV.type !== 'image' ? (
                <Descriptions.Item label={AV.name} span={3}>
                  {AV.ProductVariationAttributeValues.value} {AV.unit}
                </Descriptions.Item>
              ) : (
                <>
                  <Descriptions.Item label={AV.name} span={2}>
                    {AV.ProductVariationAttributeValues.value}
                  </Descriptions.Item>
                  <Descriptions.Item label="Alt">{AV.alt}</Descriptions.Item>
                </>
              ),
            )}
          </Descriptions>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Images" key="2">
          <div className={styles.imageGallery}>
            <Gallery photos={photos} onClick={(e, { photo }) => window.open(photo.src, '_blank')} />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default VariationView;
