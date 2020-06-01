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
    <div>
      <Link className='list-item' to = { link }>
        <div className='list-item__title'>
          <h3 >{ description }</h3>
        </div>
        <div className='list-item__date'>
          <span>{ moment(createdAt).format('Do MMM, YYYY') }</span>
        </div>
        <div  className='list-item__amount'>
          <h3>{ numeral(amount/100).format('$0,0.00') }</h3>
        </div>
      </Link>
    </div>
  );
};

export default connect()(ExpenseListItem);


// Previously after Link:
//       <button className='button button--tertiary' onClick = {() => {
//         dispatch(startRemoveExpense({ id }));
//       }}>Delete</button>