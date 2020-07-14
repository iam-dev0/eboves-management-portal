import { Effect, Reducer } from 'umi';
import { CascaderStructure } from '@/utils/utils';
import { fetchAllCategories, toggleActiveStatus,update, bulkDelete ,create, fetchCategory } from './service';

export interface StateType {}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    fetchCategories: Effect;
    create: Effect;
    fetchCategory: Effect;
    update: Effect;
    toggleActiveStatus:Effect;
    bulkDelete:Effect;
  };
  reducers?: {
    putCategories: Reducer<StateType>;
    putCategory: Reducer<StateType>;
    resetStates: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'categories',
  state: {
    categories: [],
    category: undefined,
  },
  effects: {
    *fetchCategories({ payload }, { call, put }) {
      const res = yield call(fetchAllCategories, payload);
      yield put({
        type: 'putCategories',
        payload: Array.isArray(res?.data) ? res?.data : [],
      });
    },
    *bulkDelete({ payload, callback }, { call }) {
      yield call(bulkDelete, payload);
      if (callback) callback();
    },
    *toggleActiveStatus({ payload,callback }, { call }) {
      yield call(toggleActiveStatus, payload);
      if(callback)callback();
    },
    *create({ payload, callback }, { call }) {
      const res = yield call(create, payload);
      if (callback && res?.data?.id) callback();
    },
    *fetchCategory({ payload }, { call, put }) {
      const res = yield call(fetchCategory, payload);
      yield put({
        type: 'putCategory',
        payload: res?.data ? res?.data : undefined,
      });
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(update, payload);
      if (callback && res?.data) callback();
    },
  },

  reducers: {
    putCategories(state, action) {
      return {
        ...state,
        categories: CascaderStructure(action.payload),
      };
    },
    putCategory(state, action) {
      return {
        ...state,
        category: action.payload,
      };
    },
    resetStates() {
      return {
        categories: [],
        category: undefined,
      };
    },
  },
};

export default BrandsModal;
