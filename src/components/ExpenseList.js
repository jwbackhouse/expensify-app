import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import visibleExpenses from '../selectors/expenses.js';

// Render an ExpenseListItem component for each expense
export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key = { expense.id } {...expense } />
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: visibleExpenses(state.expenses, state.filters),    // or to return all expenses use state.expenses
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);