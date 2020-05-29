import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);    // Add expense to state under user's account
    this.props.history.push('/');    // Redirect on submit (uses in-built method)
  };
  
  render() {
    return (
      <div>
        <p>This is the add expense page</p>
        <ExpenseForm
          onSubmit={ this.onSubmit }
        />
      </div>
    );
  };
};

// Create bespoke dispatch method in order to simplify the above (and make it possible to test with a spy)
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);    // first arg is state, second is dispatch


// *** Previous in-line version of the above (which couldn't be tested in the same way)
// const AddExpensePage = (props) => (
//   <div>
//     <p>This is the add expense page</p>
//     <ExpenseForm onSubmit={(expense) => {
//         props.dispatch(addExpense(expense));    // Add expense to state
//         props.history.push('/');    // Redirect on submit (uses in-built method)
//       }}
//     />
//   </div>
// );