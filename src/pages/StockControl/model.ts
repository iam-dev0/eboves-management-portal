import { Effect, Reducer } from 'umi';
import { PostStockRequest, getStockOrder } from './service';

export interface StateType {
  stockOrder?: any;
}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    PostStockRequest: Effect;
    fetchOrder: Effect;
  };
  reducers?: {
    putStockOrder: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'stock',
  state: {
    stockOrder: {},
  },
  effects: {
    *PostStockRequest({ payload, callback }, { call, put }) {
      yield call(PostStockRequest, payload);
      if (callback) callback();
    },
    *fetchOrder({ payload }, { call, put }) {
      const response = yield call(getStockOrder, payload);
      yield put({
        type: 'putStockOrder',
        payload: typeof response === 'object' ? response.data : {},
      });
    },
  },

  reducers: {
    putStockOrder(state, action) {
      return {
        ...state,
        stockOrder: action.payload,
      };
    },
  },
};

export default BrandsModal;
