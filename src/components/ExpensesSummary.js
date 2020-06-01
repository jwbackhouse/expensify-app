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
  // Visible expenses
  const total = expensesTotal(props.visibleExpenses);
  const formattedTotal = numeral(total / 100).format('$0,0.00');
  const expenseWord = props.visibleExpenses.length === 1 ? 'expense' : 'expenses';
  
  // Difference to all expenses
  const hiddenTotal = expensesTotal(props.allExpenses) - total;
  const formattedHiddenTotal = numeral(hiddenTotal / 100).format('$0,0.00');
  const hiddenExpenseWord = props.allExpenses.length === 1 ? 'expense' : 'expenses';
  const hiddenNumber = props.allExpenses.length - props.visibleExpenses.length;
  
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          Viewing <span>{ props.visibleExpenses.length }</span> { expenseWord } totalling <span>{ formattedTotal }</span>
        </h1>
        { hiddenTotal > 0 && <p className = 'page-header__subtitle' >
            ({ hiddenNumber } hidden { hiddenExpenseWord } totalling { formattedHiddenTotal } not showing)
        </p> }
        <div className='page-header__actions'>
          <Link className='button' to='/create'>Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    visibleExpenses: visibleExpenses(state.expenses, state.filters),
    allExpenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);