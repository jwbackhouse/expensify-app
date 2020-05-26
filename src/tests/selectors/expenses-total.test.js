import moment from 'moment';
import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/testExpenses.js';

const total = selectExpensesTotal(expenses);

test('Should return zero with no expenses', () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test('Should return expense amount with single expense', () => {
  const total = selectExpensesTotal([expenses[0]]);
  expect(total).toBe(expenses[0].amount);
});

test('Should sum multiple expense amounts', () => {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(310);
});