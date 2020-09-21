import request from '@/utils/request';

export async function fetchOrder(params: any) {
  return request(`orders/${params}`);
}

export async function getAll(params: any) {
  return request(`orders`, { params });
}

export async function changeStatus(params: any) {
  return request(`orders`, { data: params, method: 'PUT' });
}
