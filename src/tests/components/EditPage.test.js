import React from 'react';
import { shallow } from 'enzyme';
import { EditPage } from '../../components/EditPage';
import testExpenses from '../fixtures/testExpenses';

// Run for each test
let wrapper, history, startEditExpense, startRemoveExpense;
beforeEach(() => {
  history = {push: jest.fn()};
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  wrapper = shallow(
    <EditPage
      startEditExpense={ startEditExpense }
      startRemoveExpense={ startRemoveExpense }
      history={ history }
      expense = {testExpenses[0]}
    />
  );
});

// Tests
test('Should render EditPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit to edit an expense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(testExpenses[0]);
  expect(history.push).lastCalledWith('/');
  expect(startEditExpense).lastCalledWith(testExpenses[0].id, testExpenses[0]);
})

test('Should handle onClick to remove expense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).lastCalledWith('/');
  expect(startRemoveExpense).lastCalledWith(testExpenses[0].id);
})