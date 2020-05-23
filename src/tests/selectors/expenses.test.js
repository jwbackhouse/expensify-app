import moment from 'moment';
import viewVisible from '../../selectors/expenses';
import expenses from '../fixtures/testExpenses';    // Import dummy expenses array


test('Should filter based on text search', () => {
  const filters = {
    text: 't',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const output = viewVisible(expenses,filters);
  expect(output).toEqual([expenses[2], expenses[1]]);
});

test('Should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const output = viewVisible(expenses,filters);
  expect(output).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };
  const output = viewVisible(expenses,filters);
  expect(output).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const output = viewVisible(expenses,filters);
  expect(output).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('Should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const output = viewVisible(expenses,filters);
  expect(output).toEqual([expenses[2], expenses[0], expenses[1]]);
});