import React, { useEffect } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Spin } from 'antd';
import ProductView from './components/ProductView';
import VariationView from './components/VariationView';

const ViewProduct: React.FC<any> = ({ dispatch, loading, match, products: { product } }) => {
  const { id, vid } = match.params;
  useEffect(() => {
    dispatch({ type: 'products/fetchProductFullInfo', payload: id });
    return () => {
      dispatch({ type: 'products/reset' });
    };
  }, []);

  if (vid) {
    const node = document.getElementById(vid);

    if (node) {
      scrollIntoView(node, {
        behavior: 'smooth',
        block: 'center',
        scrollMode: 'if-needed',
      });
    }
  }
  return (
    <PageHeaderWrapper>
      <GridContent>
        <Spin spinning={loading}>
          <ProductView product={product} />
          {product?.variations?.map((variation: any) => (
            <VariationView variation={variation} />
          ))}
        </Spin>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ products, loading }: { products: any; loading: { models: { [key: string]: boolean } } }) => ({
    products,
    loading: loading.models.products,
  }),
)(ViewProduct);
