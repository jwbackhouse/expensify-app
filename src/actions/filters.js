// EDIT TEXT FILTER
export const setTextFilter = (text = '') => ({
  type: 'EDIT_TEXT_FILTER',
  text
});

// SET SORT BY TO 'AMOUNT'
export const sortByAmountAsc = () => ({
  type: 'SORT_BY_AMOUNT_ASCENDING',
});

export const sortByAmountDesc = () => ({
  type: 'SORT_BY_AMOUNT_DESCENDING',
});

// SET SORT BY TO 'DATE'
export const sortByDateNewest = () => ({
  type: 'SORT_BY_DATE_NEWEST',
});

export const sortByDateOldest = () => ({
  type: 'SORT_BY_DATE_OLDEST',
});

// SET SORT BY TO 'NAME'
export const sortByNameAsc = () => ({
  type: 'SORT_BY_NAME_ASCENDING',
});

export const sortByNameDesc = () => ({
  type: 'SORT_BY_NAME_DESCENDING',
});

// SET START DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET END DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});