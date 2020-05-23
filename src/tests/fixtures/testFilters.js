import moment from 'moment';

const testFilters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const altTestFilters = {
  text: 'a',
  sortBy: 'amount',
  startDate: moment(1234),
  endDate: moment(5678)
}

export { testFilters, altTestFilters };