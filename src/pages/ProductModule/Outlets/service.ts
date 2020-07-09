import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchOutlets(params?: any) {
  return request('http://localhost:4040/outlets', {
    params,
  });
}
