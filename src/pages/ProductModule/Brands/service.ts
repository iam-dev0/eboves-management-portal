import request from '@/utils/request';

export async function getAllBrands() {
  return request('http://localhost:4040/brands');
}