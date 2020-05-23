import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import uuid from 'uuid';

//NB use 'toEqual' rather than 'toBe' since we are comparing objects not strings/numbers/boolean

test ('Should setup remove expense action object', () => {
  const action = removeExpense({ id: 1234 });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 1234
  });
});

test ('Should setup edit expense action object', () => {
  const action = editExpense(1234, {description:'abc'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 1234,
    changes: {
      description:'abc'
    }
  });
});

test ('Should setup add expense action object', () => {
  const testData = {
    description:'abc',
    note:'def',
    createdAt:1234,
    amount:100
  };
  const action = addExpense(testData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...testData,
      id: expect.any(String)
    }
  });
});

test ('Should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: 'Blank',
      note: 'blank',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});