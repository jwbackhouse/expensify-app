// ** Import dependencies **
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import moment from 'moment';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
// import { setTextFilter } from './actions/filters';
// import viewVisible from './selectors/expenses.js';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

// Set up store
const store = configureStore();
console.log('Dev tools working fine');

// Render output
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>,document.getElementById('body'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx,document.getElementById('body'));
});