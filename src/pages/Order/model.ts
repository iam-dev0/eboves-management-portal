import { Effect, Reducer } from 'umi';
import { fetchOrder, changeStatus } from './service';

export interface StateType {
  order?: any;
}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    fetchOrder: Effect;
    changeStatus: Effect;
  };
  reducers?: {
    putOrder: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'orders',
  state: {},
  effects: {
    *fetchOrder({ payload }, { call, put }) {
      const response = yield call(fetchOrder, payload);
      yield put({
        type: 'putOrder',
        payload: typeof response === 'object' ? response.data : {},
      });
    },
    *changeStatus({ payload, callback }, { call, put }) {
      const response = yield call(changeStatus, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    putOrder(state, action) {
      return {
        ...state,
        order: action.payload,
      };
    },
  },
};

export default BrandsModal;
