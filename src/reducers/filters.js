import moment from 'moment';

// Filters reducer
const filterReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),    // Set default start date to beginning of month
  endDate: moment().endOf('month'),    // Ditto for end date
};

export default (state = filterReducerDefault, action) => {
  switch(action.type) {
    case 'EDIT_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};