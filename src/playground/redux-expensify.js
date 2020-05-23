console.log('redux-expensify.js is running');
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ** STATE MODIFICATION FUNCTIONS **
// ADD_EXPENSE
const addExpense = (
  {                         // set defaults for each key
    description = 'Blank',
    note = 'blank',
    amount = 0,
    createdAt = 0
  } = {}                    // default to empty object
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT EXPENSE
const editExpense = (id, changes) => ({
  type: 'EDIT_EXPENSE',
  id,
  changes
})

// EDIT TEXT FILTER
const editTextFilter = (text = '') => ({
  type: 'EDIT_TEXT_FILTER',
  text
})

// SET SORT BY TO 'AMOUNT'
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})


// SET SORT BY TO 'DATE'
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

// SET START DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET END DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

// FILTER VISIBLE EXPENSES
const getVisibleExpenses = ((expenses, {text, sortBy, startDate, endDate}) => {         // deconstruct filters object passed in
  return expenses.filter((expense) => {
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;   // return true if no start/endDate filter set
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

    return textMatch && startDateMatch && endDateMatch;                                // only match items matching all filters
  }).sort((a,b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1                                       // most recent first
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1                                             // low to high
    }
  })
})


// ** REDUCERS **
// Expenses reducer
const expReducerDefault = [];

const expReducer = (state = expReducerDefault, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id) {
          return {
            ...expense,
            ...action.changes
          }
        } else {
          return expense
        };
      })
    default:
      return state;
  }
};

// Filters reducer
const filterReducerDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefault, action) => {
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


// ** CREATE STORE **
const store = createStore(
  combineReducers({
    expenses: expReducer,
    filters: filterReducer
  })
);

// Set up subscription to log all changes
store.subscribe(() => {
  const storeState = store.getState()
  const visibleExpenses = getVisibleExpenses(storeState.expenses, storeState.filters)
  console.log(visibleExpenses)
});


// APPLY CHANGES
console.log(store.getState())
const expenseOne = store.dispatch(addExpense({description: 'A) b) Ballet two', amount: 3000, createdAt: 124}));
const expenseTwo = store.dispatch(addExpense({description: 'B) a) Ballet', amount: 4500, createdAt: 122}));
const expenseThree = store.dispatch(addExpense({description: 'C) d) Ballet and swimming', amount: 7400, createdAt:1000}));
const expenseFour = store.dispatch(addExpense({description: 'D) c) Swimming', amount: 7500, createdAt:250}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 3950}));
// store.dispatch(editTextFilter('swim'));
// store.dispatch(editTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(123));
// store.dispatch(setEndDate(321));
// store.dispatch(setEndDate());