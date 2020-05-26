import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';   // import unconnected version so we can populate props
import testExpenses from '../fixtures/testExpenses';

test('Should render correct message for single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[testExpenses[0]]}/>);
  expect(wrapper.text()).toEqual('Viewing 1 expense totalling £1.00.');
  expect(wrapper).toMatchSnapshot();
})

test('Should render correct message for multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={testExpenses}/>);
  expect(wrapper.text()).toEqual('Viewing 3 expense totalling £3.10.');
  expect(wrapper).toMatchSnapshot();
})