// EXPENSES REDUCER
// NOTE: Reducers convert old state to new state, based on actions. Must be a 'pure function'
// Takes state and action as arguments
const expReducerDefault = [];

export default (state = expReducerDefault, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,   // Using spread operator as an alternative to concat - doesn't change original array
        action.expense    // This returns an expense object that's added to the array
      ];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id) {
          return {
            ...expense,
            ...action.changes   // this over-rides the existing values for that expense
          }
        } else {
          return expense
        };
      });
    case 'SET_EXPENSES':
      return action.expenses;   // Overwrites all existing expenses
    default:
      return state;
  }
};
