import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import visibleExpenses from '../selectors/expenses.js';
import numeral from 'numeral';
// Set GB currency
import "numeral/locales/en-gb";
numeral.locale('en-gb');

export const ExpensesSummary = (props) => {
  const total = expensesTotal(props.expenses);
  const formattedTotal = numeral(total / 100).format('$0,0.00')
  const expenseWord = props.expenses.length === 1 ? 'expense' : 'expenses'
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>Viewing <span>{ props.expenses.length }</span> { expenseWord } totalling <span>{ formattedTotal }</span></h1>
        <div className='page-header__actions'>
          <Link className='button' to='/create'>Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: visibleExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);