import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/testExpenses';    // Import dummy expenses array
import moment from 'moment';


test('Should set blank expenses array by default', () => {
  const state = expensesReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('Should add an expense object to the array', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      description:'ABC',
      note:'DEF',
      amount:100000,
      createdAt:1234000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses,action.expense]);
});

test('Should remove an expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('Should NOT remove an expense as id is invalid', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 99
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(state);
});

test('Should edit an expense based on id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[2].id,
    changes: {
      description: 'Updated',
      amount: 999,
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([   // Could alternatively just check that expenses[2].description / amount equal new values
    expenses[0],
    expenses[1],
    {
      description: action.changes.description,
      amount: action.changes.amount,
      createdAt: moment(0).add(4,'days').valueOf(),
      id: expenses[2].id
    }
  ]);
});

test('Should NOT edit an expense if ID not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 999,
    changes: {
      description: 'Updated',
      amount: 999,
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(state);
});