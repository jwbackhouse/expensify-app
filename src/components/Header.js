import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <h1>
      <Link to='/'>Expensify</Link>
    </h1>
    <ul>
      <li>
        <NavLink to='/' activeClassName='is-active' exact={true}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/create' activeClassName='is-active' exact={true}>Create</NavLink>
      </li>
      <li>
        <NavLink to='/help' activeClassName='is-active' exact={true}>Help</NavLink>
      </li>
    </ul>
  </div>
)

export default Header