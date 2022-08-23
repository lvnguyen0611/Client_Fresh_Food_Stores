import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider} from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlerProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 100,
  position: positions.BOTTOM_CENTER,
  offset: '10px',
  transition: transitions.SCALE
}


ReactDOM.render(
  <Provider store={store}>
    <AlerProvider template={ AlertTemplate } {...options }>
      <App />
    </AlerProvider>
  </Provider>,
  document.getElementById('root')
);

