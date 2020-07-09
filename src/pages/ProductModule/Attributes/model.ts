import { Effect, Reducer } from 'umi';
// import {  } from './service';
// import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: any[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchOutlets: Effect;
  };
  reducers: {
    putOutlets: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'attributes',

  state: {
    list: [],
  },

  effects: {
    *fetchOutlets({ payload }, { call, put }) {
      const response = yield call();
      yield put({
        type: 'putOutlets',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    putOutlets(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default BrandsModal;
