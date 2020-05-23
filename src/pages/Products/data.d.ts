export interface TableListItem {
  id: number,
  name:string,
  brandId: number,
  sku: string,
  productType: string,
  active: boolean,
  createdAt: Date,
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
  name?:string,
  brandId?: number,
  sku?: string,
  productType?: string,
  pageSize?: number;
  currentPage?: number;
}
