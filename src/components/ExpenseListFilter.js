import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null    // Add state property for calendar focus
  }
  
  // Date picker functions
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate),
    this.props.setEndDate(endDate)
  };
  
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  
  render() {
    return (
      <div>
        <input
          type='text'
          placeholder='Search text'
          value={ this.props.filters.text }
          onChange = {(e) => {
            this.props.setTextFilter(e.target.value);
          }}
        />
        <br />
        <br />
        <span>Sort by:</span>
        <select
          value = { this.props.filters.sortBy }
          onChange = {(e) =>{
            e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByAmount();
          }}
        >
          <option value='date'>Date (most recent first)</option>
          <option value='amount'>Amount (high - low)</option>
        </select>
        <br />
        <DateRangePicker
          startDate = { this.props.filters.startDate }
          endDate = { this.props.filters.endDate }
          onDatesChange = { this.onDatesChange }
          focusedInput = { this.state.calendarFocused }    // Is the calendar open or closed
          onFocusChange = { this.onFocusChange }
          isOutsideRange={() => false }   // Allow dates in the past
          displayFormat={() => "DD/MM/YYYY"}    // Convert to UK date format
          numberOfMonths = { 1 }    // # months to show
          showClearDates = { true }
          />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setTextFilter: (text) => dispatch(setTextFilter(text))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);