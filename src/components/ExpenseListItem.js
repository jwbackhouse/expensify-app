import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startRemoveExpense } from '../actions/expenses';
import moment from 'moment';
import numeral from 'numeral';
// Set GB currency
import "numeral/locales/en-gb";
numeral.locale('en-gb');
    
export const ExpenseListItem = ({dispatch,description,amount,createdAt,id}) => {
  const link = `/edit/${ id }`;
  return (
    <div >
      <Link to = { link }>
        <h5>{ description }</h5>
      </Link>
      <p>
        { numeral(amount/100).format('$0,0.00') }
         -
        { moment(createdAt).format('Do MMM, YYYY') }
      </p>
      <button onClick = {() => {
        dispatch(startRemoveExpense({id}));
      }}>Delete</button>
    </div>
  );
};

export default connect()(ExpenseListItem);
