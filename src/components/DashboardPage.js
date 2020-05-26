import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';
import ExpensesSummary from './ExpensesSummary';

const DashboardPage = () => (
  <div>
    <p>This is the homepage</p>
    <ExpenseListFilter />
    <ExpensesSummary />
    <ExpenseList />
  </div>
);

export default DashboardPage;