export interface OutletItem {
    id: number;
    name:string;
    address?:string;
    default:boolean;
    active: boolean;
    createdAt: Date;
  }