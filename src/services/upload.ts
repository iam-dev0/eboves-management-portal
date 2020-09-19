import request from '@/utils/request';
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
    await request(`upload`, option)
      .then(({ data: response }) => {
        if (!response) {
          onError(new Error('error while uploading try again'));
        } else onSuccess(response, file);
      })
      .catch((error) => {
        onError(error);
      });
  }