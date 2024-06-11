import {Route, Switch} from 'react-router-dom'
// import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import SignupPage from './components/SignupPage'
import Home from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
