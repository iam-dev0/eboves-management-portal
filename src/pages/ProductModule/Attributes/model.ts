import { Effect, Reducer } from 'umi';
import { toggleActiveStatus, bulkDelete,createAttribute,updateAttribute } from './service';
// import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: any[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    toggleActiveStatus: Effect;
    bulkDelete: Effect;
    create:Effect;
    update:Effect;
  };
  reducers: {};
}

const BrandsModal: ModelType = {
  namespace: 'attributes',

  state: {
    list: [],
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
      const res=yield call(createAttribute, payload);
      if (callback && res?.data?.id) callback();
    },
    *update({ payload, callback }, { call }) {
      const res=yield call(updateAttribute, payload);
      if (callback && res?.data) callback();
    },
    
  },

  reducers: {},
};

export default BrandsModal;
