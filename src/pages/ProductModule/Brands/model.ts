import { Effect, Reducer } from 'umi';
import {
  toggleActiveStatus,
  togglePopularStatus,
  bulkDelete,
  create,
  update,
  fetch,
  fetchBrands,
} from './service';
import { BrandItem } from './data';

export interface StateType {
  brand?: BrandItem | undefined;
  brands?: BrandItem[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchBrands: Effect;
    toggleActiveStatus: Effect;
    togglePopularStatus: Effect;
    bulkDelete: Effect;
    create: Effect;
    update: Effect;
  };
  reducers: {
    putBrand: Reducer<StateType>;
    putBrands: Reducer<StateType>;
    resetStates: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'brands',

  state: {
    brand: undefined,
    brands: [],
  },

  effects: {
    *toggleActiveStatus({ payload }, { call }) {
      yield call(toggleActiveStatus, payload);
    },
    *fetchBrands({ payload }, { call, put }) {
      const res = yield call(fetchBrands, payload);
      yield put({
        type: 'putBrands',
        payload: Array.isArray(res?.data) ? res.data : [],
      });
    },
    *togglePopularStatus({ payload }, { call }) {
      yield call(togglePopularStatus, payload);
    },
    *bulkDelete({ payload, callback }, { call }) {
      yield call(bulkDelete, payload);
      if (callback) callback();
    },
    *create({ payload, callback }, { call }) {
      const res = yield call(create, payload);
      if (callback && res?.data?.id) callback();
    },
    *fetch({ payload }, { call, put }) {
      const res = yield call(fetch, payload);
      yield put({
        type: 'putBrand',
        payload: res?.data ? res.data : undefined,
      });
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(update, payload);
      if (callback && res?.data) callback();
    },
  },
  reducers: {
    putBrand(state, action) {
      return {
        ...state,
        brand: action.payload,
      };
    },
    putBrands(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
    resetStates() {
      return {
        brand: undefined,
        brands: [],
      };
    },
  },
};

export default BrandsModal;
