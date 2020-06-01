import moment from 'moment';

// FILTER VISIBLE EXPENSES
export default ((expenses, {text, sortBy, startDate, endDate}) => {   // deconstruct filters object passed in
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);    // Create moment object from createdAt
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;    // 'day' looks at differences >1 day
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true;
    
    // Old version before moving to date picker
    // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;   // return true if no start/endDate filter set
    // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

    return textMatch && startDateMatch && endDateMatch;   // only match items matching all filters
  }).sort((a,b) => {
    switch(sortBy) {
      case 'dateNewest':
        return a.createdAt < b.createdAt ? 1 : -1
      case 'dateOldest':
        return a.createdAt > b.createdAt ? 1 : -1
      case 'amountAsc':
        return a.amount > b.amount ? 1 : -1
      case 'amountDesc':
        return a.amount < b.amount ? 1 : -1
      case 'nameAsc':
        return a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1
      case 'nameDesc':
        return a.description.toLowerCase() < b.description.toLowerCase() ? 1 : -1
    }
  })
})