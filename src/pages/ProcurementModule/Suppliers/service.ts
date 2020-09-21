import request from '@/utils/request';

export async function getAllSuppliers(params: any) {
  return request(`suppliers`, { method: 'GET', params });
}
export async function fetchSupplier(id: number) {
  return request(`suppliers/${id}`);
}
export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`suppliers/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`suppliers`, option);
}

export async function create(data: any) {
  const option = { method: 'POST', data };
  return request(`suppliers`, option);
}

export async function update(data: any) {
  const option = { method: 'PUT', data };
  return request(`suppliers/${data.id}`, option);
}
