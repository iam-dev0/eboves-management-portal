import request from '@/utils/request';


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

export async function getAllAttributes() {
  return request('http://localhost:4040/attributes');
}

export async function postProduct(data:any){
  const option={
    method:'POST',
    data
  }
  return request('http://localhost:4040/products',option);
}


export async function getProduct(id:number){
  return request(`http://localhost:4040/products/${id}`);
}

