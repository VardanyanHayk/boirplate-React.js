import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
// import { saveState } from "./persist";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'user',
  keyPrefix: '',
  storage,
  whitelist: ['admin', 'localization'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
export const persistor = persistStore(store);

export default ({ children }) => <Provider store={store} children={children} />;
