import { AnyAction } from 'redux';

const defaultReducer = (state: {} = {}, action: AnyAction) => {
  switch (action.type) {
    case '[auth] success':
      return { ...state, token: action.token };
    default:
      return state;
  }
};

export default defaultReducer;
