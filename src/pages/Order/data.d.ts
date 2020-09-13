export interface SupplierItem {
  id: number;
  name: string;
  active: boolean;
  code?: string;
  description?: string;
  website?: string;
  createdAt: Date;
  email?: string;
  phone?: string;
  warehouseAddress?: string;
  warehouseCityId?: number;
}
