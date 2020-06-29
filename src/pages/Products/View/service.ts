import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function fetchProducts(params?: TableListParams) {
  return request('http://localhost:4040/products', {
    params,
  });
}
export async function getAllBrands() {
  return request('http://localhost:4040/brands');
}

export async function getAllSuppliers() {
  return request('http://localhost:4040/suppliers');
}

export async function getAllcategories() {
  return request('http://localhost:4040/categories');
}

export async function getSubCategories(id:number) {
  return request(`http://localhost:4040/categories/childs/${id}`);
}


export async function updateProductStatus(id:number, status:boolean) {
  return request(`http://localhost:4040/products/${id}/status?active=${status}`, {
    method: 'PUT'
  });
}
