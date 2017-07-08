import { combineReducers } from 'redux';
import { CLIENT_NAME_UPDATE } from '../constants/clientConstants';

const name = (state = '', action) => {
  switch (action.type) {
    case CLIENT_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const clientReducer = combineReducers({ name });

export default clientReducer;
