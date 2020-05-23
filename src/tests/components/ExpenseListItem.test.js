import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment'
import { ExpenseListItem } from '../../components/ExpenseListItem';   // Import unconnected version so we can pass in props
import testExpenses from '../fixtures/testExpenses';

test('Should render ExpenseListItem from a test expense', () => {
  const wrapper = shallow(<ExpenseListItem { ...testExpenses[0] } />);
  expect(wrapper).toMatchSnapshot();
});