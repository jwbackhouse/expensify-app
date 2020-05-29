import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {    // Redux-thunk allows us to return a function, which is called with dispatch
    const uid = getState().auth.uid;
    const {
      description = 'Blank',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;   // Using destructuring to extract data from the expenseData argument rather than doing it in function argument itself (as in commented-out ADD_EXPENSE below)
    const expense = { description, note, amount, createdAt };   // uses deconstructed values from expenseData
    return database.ref(`users/${ uid }/expenses`).push(expense).then((ref) => {
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

export const startRemoveExpense = ({id}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${ uid }/expenses/${ id }`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT EXPENSE
export const editExpense = (id, changes) => ({
  type: 'EDIT_EXPENSE',
  id,
  changes
});

export const startEditExpense = (id, changes) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${ uid }/expenses/${ id }`).update(changes).then(() => {
      dispatch(editExpense(id, changes));
    });
  };
};

// SET EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${ uid }/expenses`).once('value').then((snapshot) => {
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