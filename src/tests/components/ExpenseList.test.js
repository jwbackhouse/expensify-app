import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';   // Import unconnected version so we can pass in props
import testExpenses from '../fixtures/testExpenses';
import { testFilters, altTestFilters } from '../fixtures/testFilters';


test('Should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses = { [] }/>);
  expect(wrapper).toMatchSnapshot();
});

describe('Test with all expenses', () => {
  let wrapper, sortByNameAsc, sortByAmountDesc, sortByDateOldest;
  beforeEach(() => {
    sortByNameAsc = jest.fn();
    sortByAmountDesc = jest.fn();
    sortByDateOldest = jest.fn();
    wrapper = shallow(
      <ExpenseList
        expenses = { testExpenses }
        filters= { testFilters }
        sortByNameAsc={ sortByNameAsc }
        sortByAmountDesc={ sortByAmountDesc }
        sortByDateOldest={ sortByDateOldest }
      />
    );
  })
  
  test('Should render ExpenseList with testExpenses', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('Should set sortBy to date, oldest first', () =>{
    wrapper.find('#sortByDate').childAt(1).simulate('click');
    expect(sortByDateOldest).toBeCalled();
  });
  
  test('Should set sortBy to amount descending', () =>{
    wrapper.find('#sortByAmount').childAt(2).simulate('click');
    expect(sortByAmountDesc).toBeCalled();
  });
  
  test('Should set sortBy to description A-Z', () =>{
    wrapper.find('#sortByName').childAt(1).simulate('click');
    expect(sortByNameAsc).toBeCalled();
  });
})
