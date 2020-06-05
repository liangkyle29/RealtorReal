import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Redirect} from "react-router";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

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
        this.props.history.push('/');
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
      return <Redirect to="/" />
    }else {
      return (

          <div>
            <Container className="App">
              <h2>Login</h2>
              {this.state.hasLoginFailed && <div
                  className="alert alert-warning">Invalid Credentials</div>}
              {this.state.showSuccessMessage && <div>Login Sucessful</div>}
              <Form className="d-sm-inline-flex">
                  <FormGroup className="w-50">
                    <Col>
                    <Label>User Name: </Label>
                    <Input type="text" name="username"
                                  value={this.state.username}
                                  onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>


                  <FormGroup className="w-50">
                    <Col>
                    <Label>Password:</Label>
                    <Input type="password" name="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
              </Form>
            </Container>
            <Container className="App" >

              <Button color="primary" onClick={this.loginClicked}>
                Submit
              </Button>

            </Container>
          </div>


      )
    }

  }
}

export default Login;
