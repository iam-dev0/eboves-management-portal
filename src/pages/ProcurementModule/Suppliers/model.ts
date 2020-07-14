import { Effect, Reducer } from 'umi';
import { getAllSuppliers } from './service';

export interface StateType {}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    fetchSuppliers: Effect;
  };
  reducers?: {
    suppliers: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'suppliers',
  state: {
    suppliers: [],
  },
  effects: {
    *fetchSuppliers(_, { call, put }) {
      const response = yield call(getAllSuppliers);
      yield put({
        type: 'suppliers',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    suppliers(state, action) {
      return {
        ...state,
        suppliers: action.payload,
      };
    },
  },
};

export default BrandsModal;
