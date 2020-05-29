// ** Import dependencies **
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

// Set up store
const store = configureStore();
console.log('Dev tools working fine');

// Render output
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx,document.getElementById('body'));
    hasRendered = true;
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Logged in.')
    store.dispatch(login(user.uid))   // This dispatch called here rather than inside startLogin so that it runs when app first loads, not just when user explictly logs in/out
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    console.log('Logged out.')
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});


ReactDOM.render(<p>Loading...</p>,document.getElementById('body'));
