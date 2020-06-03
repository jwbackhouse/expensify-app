import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';   // import unconnected version so we can populate props
import testExpenses from '../fixtures/testExpenses';

test('Should render correct message for single expense with two hidden', () => {
  const wrapper = shallow(<ExpensesSummary visibleExpenses={[testExpenses[0]]} allExpenses={ testExpenses }/>);
  expect(wrapper).toMatchSnapshot();
})

test('Should render correct message for multiple expenses with none hidden', () => {
  const wrapper = shallow(<ExpensesSummary visibleExpenses={ testExpenses } allExpenses={ testExpenses }  />);
  expect(wrapper).toMatchSnapshot();
})