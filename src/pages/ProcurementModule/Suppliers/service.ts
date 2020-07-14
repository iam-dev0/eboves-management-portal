import request from "@/utils/request";

export async function getAllSuppliers() {
    return request('http://localhost:4040/suppliers');
  }
  