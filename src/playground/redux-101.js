import { createStore } from 'redux'

// Update store
const store = createStore((state = {count:0}, action) => {
  switch(action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case 'RESET':
      return {
        count: 0
      };
    case 'SET':
      return {
        count: action.count
      };
    default:
      return state;
  };
  return state
});

// Respond to changes in store
store.subscribe(() => {
  console.log(store.getState())
})


// Dispatch functions
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({ setCount }) => ({
  type: 'SET',
  count: setCount
})

const resetCount = () => ({
  type: 'RESET'
})

// Dispatch methods
store.dispatch(incrementCount())
store.dispatch(incrementCount({incrementBy: 5}))
store.dispatch(decrementCount({decrementBy: 10}))
store.dispatch(decrementCount())
store.dispatch(setCount({setCount: 101}))
store.dispatch(resetCount())


// 'Plain vanilla' dispatch methods
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

// store.dispatch({
//   type: 'RESET'
// });

// store.dispatch({
//   type: 'SET',
//   count: 101
// })
