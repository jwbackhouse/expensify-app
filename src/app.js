// ** Import dependencies **
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import viewVisible from './selectors/expenses.js';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


// Set up store & log / subscribe to changes
const store = configureStore();
// store.subscribe(() => {
//   const state = store.getState();
//   const viewVisibleExpenses = viewVisible(state.expenses, state.filters);
//   console.log(viewVisibleExpenses);
// });

// Run actions
const now = moment().valueOf(); // set current Unix time
store.dispatch(addExpense({ description: 'Football', notes: 'test notes', amount: 6000, createdAt: now }));
store.dispatch(addExpense({ description: 'Handball', notes: 'test notes', amount: 7000, createdAt: now }));
store.dispatch(addExpense({ description: 'Netball', notes: 'test notes', amount: 2000, createdAt: now }));
store.dispatch(addExpense({ description: 'Tennis', notes: 'test notes', amount: 3000, createdAt: 1554249600 }));

// store.dispatch(setTextFilter('ball'));
// store.dispatch(setTextFilter('tb'));

// Log visible expenses to console
const state = store.getState();
const viewVisibleExpenses = viewVisible(state.expenses, state.filters);
  
  
// Render output
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx,document.getElementById('body'));