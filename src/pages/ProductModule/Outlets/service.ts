import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchOutlets(params?: any) {
  return request(`outlets`, {
    params,
  });
}

export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`outlets/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`outlets`, option);
}

export async function createOutlet(data: any) {
  const option = { method: 'POST', data };
  return request(`outlets`, option);
}

export async function updateOutlet(data: any) {
  const option = { method: 'PUT', data };
  return request(`outlets/${data.id}`, option);
}

export async function fetchUsers() {
  return request(`countries`);
}

export async function fetchCountries() {
  return request(`countries`);
}
