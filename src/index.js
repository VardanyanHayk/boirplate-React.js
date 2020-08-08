import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'styles/App.scss';
import * as serviceWorker from './serviceWorker';
import Provider from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store/configureStore';
import './localization';
// import moment locales
import 'moment/locale/ru';
import 'moment/locale/hy-am';
import 'moment/locale/en-au';

ReactDOM.render(
  <Provider>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
