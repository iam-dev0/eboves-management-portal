import { Effect, Reducer } from 'umi';
import { getAllSuppliers,fetchSupplier, toggleActiveStatus, bulkDelete, create, update } from './service';

export interface StateType {}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    fetchSuppliers: Effect;
    create: Effect;
    fetchSupplier: Effect;
    toggleActiveStatus: Effect;
    bulkDelete: Effect;
    update: Effect;
  };
  reducers?: {
    suppliers: Reducer<StateType>;
    putSupplier: Reducer<StateType>;
    resetStates: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'stockcontroll',
  state: {
    suppliers: [],
    supplier: {},
  },
  effects: {
    *fetchSupplier({ payload }, { call, put }) {
      const res = yield call(fetchSupplier, payload);
      yield put({
        type: 'putSupplier',
        payload: res?.data ? res.data : {},
      });
    },
    *fetchSuppliers(_, { call, put }) {
      const response = yield call(getAllSuppliers);
      yield put({
        type: 'suppliers',
        payload: Array.isArray(response?.data) ? response?.data : [],
      });
    },
    *toggleActiveStatus({ payload }, { call }) {
      yield call(toggleActiveStatus, payload);
    },
    *bulkDelete({ payload, callback }, { call }) {
      yield call(bulkDelete, payload);
      if (callback) callback();
    },
    *create({ payload, callback }, { call }) {
      const res = yield call(create, payload);
      if (callback && res?.data?.id) callback();
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(update, payload);
      if (callback && res?.data) callback();
    },
  },

  reducers: {
    suppliers(state, action) {
      return {
        ...state,
        suppliers: action.payload,
      };
    },
    putSupplier(state, action) {
      return {
        ...state,
        supplier: action.payload,
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
