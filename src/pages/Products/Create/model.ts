import { Effect, Reducer } from 'umi';
import {
  postProduct,
  getAllBrands,
  getAllSuppliers,
  getAllcategories,
  getAllAttributes,
  getProduct,
  getSubCategories,
} from './service';

export interface StateType {}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    create: Effect;
    fetchBrands: Effect;
    fetchSuppliers: Effect;
    fetchAttributes: Effect;
    fetchCategories: Effect;
    fetchSubcategores: Effect;
    fetchProduct:Effect;
  };
  reducers?: {
    brandList: Reducer<StateType>;
    categoriesList: Reducer<StateType>;
    attributeList: Reducer<StateType>;
    suppliers: Reducer<StateType>;
    productInfo: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'productCreate',
  state: {
    product:{},
    brands: [],
    suppliers: [],
    attributes: [],
    categories: [],
  },
  effects: {
    *create({ payload ,callback}, { call }) {
      const response = yield call(postProduct, payload);
      if(callback)callback(response.data);
    },
    *fetchProduct({payload}, { call, put }) {
      const response = yield call(getProduct,payload);
      yield put({
        type: 'productInfo',
        payload: typeof response === "object" ? response : {},
      });
    },
    *fetchBrands(_, { call, put }) {
      const response = yield call(getAllBrands);
      yield put({
        type: 'brandList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchSuppliers(_, { call, put }) {
      const response = yield call(getAllSuppliers);
      yield put({
        type: 'suppliers',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchAttributes(_, { call, put }) {
      const response = yield call(getAllAttributes);
      yield put({
        type: 'attributeList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchCategories(_, { call, put }) {
      const response = yield call(getAllcategories);
      yield put({
        type: 'categoriesList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchSubcategores({ payload,callback }, { call }) {
      const response = yield call(getSubCategories, payload);
      if(callback)callback(response);
    }
  },

  reducers: {
    brandList(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    productInfo(state, action) {
      return {
        ...state,
        product: action.payload,
      };
    },
    categoriesList(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },
    attributeList(state, action) {
      return {
        ...state,
        attributes: action.payload,
      };
    },
    suppliers(state, action) {
      return {
        ...state,
        suppliers: action.payload,
      };
    },
  },
};

export default BrandsModal;
