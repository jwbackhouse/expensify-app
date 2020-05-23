import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditPage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);    // Edit expense
    this.props.history.push('/')   // Redirect on submit (uses in-built method)
  };
  
  onRemove = () => {
    this.props.removeExpense(this.props.expense.id);    // Delete expense
    this.props.history.push('/');   // Redirect on submit (uses in-built method)
  };
  
  render() {
    return (
      <div>
        <ExpenseForm
          expense = {this.props.expense}
          buttonText = { 'Save changes' }
          onSubmit = { this.onSubmit }
        />
        <button
          onClick = { this.onRemove }
        >Delete</button>
      </div>
    );
  };
  
  // *** PREVIOUS CODE BEFORE MAPTODISPATCH ADDED
  // return (
  //   <div>
  //     <ExpenseForm
  //       expense = {props.expense}
  //       buttonText = { 'Save changes' }
  //       onSubmit = {(expense) => {
  //         props.dispatch(editExpense(props.expense.id, expense));    // Edit expense
  //         props.history.push('/');    // Redirect on submit (uses in-built method)
  //       }}
  //     />
  //     <button onClick = {() => {
  //       props.dispatch(removeExpense({ id: props.expense.id }));    // Delete expense
  //       props.history.push('/');
  //     }}>Delete</button>
  //   </div>
  // );
}

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense({ id }))
})

const mapStateToProps= (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)   // Matches ID pulled from URL
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);