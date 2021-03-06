/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import toastr from 'toastr';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import routes from './routes';
import { loginSuccess } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './styles/styles.scss';

const store = configureStore();

toastr.options = {
  "preventDuplicates": true
};

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginSuccess(jwt.decode(localStorage.jwtToken).user));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
