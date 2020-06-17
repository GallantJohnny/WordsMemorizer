import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import { login } from '../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onClearClicked = (e) => {
    e.preventDefault();
    this.setState({
      email: '',
      password: ''
    })
  }

  onLoginSubmitted = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    this.props.onLogin(email, password);
  }

  onInputChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, password } = this.state;
    const buttonStyle = { width: '51%', marginTop: '10px' };
    const registerBtnStyle = {
      fontSize: '0.8em',
      padding: '0',
      height: '30px',
      ...buttonStyle
    };

    return (
      <Container style={{ marginTop: '100px', maxWidth: "400px" }}>

        {this.props.errors[0] ? this.props.errors[0].map((error) => (
          <Container>
            <Alert color='danger'>{error}</Alert>
          </Container>
        )) : null}
        <Form onSubmit={this.onLoginSubmitted}>
          <FormGroup>
            <Label>Email</Label>
            <Input value={email} onChange={this.onInputChanged} name='email' type='text' autoComplete='off' placeholder='Your name'>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input value={password} onChange={this.onInputChanged} name='password' type='password' autoComplete='off' placeholder='Your email address'>
            </Input>
          </FormGroup>
          <Container style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
            <Button color='info' style={buttonStyle}>Login</Button>
            <Button className='' color='link' onClick={this.onClearClicked} style={registerBtnStyle}>
              <Link to='/register' style={{ display: 'block', width: '100%', height: '100%', lineHeight: '30px' }}>
                Or register here...
              </Link>
            </Button>
          </Container>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errors: state.auth.errors
})

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);