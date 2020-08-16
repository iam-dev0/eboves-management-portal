import request from '@/utils/request';

export async function PostStockRequest(params: any) {
  const option = { method: 'POST', data: params };
  return request(`stocks/stockOrder`, option);
}

export async function getStockOrder(params: any) {
  return request(`stocks/${params}`);
}

export async function generateStockRequestPdf(params: any) {
  return request(`stocks/generate-pdf/${params}`, { responseType: 'blob' });
}
