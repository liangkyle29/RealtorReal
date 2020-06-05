import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import AuthenticationService from './AuthenticationService';

class AppNav extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">382 Expense Application</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/categories/">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/expenses/">Expense</NavLink>
              </NavItem>

              {!isUserLoggedIn
              &&
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              }

              {isUserLoggedIn
              &&
                <NavItem>
                  <NavLink href="/logout">Logout</NavLink>
                </NavItem>
              }

            </Nav>
          </Navbar>
        </div>
    );
  }
}

export default AppNav;
