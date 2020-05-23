import filterReducer from '../../reducers/filters';
import moment from 'moment';


test('Should set default filter values', () => {
  const state = filterReducer(undefined, {type: '@@INIT'});   // @@INIT is the way redux sets itself up
  expect(state).toEqual({
   text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('Should update text filter', () => {
  const input = {
    type: 'EDIT_TEXT_FILTER',
    text: 'test'
  };
  const state = filterReducer(undefined, input);
  expect(state.text).toEqual(input.text);
});

test('Should change sort by to amount', () => {
  const input = {
    type: 'SORT_BY_AMOUNT',
  };
  const state = filterReducer(undefined, input);
  expect(state.sortBy).toEqual('amount');
});

test('Should change sort by to date', () => {
  // Set sortBy to amount (by default is already set as date)
  const dummyFilters = {
    text: 'abc',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const input = {
    type: 'SORT_BY_DATE',
  };
  const state = filterReducer(dummyFilters, input);
  expect(state.sortBy).toEqual('date');
});

test('Should change start date', () => {
  const input = {
    type: 'SET_START_DATE',
    startDate: 1234545
  };
  const state = filterReducer(undefined, input);
  expect(state.startDate).toEqual(input.startDate);
});

test('Should change end date', () => {
  const input = {
    type: 'SET_END_DATE',
    startDate: 87284546
  };
  const state = filterReducer(undefined, input);
  expect(state.endDate).toEqual(input.endDate);
});