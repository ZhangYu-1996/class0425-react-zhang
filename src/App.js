import  React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'

import './App.css'

class App extends Component{
  render() {
    return  <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
      </Switch>
    </Router>
  }
}
export default App;