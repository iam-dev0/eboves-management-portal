import { Effect, Reducer } from 'umi';
import {
  postProduct,
  getProduct,
  fetchProductVariations,
  fetchVariation,
  createVariations,
  toggleProductActiveStatus,
  fetchProductFullInfo,
  updateProduct,
  bulkDelete,
  toggleVariationActiveStatus,
} from './service';

export interface StateType {}
export interface ModelType {
  namespace: string;
  state?: StateType;
  effects: {
    create: Effect;
    createVariations: Effect;
    toggleProductActiveStatus: Effect;
    fetchProductVariations: Effect;
    fetchVariation: Effect;
    updateProduct: Effect;
    fetchProduct: Effect;
    fetchProductFullInfo: Effect;
    bulkDelete: Effect;
    toggleVariationActiveStatus: Effect;
  };
  reducers?: {
    productInfo: Reducer<StateType>;
    putVaritionList: Reducer<StateType>;
    variationInfo: Reducer<StateType>;
    reset: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'products',
  state: {
    product: {},
    variationsList: [],
    variation: {},
  },
  effects: {
    *create({ payload, callback }, { call }) {
      const response = yield call(postProduct, payload);
      if (callback) callback(response?.data);
    },
    *updateProduct({ payload, callback }, { call }) {
      const response = yield call(updateProduct, payload);
      if (callback) callback(response?.data);
    },
    *fetchVariation({ payload }, { call, put }) {
      const response = yield call(fetchVariation, payload);
      yield put({
        type: 'variationInfo',
        payload: typeof response === 'object' ? response.data : {},
      });
    },
    *fetchProductVariations({ payload }, { call, put }) {
      const response = yield call(fetchProductVariations, payload);
      yield put({
        type: 'putVaritionList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchProduct({ payload }, { call, put }) {
      const response = yield call(getProduct, payload);
      yield put({
        type: 'productInfo',
        payload: typeof response === 'object' ? response.data : {},
      });
    },
    *fetchProductFullInfo({ payload }, { call, put }) {
      const response = yield call(fetchProductFullInfo, payload);
      yield put({
        type: 'productInfo',
        payload: typeof response === 'object' ? response.data : {},
      });
    },

    *createVariations({ payload, callback }, { call }) {
      const response = yield call(createVariations, payload);
      if (callback) callback(response.data);
    },

    *toggleProductActiveStatus({ payload, callback }, { call }) {
      const response = yield call(toggleProductActiveStatus, payload);
      if (callback) callback(response);
    },
    *toggleVariationActiveStatus({ payload, callback }, { call }) {
      const response = yield call(toggleVariationActiveStatus, payload);
      if (callback) callback(response);
    },
    *bulkDelete({ payload, callback }, { call }) {
      yield call(bulkDelete, payload);
      if (callback) callback();
    },
  },

  reducers: {
    putVaritionList(state, action) {
      return {
        ...state,
        variationsList: action.payload,
      };
    },
    variationInfo(state, action) {
      return {
        ...state,
        variation: action.payload,
      };
    },
    productInfo(state, action) {
      return {
        ...state,
        product: action.payload,
      };
    },
    reset() {
      return {
        product: {},
        variationsList: [],
        variation: {},
      };
    },
  },
};

export default BrandsModal;
