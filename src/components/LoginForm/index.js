import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', onSubmiError: false, errorMsg: ''}

  onChangeInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({onSubmiError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInputUserName = () => (
    <>
      <label htmlFor="username" className="label-username">
        Username
      </label>
      <br />
      <input
        type="text"
        placeholder="Username"
        id="username"
        className="input-username"
        onChange={this.onChangeInput}
      />
    </>
  )

  renderInputPassword = () => (
    <>
      <label htmlFor="password" className="label-username">
        Password
      </label>
      <br />
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="input-username"
        onChange={this.onChangePassword}
      />
    </>
  )

  render() {
    const {onSubmiError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-website-logo"
            alt="website logo"
          />
          <div className="input-container"> {this.renderInputUserName()} </div>
          <div className="input-password-container">
            {this.renderInputPassword()}
          </div>
          <button className="login-btn" type="submit">
            {' '}
            Login{' '}
          </button>
          {onSubmiError && <p className="error-msg"> *{errorMsg} </p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
