import React from 'react';
import { Descriptions, Card, Radio, Tag, Row, Col, Statistic } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { LikeOutlined } from '@ant-design/icons';
import styles from './index.less';

const size = 'small';

const ViewProduct: React.FC<{}> = () => {


  const VariationView = () => {
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
        <Descriptions size={size} bordered>
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
          <Descriptions.Item label="Alt">
            empty
          </Descriptions.Item>
          <Descriptions.Item label="Other" span={3}>
            empty
          </Descriptions.Item>
          <Descriptions.Item label="Images" span={3}>
            empty
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Card bordered={false} title="Product Information">
          <Descriptions size={size}>
            <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Slug">1810000000</Descriptions.Item>
            <Descriptions.Item label="Sku">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Category">empty</Descriptions.Item>
            <Descriptions.Item label="Brand">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Supplier">empty</Descriptions.Item>
            <Descriptions.Item label="Attributes">
              <div>
                <Tag color="#f50">size</Tag>
                <Tag color="#2db7f5">feature</Tag>
                <Tag color="#87d068">shade</Tag>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Status">empty</Descriptions.Item>
          </Descriptions>
          <Descriptions bordered size={size}>
            <Descriptions.Item label="Description" span={3}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              <div>
                Fusce velit augue, facilisis sed scelerisque sit amet, vestibulum in velit. Integer
                vestibulum purus ac felis tincidunt accumsan id eu lorem. Quisque consectetur
                sollicitudin nulla, ut luctus dui. Vestibulum porta lorem volutpat felis sodales, ac
                pellentesque massa
              </div>{' '}
              semper. Morbi egestas dolor porttitor diam placerat, nec aliquam mauris sodales.
              Aenean vitae maximus augue, a eleifend magna. Donec nibh diam, placerat non metus
              volutpat, porttitor dignissim velit. Mauris pretium arcu at nisi tincidunt aliquet. In
              sagittis quis odio eget scelerisque. Morbi id varius diam. Fusce posuere ligula eu
              consectetur gravida. Suspendisse neque mi, porta eget vestibulum at, interdum <br />
              vitae magna. In venenatis feugiat elit ut porttitor. Suspendisse non ex sed justo
              vehicula scelerisque. In commodo tortor non augue dignissim, in feugiat justo
              fringilla. Aenean ullamcorper nisl diam. Morbi egestas neque nec dui <br />
              luctus hendrerit. Proin quis sem nec est eleifend convallis in et neque. Vivamus sed
              augue lobortis ipsum ornare pretium. Vestibulum suscipit eleifend enim. Nam sed leo
              justo. Morbi in mauris velit. Donec sem nulla, mattis quis eros non, vulputate
              bibendum enim. Etiam dignissim, augue at efficitur interdum, odio velit molestie dui,
              non varius mauris ipsum ac leo. Mauris facilisis, sem eget hendrerit aliquam, erat
              orci laoreet nunc, vitae scelerisque augue orci nec arcu. Nunc luctus, nibh eget
              fringilla scelerisque, ante mauris consectetur arcu, a euismod ante dui quis leo.
              Vivamus sed semper est. Vivamus vestibulum libero urna, et sodales elit lobortis
              condimentum. Praesent elit felis, auctor et orci a, consequat convallis nibh. In
              tincidunt quam a congue facilisis. Aliquam erat volutpat. Morbi in hendrerit diam,
              vitae finibus lacus. Aliquam efficitur commodo nisl. Nunc cursus blandit auctor. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              Aliquam nisi libero, feugiat non vestibulum non, ornare sed est. Curabitur pulvinar in
              lectus at sollicitudin. Mauris vitae metus quis neque auctor pulvinar at eu arcu. Duis
              eu feugiat nisi. Sed porttitor nibh odio, non sagittis dolor ultricies et. Sed quis
              bibendum dolor. Integer porta ex in nisi efficitur, sed mollis enim malesuada. Donec
              faucibus dolor velit, non faucibus sapien auctor nec. Donec enim dolor, ullamcorper
              egestas gravida quis, tincidunt rutrum enim. Phasellus eu dui ac tortor interdum
              posuere sed et dui. Cras non sollicitudin nulla. Proin maximus, arcu vitae euismod
              lobortis, turpis tortor iaculis massa, quis eleifend mauris est sodales tortor.
              Quisque elementum tortor id neque dignissim auctor. Donec condimentum elit ac lectus
              auctor iaculis. Praesent volutpat interdum arcu, quis lobortis nulla blandit et.
              Aenean sollicitudin diam dolor, a vehicula est tincidunt et. Aliquam ut dolor eu ante
              porttitor tincidunt quis et nibh. Phasellus facilisis congue pharetra. Proin a nisi
              justo.
            </Descriptions.Item>
            <Descriptions.Item label="Images" span={3}>
              empty
            </Descriptions.Item>
          </Descriptions>
        </Card>
        {VariationView()}
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default ViewProduct;
