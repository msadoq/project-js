import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import thunk from 'redux-thunk';
import reducer from '../../reducers';

export default function configureMainStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    electronEnhancer()
  );

  return createStore(reducer, initialState, enhancer);
}
