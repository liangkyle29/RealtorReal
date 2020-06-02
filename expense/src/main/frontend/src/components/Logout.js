import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Redirect} from "react-router";

class Logout extends Component {

  constructor(props) {
    super(props);
    AuthenticationService.logout();

  }

  render() {

    return (
        <Redirect to="/login" />

    );
  }
}

export default Logout;
