import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './Dashboard1'
import UserDashboard from '../src/dashboard/Dashboard'
import Orders from '../src/dashboard/Orders'

const App = () => {

  return (
    <>
      {/* <Menu1 /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/userDashboard" component={UserDashboard} />
        <Route exact path="/orders" component={Orders} />
      </Switch>
    </>
  )
}

export default App;