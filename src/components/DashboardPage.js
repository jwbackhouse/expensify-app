import React from 'react';
import ExpenseList from './ExpenseList'
import ExpenseListFilter from './ExpenseListFilter'

const DashboardPage = () => (
  <div>
    <p>This is the homepage</p>
    <ExpenseListFilter />
    <ExpenseList />
  </div>
);

export default DashboardPage;