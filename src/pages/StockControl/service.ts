import request from '@/utils/request';

export async function getAllSuppliers(params: any) {
  return request('http://localhost:4040/suppliers');
}
export async function fetchSupplier(id: number) {
  return request(`http://localhost:4040/suppliers/${id}`);
}
export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`http://localhost:4040/suppliers/toggle-active/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`http://localhost:4040/suppliers`, option);
}

export async function create(data: any) {
  const option = { method: 'POST', data };
  return request(`http://localhost:4040/suppliers`, option);
}

export async function update(data: any) {
  const option = { method: 'PUT', data };
  return request(`http://localhost:4040/suppliers/${data.id}`, option);
}
