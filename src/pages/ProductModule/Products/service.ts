import request from '@/utils/request';
import { TableListParams } from '@/pages/ListTableList/data';

export async function postProduct(data: any) {
  const option = {
    method: 'POST',
    data,
  };
  return request(`products`, option);
}

export async function updateProduct(data: any) {
  const option = {
    method: 'PUT',
    data,
  };
  return request(`products/${data.id}`, option);
}

export async function createVariations(data: any) {
  const option = {
    method: 'POST',
    data: data.variations,
  };
  return request(`products/${data.productId}/variations`, option);
}

export async function fetchProductVariations(data: any) {
  return request(`products/${data.id}/variations`);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`products`, option);
}

export async function fetchVariation(params: any) {
  return request(`products/${params.pid}/variation/${params.vid}`);
}

export async function getProduct(id: number) {
  return request(`products/${id}`);
}

export async function fetchProductFullInfo(id: number) {
  return request(`products/${id}/full`);
}

export async function toggleProductActiveStatus(params: any) {
  const option = {
    method: 'PUT',
  };
  return request(`products/${params}/status`, option);
}
export async function toggleVariationActiveStatus(params: any) {
  const option = {
    method: 'PUT',
  };
  return request(`products/${params.pid}/variation/${params.vid}/status`, option);
}

export async function fetchProducts(params?: TableListParams) {
  return request(`products`, {
    params,
  });
}

export async function searchVairations(params?: any) {
  return request(`products/search/variations`, {
    params,
  });
}


