import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  }

  onRegister = () => {
    const { email, password, name } = this.state
    this.props.onRegister(email, password, name);
  }

  onClearClicked = (e) => {
    e.preventDefault();
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmedPassword: ''
    })
  }

  onInputChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, email, password, confirmedPassword } = this.state;
    const buttonStyle = { width: '45%' };

    return (
      <Container style={{ marginTop: '100px', maxWidth: "400px" }}>
        {this.props.errors[0] ? this.props.errors[0].map((error) => (
          <Container>
            <Alert color='danger'>{error}</Alert>
          </Container>
        )) : null}
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input value={name} onChange={this.onInputChanged} name='name' type='text' autoComplete='off' placeholder='Your name'>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Email address</Label>
            <Input value={email} onChange={this.onInputChanged} name='email' type='text' autoComplete='off' placeholder='Your email address'>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input value={password} onChange={this.onInputChanged} name='password' type='password' placeholder='Password'>
            </Input>
            <Input value={confirmedPassword} onChange={this.onInputChanged} name='confirmedPassword' type='password' className='mt-2' placeholder='Confirm Password'>
            </Input>
          </FormGroup>
          <Container className='mt-4' style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
            <Button
              color='info'
              style={buttonStyle}
              onClick={this.onRegister}>
              Register
            </Button>
            <Button
              color='danger'
              onClick={this.onClearClicked}
              style={buttonStyle}>
              Clear
            </Button>
          </Container>
          <Container className='mt-2' style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Button color='link' style={{ fontSize: '0.8em', padding: '0', height: '30px', ...buttonStyle }}>
              <Link to='/login' style={{ display: 'block', lineHeight: '30px', width: '100%', height: '100%' }}>
                Or login here...
              </Link>
            </Button>
          </Container>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.auth.errors
})

const mapDispatchToProps = dispatch => ({
  onRegister: (email, password, name) => dispatch(register(email, password, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);