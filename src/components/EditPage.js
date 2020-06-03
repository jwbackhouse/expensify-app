import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import DeleteModal from './DeleteModal';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditPage extends React.Component {
  state = {
    showModal: false
  };
  
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);    // Edit expense
    this.props.history.push('/');   // Redirect on submit (uses in-built method)
  };
  
  onClickDelete = () => {
    this.setState(() => ({ showModal: true }));
  };
  
  onClickCancel = () => {
    this.props.history.push('/');
  };
  
  onModalConfirm = () => {
    this.props.startRemoveExpense(this.props.expense.id);    // Delete expense
    this.setState(() => ({showModal: false}));
    this.props.history.push('/');   // Redirect on submit (uses in-built method)
  };
  
  onModalCancel = () => {
    this.setState(() => ({showModal: false}));
  };
  
  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Edit expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            expense = {this.props.expense}
            buttonText = { 'Save changes' }
            onSubmit = { this.onSubmit }
          />
          <div>
            <button
              className='button button--pink button--margin-right'
              id='deleteButton'
              onClick = { this.onClickDelete }
            >Delete</button>
            <button
              className='button button--grey'
              id='cancelButton'
              onClick = { this.onClickCancel }
            >Cancel</button>
          </div>
        </div>
        <DeleteModal onModalConfirm={ this.onModalConfirm } onModalCancel={ this.onModalCancel } showModal={this.state.showModal} />
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
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
})

const mapStateToProps= (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)   // Matches ID pulled from URL
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);