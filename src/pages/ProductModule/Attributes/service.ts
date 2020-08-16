import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchAttributes(params?: any) {
  return request(`attributes`, {
    params,
  });
}

export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`attributes/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`attributes`, option);
}

export async function createAttribute(data: any) {
  const option = { method: 'POST', data };
  return request(`attributes`, option);
}

export async function updateAttribute(data: any) {
  const option = { method: 'PUT', data };
  return request(`attributes/${data.id}`, option);
}
