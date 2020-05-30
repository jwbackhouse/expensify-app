import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import visibleExpenses from '../selectors/expenses.js';

// Render an ExpenseListItem component for each expense
export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>
        Expenses
      </div>
      <div className='show-for-desktop'>
        Expense
      </div>
      <div className='show-for-desktop'>
        Amount
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

export default connect(mapStateToProps)(ExpenseList);