import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {name: '', password: ''}

  componentDidMount() {
    if (localStorage.getItem('name') === null) {
      const {history} = this.props
      history.replace('/signup')
    }
  }

  changeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  validate = event => {
    event.preventDefault()
    const {name, password} = this.state
    const storedName = localStorage.getItem('name')
    const storedPassword = localStorage.getItem('password')
    if (name === storedName && password === storedPassword) {
      Cookies.set('jwtToken', 'loggedin')
      const {history} = this.props
      history.replace('/')
    } else {
      alert('Invalid credentials')
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <h1 className="head-login">LOGIN</h1>
        <form className="login-form" onSubmit={this.validate}>
          <input type="text" placeholder="Name" onChange={this.changeName} />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
