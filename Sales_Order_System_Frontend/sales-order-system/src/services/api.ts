import axios from 'axios';
import { toSLDateString } from '../utils/format';

// === ALL TYPES (NO types/ FOLDER) ===
export interface Customer {
  id: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  suburb: string;
  state: string;
  postCode: string;
}

export interface Item {
  id: number;
  code: string;
  description: string;
  price: number;
}

export interface OrderItem {
  itemCode: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  taxRate: number;
  exclAmount: number;
  taxAmount: number;
  inclAmount: number;
}

export interface SalesOrder {
  id?: number;
  invoiceNo: string;
  invoiceDate: string;
  referenceNo: string;
  customerId: number;
  customerName : string;
  address1: string;
  address2: string;
  address3: string;
  suburb: string;
  state: string;
  postCode: string;
  note: string;
  items: OrderItem[];
  totalExcl: number;
  totalTax: number;
  totalIncl: number;
}
// === END OF TYPES ===

const api = axios.create({ 
  baseURL: 'https://localhost:7231/api' 
});

export const customerApi = {
  getAll: () => api.get<Customer[]>('/customer'),
  searchByName: (name: string) => 
    api.get<Customer[]>(`/customer/search?name=${encodeURIComponent(name)}`),
};

export const itemApi = {
  getAll: () => api.get<Item[]>('/item'),
};

export const orderApi = {
  list: () => api.get<SalesOrder[]>('/salesorders'),
  get: (id: number) => api.get<SalesOrder>(`/salesorders/${id}`),
  create: (data: SalesOrder) => {
    const safeDate = toSLDateString(data.invoiceDate);
    return api.post<SalesOrder>('/salesorders', {
      ...data,
      invoiceDate: safeDate || new Date().toISOString().split('T')[0]
    });
  },
update: (data: SalesOrder) => {
    const safeDate = toSLDateString(data.invoiceDate);
    return api.put<SalesOrder>(`/salesorders/${data.id}`, {
      ...data,
      invoiceDate: safeDate || data.invoiceDate
    });
  },
};