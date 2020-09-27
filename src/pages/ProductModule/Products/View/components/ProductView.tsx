import React from 'react';
import { Descriptions, Card, Tag, Tabs, Badge } from 'antd';
import Gallery from 'react-photo-gallery';
import { AttributeItem } from '@/pages/ProductModule/Attributes/data';
import styles from '../index.less';

const size = 'small';
const tabPosition = 'left';
const color = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
];
const ProductView: React.FC<any> = ({
  product: {
    name,
    mainImage,
    slug,
    sku,
    category,
    brand,
    supplier,
    attributes,
    active,
    images,
    description,
    additionalInformation,
  },
}: any) => {
  const photos = images
    ? images?.map((image: { id: string; image: string }) => ({
        src: image.image,
        width: 100,
        height: 100,
      }))
    : [];
  return (
    <Card bordered={false} title="Product Information">
      <div className={styles.basicInfo}>
        <Descriptions size={size}>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Slug">{slug}</Descriptions.Item>
          <Descriptions.Item label="Sku">{sku}</Descriptions.Item>
          <Descriptions.Item label="Category">{category?.name}</Descriptions.Item>
          <Descriptions.Item label="Brand">{brand?.name}</Descriptions.Item>
          <Descriptions.Item label="Supplier">{supplier?.companyName}</Descriptions.Item>
          {attributes && (
            <Descriptions.Item label="Attributes">
              <div>
                {attributes.map((attribute: AttributeItem) => (
                  <Tag color="green">{attribute.name}</Tag>
                ))}
              </div>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            {active ? (
              <Badge status="success" text="Active" />
            ) : (
              <Badge status="error" text="Inactive" />
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Tabs tabPosition={tabPosition} className={styles.productTabs}>
        <Tabs.TabPane tab="Images" key="1">
          <div className={styles.imageGallery}>
            <Gallery  photos={[{src:mainImage},...photos]} onClick={(e, { photo }) => window.open(photo.src, '_blank')} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Description" key="2">
          <div>{description}</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Additional Information" key="3">
          <div>{additionalInformation}</div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default ProductView;
