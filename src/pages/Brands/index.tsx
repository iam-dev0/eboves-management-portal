import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Row, Button, Space, Col, Input, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import style from './index.less';
import { StateType } from './modal';

interface BasicListProps {
  brands: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const { Search } = Input;
const Brands: React.FC<BasicListProps> = (props) => {
  const [selectedRowKeys, SetselectedRowKeys] = useState<[]>([]);

  const {
    loading,
    dispatch,
    // brands: { list },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'brands/fetch',
    });
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (text, record, index) => {
        return record.active ? (
          <Badge color="#87d068" text="Active" />
        ) : (
          <Badge color="red" text="Inactive" />
        );
      },
      filters: [
        { text: 'active', value: true },
        { text: 'inactive', value: false },
      ],
      onFilter: (value, record) => record.active,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  const header = () => (
    <Row>
      <Col lg={15} md={15} sm={15}>
        Our Brands
      </Col>
      <Col lg={9} md={9} sm={9}>
        <Search className={style.Search} placeholder="seach here" onSearch={() => ({})} />
        <Button type="primary" className={style.Button}>
          <PlusOutlined />
          New
        </Button>{' '}
      </Col>
    </Row>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <PageHeaderWrapper>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={[]}
        title={header}
      />
      ;
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    brands,
    loading,
  }: {
    brands: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    brands,
    loading: loading.models.brands,
  }),
)(Brands);
