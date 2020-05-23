import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
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
});

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