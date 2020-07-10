import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchAttributes(params?: any) {
  return request('http://localhost:4040/attributes', {
    params,
  });
}

export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`http://localhost:4040/attributes/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`http://localhost:4040/attributes`, option);
}

export async function createAttribute(data: any) {
  const option = { method: 'POST', data };
  return request(`http://localhost:4040/attributes`, option);
}



export async function updateAttribute(data: any) {
  const option = { method: 'PUT', data };
  return request(`http://localhost:4040/attributes/${data.id}`, option);
}
