import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({startLogout}) => (
  <div>
    <h1>
      <Link to='/dashboard'>Expensify</Link>
    </h1>
    <ul>
      <li>
        <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/create' activeClassName='is-active' exact={true}>Create</NavLink>
      </li>
      <li>
        <NavLink to='/help' activeClassName='is-active' exact={true}>Help</NavLink>
      </li>
    </ul>
    <button onClick={ startLogout }>Logout</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);