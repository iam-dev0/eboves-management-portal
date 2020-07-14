import request from '@/utils/request';
import { addLevelToHierarchy } from '@/utils/utils';

export async function fetchAllCategories(params?: any) {
  return request('http://localhost:4040/categories/nested', {
    params,
  }).then(({ data }) => {
    return { data: addLevelToHierarchy(data) };
  });
}

export async function fetchCategory(id: any) {
  return request(`http://localhost:4040/categories/${id}`);
}

export async function toggleActiveStatus(id: number) {
  const option = { method: 'PUT' };
  return request(`http://localhost:4040/categories/toggle-active/${id}`, option);
}
export async function bulkDelete(ids: number[]) {
  const option = { method: 'DELETE', params: ids };
  return request(`http://localhost:4040/categories`, option);
}
export async function create(data: any) {
  const option = { method: 'POST', data };
  return request(`http://localhost:4040/categories`, option);
}

export async function update(data: any) {
  const option = { method: 'PUT', data };
  return request(`http://localhost:4040/categories/${data.id}`, option);
}

export async function upload({ data, file, filename, onError, onSuccess }: any) {
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
