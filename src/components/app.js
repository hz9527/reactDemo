import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import routes from '../config/routeConfig'
const App = () => (
  <Router>
    <div>
      {routes.map((route, i) => <Route key={i} exact={route.path === '/'} path={route.path} component={route.component}/>)}
    </div>
  </Router>
)
export default App