import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class AppNav extends Component {
  render() {
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
            </Nav>
          </Navbar>
        </div>
    );
  }
}

export default AppNav;
