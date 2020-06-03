import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import testExpenses from '../fixtures/testExpenses';

// Form rendering
test('Should render ExpenseForm using defaults', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense = {testExpenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();    // Check snapshot before/after submission
  wrapper.find('form').simulate('submit', {   // Look for form submission
    preventDefault: () => {}    // pass second argument to satisfy 'e.preventDefault'
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});


// Description field
test('Should update state description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {   // at(0) looks for the first input
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('description')).toBe(value);   // this syntax is enzyme-specific
});


// Note field
test('Should update state note on input change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: {value}    // pass second argument for 'e.target.value'
  });
  expect(wrapper.state('note')).toBe(value);
});


// Amount field
test('Should update state amount using valid input', () => {
  // Have to pass in values object to NumberFormat
  const values = {
    value: '12.34'
  };
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('NumberFormat').prop('onValueChange')(values);
  expect(wrapper.state('amount')).toBe(values.value);
});

test('Should NOT update state amount with invalid input', () => {
  const values = {
    value: '56.789'
  };
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('NumberFormat').prop('onValueChange')(values);
  expect(wrapper.state('amount')).toBe('');
});


// Date picker
test('Should update state createdAt via date picker', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);    // Call the prop 'onDateChange' with 'now'
  expect(wrapper.state('createdAt')).toEqual(now);
});


// Calendar focus state
test('Should update state focus when date picker selected', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });    // Call the prop 'onFocusChange' with an object setting focused to be true
  expect(wrapper.state('calendarFocused')).toBe(focused);   // Use toBe rather than toEqual when comparing objects
});


// Form submission
test('Should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={testExpenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).lastCalledWith({
    description: 'one',
    amount: 100,
    note:undefined,
    createdAt: 0
  });
});