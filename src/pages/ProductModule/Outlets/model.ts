import { Effect, Reducer } from 'umi';
import {
  toggleActiveStatus,
  bulkDelete,
  createOutlet,
  updateOutlet,
  fetchCountries,
  fetchUsers,
  fetchOutlets,
} from './service';
import { OutletItem } from './data';

export interface StateType {
  Countries?: any[];
  outlets?: OutletItem[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    toggleActiveStatus: Effect;
    bulkDelete: Effect;
    create: Effect;
    update: Effect;
    fetchUsers: Effect;
    fetchCountries: Effect;
    fetchOutlets: Effect;
  };
  reducers: {
    putCountries: Reducer<StateType>;
    putOutlets: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'outlets',

  state: {
    Countries: [],
    outlets: [],
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
      const res = yield call(createOutlet, payload);
      if (callback && res?.data?.id) callback();
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
    *fetchOutlets({ payload }, { call, put }) {
      const res = yield call(fetchOutlets, payload);
      yield put({
        type: 'putOutlets',
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
            return { value: city.id, label: city.name, ...city };
          }),
        };
      });
      return {
        ...state,
        Countries: structure,
      };
    },
    putOutlets(state, action) {
      return {
        ...state,
        outlets: action.payload,
      };
    },
  },
};

export default BrandsModal;
