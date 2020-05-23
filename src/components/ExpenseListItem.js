import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';
import moment from 'moment';
    
export const ExpenseListItem = ({dispatch,description,amount,createdAt,id}) => {
  const link = `/edit/${ id }`;
  return (
    <div >
      <Link to = { link }>
        <h5>{ description }</h5>
      </Link>
      <p>£{ (amount/100).toFixed(2) } - { moment(createdAt).format('Do MMM, YYYY') } </p>
      <button onClick = {() => {
        dispatch(removeExpense({ id }));
      }}>Delete</button>
    </div>
  );
};

export default connect()(ExpenseListItem);
