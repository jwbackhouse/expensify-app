import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses';
import testExpenses from '../fixtures/testExpenses';
import database from '../../firebase/firebase';

// Setup mock store - pass in thunk as middleware
const mockStore = configureMockStore([thunk]);

// Set up dummy user id
const uid = '123abc';
const defaultAuthState = { auth: { uid } };    // Have to pass in value for uid into mock store as it's expected in the function


// NOTE using 'toEqual' rather than 'toBe' since we are comparing objects not strings/numbers/boolean so want to check strict equality


beforeEach((done) => {
  const expenseData = {};
  testExpenses.forEach(({ id, description, note = '', amount, createdAt }) => {    // deconstruct testExpenses objects
    expenseData[id] = { description, amount, createdAt };
  });
  database.ref(`users/${ uid }/expenses`).set(expenseData).then(() => done());    // Call done() once database promise has resolved
});

test ('Should setup remove expense action object', () => {
  const action = removeExpense({ id: 1234 });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 1234
  });
});

test('Should remove an item from Firebase', (done) => {
  const store = mockStore(defaultAuthState);
  const expenseID = testExpenses[1].id;
  
  store.dispatch(startRemoveExpense({ id: expenseID })).then(() =>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id:expenseID
    });
    return database.ref(`users/${ uid }/expenses/${ expenseID }`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy;   // Inbuilt alternative to toBe(null)
    done();
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

test('Should edit an expense in Firebase', (done) => {
  const store = mockStore(defaultAuthState);
  const id = testExpenses[2].id;
  const changes = {
    amount: 98765,
  };
  
  store.dispatch(startEditExpense(id, changes)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      changes
    });
    return database.ref(`users/${ uid }/expenses/${ id }`).once('value');
  }).then((snapshot) => {
    const editedExpense = snapshot.val();
    expect(editedExpense.amount).toEqual(changes.amount);
    done();
  });
});

test ('Should setup add expense action object', () => {
  const action = addExpense(testExpenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: testExpenses[0]
  });
});

test('Should add expense to Firebase and store', (done) => {    // calling second arg with 'done' forces jest to wait until done() is called - which is how we test async functions
  const store = mockStore(defaultAuthState);
  const expenseData = {
    description: 'Test title',
    note: 'Test notes',
    amount: 100,
    createdAt: 1234
  };
  
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
  
    // NOTE an alternative approach to promise chaining with lots of callback nesting
    // database.ref(`expenses/${ actions[0].expense.id }`).once('value').then((snapshot) => {
    //   expect(snapshot.val()).toEqual(expenseData);
    //   done();   // Have to move done() in here as it's an async call
    // });
    
    // NOTE uses promise chaining approach - NB need to return a promise, the output of which is passed into .then only when it resolves
    return database.ref(`users/${ uid }/expenses/${ actions[0].expense.id }`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();   // Have to move done() in here as it's an async call
  });
});

test('Should add expense to Firebase and store using default values', (done) => {
  const store = mockStore(defaultAuthState);
  const expenseDefaults = {
    description: 'Blank',
    note: '',
    amount: 0,
    createdAt: 0
  };
  
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    
    return database.ref(`users/${ uid }/expenses/${ actions[0].expense.id }`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('Should setup setExpenses action object', () => {
  const action = setExpenses(testExpenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses: testExpenses
  })
});

test('Should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [testExpenses[0]]   // NB this needs to be an array not an object
  }
  const state = expensesReducer(testExpenses, action);
  expect(state).toEqual([testExpenses[0]]);
})

test('Should fetch expenses from Firebase', (done) => {
  const store = mockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses: testExpenses    // We set this in beforeEach()
    });
    done();
  });
});

  


// test ('Should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       description: 'Blank',
//       note: 'blank',
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   });
// });