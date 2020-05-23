// EDIT TEXT FILTER
export const setTextFilter = (text = '') => ({
  type: 'EDIT_TEXT_FILTER',
  text
})

// SET SORT BY TO 'AMOUNT'
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})


// SET SORT BY TO 'DATE'
export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

// SET START DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET END DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})