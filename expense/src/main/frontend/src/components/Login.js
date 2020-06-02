import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Redirect} from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);

  }

  handleChange(event) {

    this.setState(
        {
          [event.target.name]: event.target.value
        }
    )
  }

  loginClicked() {

    if(this.state.username==='admin' && this.state.password==='gdlyl1016') {
      AuthenticationService
      .executeBasicAuthenticationService(this.state.username,
          this.state.password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(this.state.username,
            this.state.password);
        this.props.history.push('/home');
      }).catch(() => {
        this.setState({showSuccessMessage: false});
        this.setState({hasLoginFailed: true});
      })
    }
    else {

        this.setState({showSuccessMessage:false});
        this.setState({hasLoginFailed:true});

      }
  }

  render() {

    if (AuthenticationService.isUserLoggedIn()) {
      return <Redirect to="/home" />
    }else {
      return (
          <div>
            <h1>Login</h1>
            <div className="container">
              {this.state.hasLoginFailed && <div
                  className="alert alert-warning">Invalid Credentials</div>}
              {this.state.showSuccessMessage && <div>Login Sucessful</div>}
              User Name: <input type="text" name="username"
                                value={this.state.username}
                                onChange={this.handleChange}/>
              Password: <input type="password" name="password"
                               value={this.state.password}
                               onChange={this.handleChange}/>
              <button className="btn btn-success"
                      onClick={this.loginClicked}>Login
              </button>
            </div>
          </div>

      )
    }

  }
}

export default Login;
