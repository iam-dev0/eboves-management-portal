import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchOutlets(params?: any) {
  return request('http://localhost:4040/outlets', {
    params,
  });
}


export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`http://localhost:4040/outlets/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`http://localhost:4040/outlets`, option);
}

export async function createOutlet(data: any) {
  const option = { method: 'POST', data };
  return request(`http://localhost:4040/outlets`, option);
}



export async function updateOutlet(data: any) {
  const option = { method: 'PUT', data };
  return request(`http://localhost:4040/outlets/${data.id}`, option);
}


export async function fetchUsers() {

  return request(`http://localhost:4040/countries`);
}

export async function fetchCountries() {
  return request(`http://localhost:4040/countries`, );
}