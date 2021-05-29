import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './Dashboard1'
import UserDashboard from './userDashboard'

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
      </Switch>
    </>
  )
}

export default App;