import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchAttributes(params?: any) {
  return request('http://localhost:4040/attributes', {
    params,
  });
}
