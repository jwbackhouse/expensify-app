import React from 'react'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'

import Header from '../components/Header'
import AddExpensePage from '../components/AddExpensePage'
import DashboardPage from '../components/DashboardPage'
import EditPage from '../components/EditPage'
import ErrorPage from '../components/ErrorPage'
import HelpPage from '../components/HelpPage'


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={DashboardPage} exact={true} />
        <Route path='/create' component={AddExpensePage} />
        <Route path='/edit/:id' component={EditPage} />
        <Route path='/help' component={HelpPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;



        