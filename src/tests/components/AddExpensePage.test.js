import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import testExpenses from '../fixtures/testExpenses';

// Run this code before each test
let addExpense, history, wrapper;
beforeEach(() => {
  addExpense = jest.fn();   // Set up spy for addExpense function
  history = {   // Have to use object to setup spy for history.push
    push: jest.fn()
  };
  wrapper = shallow(<AddExpensePage addExpense={ addExpense } history={ history }/>);
})

// Run tests
test('Should render AddExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
})

test('Should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(testExpenses[2]);   // Call onSubmit with dummy expense data
  expect(history.push).lastCalledWith('/');   // Check history.push is called with correct value
  expect(addExpense).lastCalledWith(testExpenses[2]);   // Ditto for onSubmit
})