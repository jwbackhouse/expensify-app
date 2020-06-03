import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import visibleExpenses from '../selectors/expenses.js';
import {
  sortByAmountAsc,
  sortByAmountDesc,
  sortByDateNewest,
  sortByDateOldest,
  sortByNameAsc,
  sortByNameDesc
} from '../actions/filters';

// Render an ExpenseListItem component for each expense
export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>
        Expenses
      </div>
      <div className='show-for-desktop show-for-desktop--primary' id='sortByName'>
        Expense
        <img
          className='arrow arrow--up'
          onClick = {() =>{ props.sortByNameAsc() }}
          src='/images/arrow-up.jpg'
        />
        <img
          className='arrow arrow--down'
          onClick = {() => {props.sortByNameDesc()}}
          src='/images/arrow-down.jpg'
        />
      </div>
      <div className='show-for-desktop' id='sortByDate'>
        Date created
        <img
          className='arrow arrow--up'
          onClick = {() =>{ props.sortByDateOldest() }}
          src='/images/arrow-up.jpg'
        />
        <img
          className='arrow arrow--down'
          onClick = {() => {props.sortByDateNewest()}}
          src='/images/arrow-down.jpg'
        />
      </div>
      <div className='show-for-desktop' id='sortByAmount'>
        Amount
        <img
          className='arrow arrow--up'
          onClick = {() =>{ props.sortByAmountAsc() }}
          src='/images/arrow-up.jpg'
        />
        <img
          className='arrow arrow--down'
          onClick = {() => {props.sortByAmountDesc()}}
          src='/images/arrow-down.jpg'
        />
      </div>
    </div>
    <div className='list-body'>
      { props.expenses.length === 0
        ? <div className='list-item list-item--message'>
            <span>No expenses yet</span>
          </div>
        : props.expenses.map((expense) => {
            return <ExpenseListItem key = { expense.id } { ...expense }/>
          })
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: visibleExpenses(state.expenses, state.filters),    // or to return all expenses use state.expenses
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByDateNewest: () => dispatch(sortByDateNewest()),
    sortByDateOldest: () => dispatch(sortByDateOldest()),
    sortByAmountAsc: () => dispatch(sortByAmountAsc()),
    sortByAmountDesc: () => dispatch(sortByAmountDesc()),
    sortByNameAsc: () => dispatch(sortByNameAsc()),
    sortByNameDesc: () => dispatch(sortByNameDesc()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);