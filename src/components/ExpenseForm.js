import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  // Populate fields if data passed on EditPage, otherwise leave blank for AddExpensePage
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    notes: this.props.expense ? this.props.expense.notes : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    calendarFocused: false,
    error: ''
  };
  
  // Update state.description with typed value, which then renders into the form
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  
  // Ditto for notes
  onNoteChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };
  
  // Ditto for amount
  onAmountChange = (e) => {
    const amount = e.target.value;
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
        notes: this.state.notes
      });
    }
  };
  
  // Render
  render() {
    return (
      <div>
      { this.state.error && <p>this.state.error</p> }
        <form onSubmit = { this.onSubmit }>
          <input
            type = 'text'
            placeholder = 'Description'
            value = {this.state.description}
            onChange = {this.onDescriptionChange}
            autoFocus
          />
          <input
            type = 'text'
            placeholder = 'Amount'
            value = { this.state.amount }
            onChange = { this.onAmountChange }
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
            value = {this.state.notes}
            placeholder = 'Enter details here'
            onChange = { this.onNoteChange }
          ></textarea>
          <button>
            { this.props.buttonText ? this.props.buttonText : 'Add expense' }
          </button>
        </form>
      </div>
    )
  }
};