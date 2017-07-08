import { createStore } from 'redux';
import clientReducer from '../reducers/clientReducer';

const configureStore = (railsProps) => (
  createStore(clientReducer, railsProps)
);

export default configureStore;
