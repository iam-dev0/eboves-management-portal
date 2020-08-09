import {BrandItem} from '../Brands/data';

export interface ProductItem {
  id: number;
  name:string;
  slug?:string;
  brandId?: number;
  brand?:BrandItem;
  supplierId?:number;
  attributes?:any;
  sku?: string;
  images?:any[];
  stockAvailableAt?:string;
  mainImage?:string;
  productCode?:string;
  productType?: string;
  active: boolean;
  description?:string;
  descriptionImage?:string;
  additionalInformation?:string;
  commentsCount?:number;
  variations?:any[];
  rating?:number;
  metaTitle?:string;
  metaKeywords?:string;
  metaDescription?:string;
  createdAt?: Date;
  
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?:string;
  brandId?: number;
  sku?: string;
  productType?: string;
  pageSize?: number;
  currentPage?: number;
}
