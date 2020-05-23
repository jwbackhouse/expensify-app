import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../../actions/filters';
import moment from 'moment';

test('Should setup set_start_date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('Should setup set_end_date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('Should setup sort_by_date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should setup sort_by_amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('Should setup edit_text_filter action object', () => {
  const testText = 'abscsd'   // Use variable to avoid typos;
  const action = setTextFilter(testText);
  expect(action).toEqual({
    type: 'EDIT_TEXT_FILTER',
    text: testText
  });
});

test('Should setup edit_text_filter action object using defaults', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'EDIT_TEXT_FILTER',
    text: ''
  });
});