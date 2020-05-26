// *** Using forEach ***
// export default ((expenses) => {
//   let expenseTotal = 0;
//   expenses.forEach ((expense) => {
//     expenseTotal += expense.amount;
//   });
//   return expenseTotal;
// });

// *** Using reduce ***
// export default ((expenses) => {
//   const totaliser = (acc, cur) => acc + cur.amount
//   return expenses.reduce(totaliser, 0)
// })

// Using map + reduce
export default ((expenses) => {
  const expenseAmounts = expenses.map(expense => expense.amount);
  const totaliser = (acc, cur) => acc + cur;
  return expenseAmounts.reduce(totaliser, 0);
});