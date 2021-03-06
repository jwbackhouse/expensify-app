import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import { createBrowserHistory } from 'history';   // This allows us to access history outside a component - in this case for the Firebase login in app.js
import AddExpensePage from '../components/AddExpensePage';
import ConfirmPage from '../components/ConfirmPage';
import DashboardPage from '../components/DashboardPage';
import EditPage from '../components/EditPage';
import ErrorPage from '../components/ErrorPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRoute exact path='/' component={LoginPage} />
        <PublicRoute path='/confirm' component={ConfirmPage} />
        <PrivateRoute path='/dashboard' component={DashboardPage} />
        <PrivateRoute path='/create' component={AddExpensePage} />
        <PrivateRoute path='/edit/:id' component={EditPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;


// NOTE: <BrowserRouter> has in-built history, so need to use <Router> to define own history package