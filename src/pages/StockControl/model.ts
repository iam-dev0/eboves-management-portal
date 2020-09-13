import { Effect, Reducer } from 'umi';
import { PostStockRequest, getStockOrder, stockReceived, cancelOrder ,sendOrder} from './service';

export interface StateType {
  stockOrder?: any;
}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    PostStockRequest: Effect;
    fetchOrder: Effect;
    stockReceived: Effect;
    sendOrder:Effect;
    cancelOrder: Effect;
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
    *stockReceived({ payload }, { call, put }) {
      const response = yield call(stockReceived, payload);
    },
    *cancelOrder({ payload, callback }, { call, put }) {
      const response = yield call(cancelOrder, payload);
      if (callback) callback(response);
    },
    *sendOrder({ payload, callback }, { call, put }) {
      const response = yield call(sendOrder, payload);
      if (callback) callback(response);
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
