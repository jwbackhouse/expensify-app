import React from 'react';
import { connect } from 'react-redux';
import {
  setTextFilter,
  // sortByAmountAsc,
  // sortByAmountDesc,
  // sortByDateNewest,
  // sortByDateOldest,
  setStartDate,
  setEndDate
} from '../actions/filters';
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
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              className='text-input'
              type='text'
              placeholder='Search text'
              value={ this.props.filters.text }
              onChange = {(e) => {
                this.props.setTextFilter(e.target.value);
              }}
            />
          </div>
          
          <div className='input-group__item'>
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
        </div>
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
    // sortByDateNewest: () => dispatch(sortByDateNewest()),
    // sortByDateOldest: () => dispatch(sortByDateOldest()),
    // sortByAmountAsc: () => dispatch(sortByAmountAsc()),
    // sortByAmountDesc: () => dispatch(sortByAmountDesc()),
    setTextFilter: (text) => dispatch(setTextFilter(text))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);



// LEGACY - selector for sort by

// <div className='input-group__item'>
//   <select
//     className='select'
//     value = { this.props.filters.sortBy }
//     onChange = {(e) => {
//       switch(e.target.value) {
//         case 'dateNewest':
//           return this.props.sortByDateNewest()
//         case 'dateOldest':
//           return this.props.sortByDateOldest()
//         case 'amountAsc':
//           return this.props.sortByAmountAsc()
//         case 'amountDesc':
//           return this.props.sortByAmountDesc()
//       }
//     }}
//   >
//     <option value='dateNewest'>Date (most recent first)</option>
//     <option value='dateOldest'>Date (oldest first)</option>
//     <option value='amountDesc'>Amount (high - low)</option>
//     <option value='amountAsc'>Amount (low - high)</option>
//   </select>
// </div>