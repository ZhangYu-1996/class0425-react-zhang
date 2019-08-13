import React, {Component,Fragment} from 'react'

import Admin from './pages/admin'
import Login from './pages/login'
class App extends Component{
  render() {
    return  <Fragment>
        <Admin/>
        <Login/>
    </Fragment>
  }
}
export default App;