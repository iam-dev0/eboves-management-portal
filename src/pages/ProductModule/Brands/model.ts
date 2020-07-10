import { Effect, Reducer } from 'umi';
import {
  toggleActiveStatus,
  bulkDelete,
  create,
  updateOutlet,
  fetchCountries,
  fetch,
  fetchUsers,
} from './service';

export interface StateType {
  suppliers: any[];
  brand:any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch:Effect;
    toggleActiveStatus: Effect;
    bulkDelete: Effect;
    create: Effect;
    update: Effect;
    fetchUsers: Effect;
    fetchCountries: Effect;
  };
  reducers: {
    putCountries: Reducer<StateType>;
    putBrand:Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'brands',

  state: {
    suppliers: [],
    brand:undefined,
  },

  effects: {
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
    *fetch({ payload }, { call,put }) {
      const res = yield call(fetch, payload);
      yield put({
        type: 'putBrand',
        payload: res?.data? res.data : undefined,
      });
    },
    *update({ payload, callback }, { call }) {
      const res = yield call(updateOutlet, payload);
      if (callback && res?.data) callback();
    },
    *fetchUsers({ payload, callback }, { call }) {
      const res = yield call(fetchUsers, payload);
      if (callback && res?.data) callback();
    },
    *fetchCountries({ payload }, { call, put }) {
      const res = yield call(fetchCountries, payload);
      yield put({
        type: 'putCountries',
        payload: Array.isArray(res?.data) ? res?.data : [],
      });
    },
  },
  reducers: {
    putCountries(state, action) {
      const structure = action.payload.map((country: any) => {
        return {
          value: country.id,
          label: country.name,
          ...country,
          children: country.cities?.map((city: any) => {
            return { value: city.id, label: city.name,...city };
          }),
        };
      });
      return {
        ...state,
        suppliers: structure,
      };
    },
    putBrand(state, action) {
      return {
        ...state,
        brand: action.payload,
      };
    },
  },
};

export default BrandsModal;
