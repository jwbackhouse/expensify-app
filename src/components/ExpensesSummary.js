import React from 'react';
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
    <div>
      <p>Viewing { props.expenses.length } { expenseWord } totalling { formattedTotal }.</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: visibleExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);