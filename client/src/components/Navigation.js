import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Button
} from 'reactstrap';

import { logout } from '../actions/authActions';

class Navigation extends Component {
  state = {
    isOpen: false
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const privateNavigation = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/today-words">I want to learn</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/words">Words</NavLink>
        </NavItem>
        <NavItem className='ml-2'>
          <Button color='danger' onClick={this.props.onLogout}>Logout</Button>
        </NavItem>
      </Nav>
    );
    const publicNavigation = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div className='fixed-top'>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href='/' className="text-light">Words Memorizer</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.isAuthenticated ? privateNavigation : publicNavigation}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);