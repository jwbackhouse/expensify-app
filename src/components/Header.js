import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = (props) => (
  <div className='header'>
    <div className='content-container'>
      <div className='header__content'>
        <Link className='header__title' to='/dashboard'>
          <h1>Expensify</h1>
        </Link>
        <div>
          <span>{ props.auth.displayName }</span>
          <button className='button button--link' onClick={ props.startLogout }>Logout</button>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);