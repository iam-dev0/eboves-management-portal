import request from '@/utils/request';
import { TableListParams } from './data';

export async function fetchProducts(params?: TableListParams) {
  return request('http://localhost:4040/products', {
    params,
  });
}
