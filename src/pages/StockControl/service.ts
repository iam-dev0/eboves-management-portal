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

export async function getAllStockRequests(params: any) {
  return request(`stocks`, { params });
}

export async function cancelOrder(params: any) {
  return request(`stocks/cancel-order/${params}`, { method: 'PUT' });
}
export async function sendOrder(params: any) {
  return request(`stocks/send-order/${params}`, { method: 'PUT' });
}
export async function stockReceived(params: any) {
  const option = { method: 'POST', data: params };
  return request(`stocks/receive-order`, option);
}
