import request from '@/utils/request';
import { TableListParams } from '@/pages/ListTableList/data';

export async function postProduct(data: any) {
  const option = {
    method: 'POST',
    data,
  };
  return request('http://localhost:4040/products', option);
}

export async function updateProduct(data: any) {
  const option = {
    method: 'PUT',
    data,
  };
  return request(`http://localhost:4040/products/${data.id}`, option);
}

export async function createVariations(data: any) {
  const option = {
    method: 'POST',
    data: data.variations,
  };
  return request(`http://localhost:4040/products/${data.productId}/variations`, option);
}

export async function fetchProductVariations(data: any) {
  return request(`http://localhost:4040/products/${data.id}/variations`);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`http://localhost:4040/products`, option);
}

export async function fetchVariation(params: any) {
  return request(`http://localhost:4040/products/${params.pid}/variation/${params.vid}`);
}

export async function getProduct(id: number) {
  return request(`http://localhost:4040/products/${id}`);
}

export async function fetchProductFullInfo(id: number) {
  return request(`http://localhost:4040/products/${id}/full`);
}

export async function toggleProductActiveStatus(params: any) {
  const option = {
    method: 'PUT',
  };
  return request(`http://localhost:4040/products/${params}/status`, option);
}
export async function toggleVariationActiveStatus(params: any) {
  const option = {
    method: 'PUT',
  };
  return request(
    `http://localhost:4040/products/${params.pid}/variation/${params.vid}/status`,
    option,
  );
}

export async function fetchProducts(params?: TableListParams) {
  return request('http://localhost:4040/products', {
    params,
  });
}

export async function upload({ data, file, filename, onError, onSuccess }: any) {
  // EXAMPLE: post form-data with 'axios'
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append(filename, file);

  const option = {
    method: 'POST',
    data: formData,
  };
  await request(`http://localhost:4040/brands/upload`, option)
    .then(({ data: response }) => {
      if (!response) {
        onError(new Error('error while uploading try again'));
      } else onSuccess(response, file);
    })
    .catch((error) => {
      onError(error);
    });
}
