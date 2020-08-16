import request from '@/utils/request';
//  import {OutletItem } from './data';

export async function fetchBrands(params?: any) {
  return request(`brands`, {
    params,
  });
}

export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`brands/toggle-active/${id}`, option);
}

export async function toggleFeaturedStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`brands/toggle-featured/${id}`, option);
}

export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`brands`, option);
}

export async function create(data: any) {
  const option = { method: 'POST', data };
  return request(`brands`, option);
}
export async function fetch(id: number) {
  return request(`brands/${id}`);
}

export async function update(data: any) {
  const option = { method: 'PUT', data };
  return request(`brands/${data.id}`, option);
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
  await request(`brands/upload`, option)
    .then(({ data: response }) => {
      if (!response) {
        onError(new Error('error while uploading try again'));
      } else onSuccess(response, file);
    })
    .catch((error) => {
      onError(error);
    });
}
