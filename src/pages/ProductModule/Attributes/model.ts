import { Effect, Reducer } from 'umi';
import { toggleActiveStatus, bulkDelete,createAttribute,updateAttribute, fetchAttributes } from './service';
import { AttributeItem } from './data';


export interface StateType {
  attributes: AttributeItem[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    toggleActiveStatus: Effect;
    bulkDelete: Effect;
    create:Effect;
    update:Effect;
    fetchAttributes:Effect;
  };
  reducers: {
    putAttributes: Reducer<StateType>;
  };
}

const BrandsModal: ModelType = {
  namespace: 'attributes',

  state: {
    attributes: [],
  },

  effects: {
    *toggleActiveStatus({ payload }, { call }) {
      yield call(toggleActiveStatus, payload);
    },
    *bulkDelete({ payload, callback }, { call }) {
      yield call(bulkDelete, payload);
      if (callback) callback();
    },
    *fetchAttributes({ payload, callback }, { call,put }) {
     const res= yield call(fetchAttributes, payload);
      yield put({
        type: 'putAttributes',
        payload: Array.isArray(res?.data) ? res.data : [],
      });
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

  reducers: {
    putAttributes(state, action) {
      return {
        ...state,
        attributes: action.payload,
      };
    },
  },
};

export default BrandsModal;
