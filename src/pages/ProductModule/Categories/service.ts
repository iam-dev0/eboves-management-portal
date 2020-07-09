import request from '@/utils/request';
// import { TableListParams } from './data';

export async function fetchAllCategories(params?: any) {
  return request('http://localhost:4040/categories/nested', {
    params,
  });
}
