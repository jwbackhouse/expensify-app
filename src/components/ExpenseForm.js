import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import NumberFormat from 'react-number-format';

export default class ExpenseForm extends React.Component {
  // Populate fields if data passed on EditPage, otherwise leave blank for AddExpensePage
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    note: this.props.expense ? this.props.expense.note : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    calendarFocused: false,
    error: ''
  };
  
  // Update state.description with typed value, which then renders into the form
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  
  // Ditto for note
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  
  // Ditto for amount
  onAmountChange = (values) => {
    const amount = values.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {    // Allow no entry || Enforce max two decimal places
      this.setState(() => ({amount}));
    }
  };
  
  // Date picker functions
  onDateChange = (createdAt) => {
    if(createdAt) {
      this.setState(() => ({createdAt}));
    }   // No else clause so cannot delete date field
  };
  
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    
    if (!this.state.description || !this.state.amount) {    // Check description and amount are present
      this.setState(() => ({error: 'Please complete both the description and amount'}));    // Error message
    } else {
      this.setState(() => ({error: ''}));   // Clear error message
      this.props.onSubmit({   // Provide expense object to props function
        description: this.state.description,
        amount: parseFloat(this.state.amount,10) * 100,    // Convert amount string to number and convert into pence
        createdAt: this.state.createdAt.valueOf(),   // Convert moment object to Unix ms
        note: this.state.note
      });
    }
  };
  
  // Render
  render() {
    return (
      <div>
        <form className='form' onSubmit = { this.onSubmit }>
          { this.state.error && <p className='form__error'>{this.state.error}</p> }
          <input
            type = 'text'
            className='text-input'
            placeholder = 'Description'
            value = {this.state.description}
            onChange = {this.onDescriptionChange}
            autoFocus
          />
          <NumberFormat
            value={ this.state.amount }
            className='text-input'
            id='amount-input'
            onValueChange = { this.onAmountChange }
            placeholder = 'Amount'
            // Formatting options
            allowEmptyFormatting={false}
            decimalScale={2}
            fixedDecimalScale={false}   // Set to true to always show decimal places
            isNumericString={ true }    // Needed to accept state values
            prefix={'£'}
            thousandSeparator={true}
          />
          <SingleDatePicker
            date = { this.state.createdAt }
            onDateChange = { this.onDateChange }
            focused = { this.state.calendarFocused }    // Is the calendar open or closed
            onFocusChange = { this.onFocusChange }
            numberOfMonths = { 1 }    // # months to show
            isOutsideRange={() => false }   // Allow dates in the past
            displayFormat={() => "DD/MM/YYYY"}    // Convert to UK date format
          />
          <textarea
            type = 'text'
            className='textarea'
            value = {this.state.note}
            placeholder = 'Enter details here'
            onChange = { this.onNoteChange }
          ></textarea>
          <div>
            <button className='button button--green'>
              { this.props.buttonText ? this.props.buttonText : 'Add expense' }
            </button>
          </div>
        </form>
      </div>
    )
  }
};