import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const {
      description = 'Blank',
      note = 'Blank',
      amount = 0,
      createdAt = 0
    } = expenseData;   // Using destructuring to extract data from the expenseData argument rather than doing it in function argument itself (as in commented-out ADD_EXPENSE below)
    const expense = { description, note, amount, createdAt };   // uses deconstructed values from expenseData
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,    // .then callback from .push gets called with ref, so can get id from this
        ...expense
      }))
    });
  };
};

// REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSE
export const editExpense = (id, changes) => ({
  type: 'EDIT_EXPENSE',
  id,
  changes
});

// SET EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const dbExpenses = [];
      snapshot.forEach((childSnapshot) => {
        const output = childSnapshot.val();
        dbExpenses.push({
          id: childSnapshot.key,
          ...output
        });
      });
      dispatch(setExpenses(dbExpenses));
    });
  };
};

// // ADD_EXPENSE ORIGINAL (pre-Firebase amends)
// export const addExpense = (
//   {                         // set defaults for each key
//     description = 'Blank',
//     note = 'Blank',
//     amount = 0,
//     createdAt = 0
//   } = {}                    // default to empty object
// ) => ({
//   type: 'ADD_EXPENSE',
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });