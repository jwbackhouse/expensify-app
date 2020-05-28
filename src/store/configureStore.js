import { createStore, combineReducers, applyMiddleware,  } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk'; // allows asynchronous calls to Firebase from actions

// This needed to use thunk alongside dev tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    // Needed to setup redux devtools + allow middleware

export default () => {
  const store = createStore (
    combineReducers({   // Takes object as an argument - with root state name as key, and reducer as the value
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk)) // See above
  );
  
  return store;
};