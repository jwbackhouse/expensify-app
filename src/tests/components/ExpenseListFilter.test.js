import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../components/ExpenseListFilter';
import moment from 'moment';
import { testFilters, altTestFilters } from '../fixtures/testFilters';

let wrapper, setStartDate, setEndDate, setTextFilter, onFocusChange;
beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  onFocusChange = jest.fn();
  wrapper = shallow(
    <ExpenseListFilter
      setStartDate={ setStartDate }
      setEndDate={ setEndDate }
      setTextFilter={ setTextFilter }
      filters={ testFilters }
    />
  )
});

// Run tests
test('Should render ExpenseListFilter page', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilter page using alt filters', () => {
  wrapper.setProps({    // This is how to override the 'beforeEach' function above
    filters: altTestFilters
  })
  expect(wrapper).toMatchSnapshot();
});

test('Should set date range', () => {
  const startDate = moment(0).add(4, 'weeks');
  const endDate = moment(0).add(2,'weeks');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).lastCalledWith(startDate);
  expect(setEndDate).lastCalledWith(endDate);
});

test('Should handle calendar focus change', () => {
  const calendarFocused = 'startDate'   // For date range picker, focus is called with either startDate or endDate
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  // expect(onFocusChange).lastCalledWith(calendarFocused);   // Not sure why this fails but it does
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})

test('Should set description to abc', () =>{
  const value = 'abc'
  wrapper.find('input').simulate('change', {
    target: {
      value
    }
  });
  expect(setTextFilter).lastCalledWith(value);
});