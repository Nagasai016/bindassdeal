import {Component} from 'react'
import Cookies from 'js-cookie'
// import bcrypt from 'bcrypt'
import './index.css'

class SignupPage extends Component {
  state = {name: '', password: '', confirmPassword: ''}

  componentDidMount() {
    if (Cookies.get('jwtToken') !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
    if (localStorage.getItem('name') !== null) {
      const {history} = this.props
      history.replace('/login')
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

  changeConfirmPassword = event => {
    this.setState({
      confirmPassword: event.target.value,
    })
  }

  validate = event => {
    event.preventDefault()
    const {name, password, confirmPassword} = this.state
    if (password === confirmPassword) {
      localStorage.setItem('name', name)
      localStorage.setItem('password', password)
      const {history} = this.props
      history.replace('/login')
    } else {
      alert('Passwords do not match')
    }
  }

  render() {
    return (
      <div className="signup-page-container">
        <form className="signup-form" onSubmit={this.validate}>
          <input type="text" placeholder="Name" onChange={this.changeName} />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.changeConfirmPassword}
          />
          <br />
          <button type="submit">SignUp</button>
        </form>
      </div>
    )
  }
}

export default SignupPage
