import {
  setTextFilter,
  sortByAmountAsc,
  sortByDateNewest,
  sortByNameDesc,
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

test('Should setup sort_by_date_newest action object', () => {
  const action = sortByDateNewest();
  expect(action).toEqual({
    type: 'SORT_BY_DATE_NEWEST'
  });
});

test('Should setup sort_by_amount_ascending action object', () => {
  const action = sortByAmountAsc();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT_ASCENDING'
  });
});

test('Should setup sort_by_description_descending action object', () => {
  const action = sortByNameDesc();
  expect(action).toEqual({
    type: 'SORT_BY_NAME_DESCENDING'
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