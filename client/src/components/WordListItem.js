import React, { Component } from 'react';
import {
  Container,
  Button,
  Collapse
} from 'reactstrap';

class wordListItem extends Component {
  state = {
    dropdown: false
  }

  onClicked = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  render() {
    const { word, solutions, onDelete, onEdit } = this.props;
    const line = {
      width: '100%',
      height: '0px',
      borderTop: '#e6e6e6 solid 1px'
    }
    const dropdownStyle = {
      backgroundColor: '#6c757d',
      borderRadius: ' 0 0 5px 5px',
      width: '95%',
      boxShadow: '0px 5px 8px 4px #c9c8c8'
    }

    return (
      <Container className='my-5 p-0 text-left'>
        <Container className='p-2 border border-light rounded-sm' style={{ boxShadow: '0 0 20px 1px #c9c8c8' }} onClick={this.onClicked}>
          <div className='mx-4 my-2 h5'>{word}</div>
          <div style={line} />
          <Container style={{ display: 'flex' }}>
            {solutions.map((solution, index) => (
              <div key={index} className='mx-2 my-2' style={{ color: '#767676' }}>
                {solution.value}
              </div>
            ))}
          </Container>
        </Container>
        <Container className='p-0 d-flex justify-content-center'>
          <Collapse isOpen={this.state.dropdown} style={dropdownStyle}>
            <div className='p-2'>
              <Button onClick={onDelete}>Delete</Button>
              <Button onClick={onEdit}>Edit</Button>
            </div>
          </Collapse>
        </Container>
      </Container>
    )
  }
}

export default wordListItem;