import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';   // Import unconnected version so we can pass in props
import testExpenses from '../fixtures/testExpenses';

test('Should render ExpenseList with testExpenses', () => {
  const wrapper = shallow(<ExpenseList expenses = {testExpenses }/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses = { [] }/>);
  expect(wrapper).toMatchSnapshot();
});