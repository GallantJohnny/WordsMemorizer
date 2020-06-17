import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Alert
} from 'reactstrap';

import { addWord, getWords, modifyWord } from '../actions/userWords';

class AddWordModal extends Component {
  state = {
    word: {
      value: "",
      error: false
    },
    solutions: [
      {
        id: uuid(),
        value: "",
        error: false
      }
    ],
    errors: [],
    success: false
  }

  fillInputOnModify = () => {
    let word, solutions;
    if (this.props.modifyWordId) {
      this.props.words.forEach(value => {
        if (value._id === this.props.modifyWordId) {
          word = value.wordEng;
          solutions = value.wordsNative.map(wordNative => {
            console.log(`wordNative.id: ${wordNative.id}`);
            return {
              id: wordNative.id,
              value: wordNative.value,
              error: false
            }
          });
        }
      })
      this.setState({
        word: { value: word, error: false },
        solutions: solutions,
        isModify: false
      });
    }
  }

  onFormSubmitted = (e) => {
    console.log('[onFormSubmitted]');
    e.preventDefault();
    if (this.state.word.value.length && this.state.solution.value.length) {
      const newWord = {
        word: this.state.word.value,
        solution: this.state.solution.value,
      }

      this.props.addWord(newWord);
      this.setState({
        word: {
          error: false,
          value: ''
        },
        solutions: [
          {
            id: uuid(),
            value: "",
            error: false
          }
        ],
        success: true
      });
    }
  }

  onWordChanged = event => {
    this.setState({
      word: {
        error: false,
        value: event.target.value
      },
      solution: {
        ...this.state.solution,
        error: false
      },
      success: false,
      errors: []
    });
  }

  onSolutionChanged = (event, id) => {
    let solutions = [...this.state.solutions];
    const index = solutions.findIndex(element => element.id === id);
    solutions[index].value = event.target.value;
    this.setState({
      solutions,
      errors: []
    });
  }

  onCloseClicked = () => {
    this.setState({
      word: {
        value: "",
        error: false
      },
      solutions: [
        {
          value: "",
          error: false
        }
      ],
      errors: [],
      success: false
    })
    this.props.getWords();
    this.props.clicked();
  }

  onAddSolution = () => {
    let newSolutions = [...this.state.solutions];
    newSolutions.push({ id: uuid(), value: '', error: false });
    this.setState({ solutions: newSolutions });
  }

  onInputDelete = id => {
    console.log(id);
    let solutions = [...this.state.solutions];
    const index = solutions.findIndex(element => element.id === id);
    console.log(solutions);
    console.log(index);
    solutions.splice(index, 1);
    console.log(solutions);
    this.setState({ solutions });
  }

  onSaveWord = e => {
    e.preventDefault();
    console.log('[onSaveWorld]');
    const { word, solutions } = this.state;
    const wordsNative = solutions.map(wordNative => (
      {
        id: wordNative.id,
        value: wordNative.value
      }
    ));
    const newWord = {
      wordEng: word.value,
      wordsNative: [...wordsNative]
    }
    console.log(newWord);

    if (this.props.modifyWordId) {
      this.props.modifyWord(this.props.modifyWordId, newWord);
    } else {
      this.props.addWord(newWord);
    }

    this.setState({
      word: {
        value: "",
        error: false
      },
      solutions: [
        {
          id: uuid(),
          value: "",
          error: false
        }
      ],
      errors: [],
      success: false
    });
  }

  render() {
    const wordStyle = { width: "250px", backgroundColor: 'white' };
    const solutionStyle = { width: "250px", backgroundColor: 'white' };
    const { isOpen } = this.props;
    const { solutions } = this.state;
    let alerts = '';
    let alertStyle = {
      height: '0px',
      transition: '0.2s'
    };

    /*if (this.state.errors.length && !this.state.success) {
      alertStyle.height = `${this.state.errors.length * 66}px`;
      alerts = this.state.errors.map(error => <Alert color="danger">{error}</Alert>);
    } else if (!this.state.errors.length && this.state.success) {
      alertStyle.height = '50px';
      alerts = <Alert color="success">Word is added to your vocabulary</Alert>;
    }

    if (this.state.word.error) wordStyle.backgroundColor = '#f8d7da';
    if (this.state.solution.error) solutionStyle.backgroundColor = '#f8d7da';*/

    return (
      <Container>
        <Modal onOpened={this.fillInputOnModify} isOpen={isOpen}>
          <ModalHeader>Add words to your vocabulary</ModalHeader>
          <ModalBody >
            <Container style={alertStyle}>
            </Container>
            <Form onSubmit={e => this.onFormSubmitted(e)}>
              <Container className="mx-auto" style={{ width: '350px' }}>
                <Input
                  onChange={this.onWordChanged}
                  name="word"
                  className="my-2"
                  placeholder='Word in English'
                  style={wordStyle}
                  value={this.state.word.value}
                  autoComplete='off'></Input>
                {solutions.map((solution, index) => (
                  <Container key={solution.id} style={{ display: 'flex', padding: '0' }}>
                    <Input
                      onChange={(event) => this.onSolutionChanged(event, solution.id)}
                      name={`solution${index}`}
                      className="my-2"
                      placeholder='Type in a solution'
                      style={solutionStyle}
                      value={solution.value}
                      autoComplete='off'
                    />
                    {index ? <Button
                      className='m-2'
                      style={{ height: '38px', width: '38px' }}
                      color='danger'
                      onClick={() => this.onInputDelete(solution.id)}>
                      <strong>x</strong>
                    </Button> : null}
                    {index === solutions.length - 1 ?
                      <Button
                        onClick={this.onAddSolution}
                        className="m-2" color='success'
                        style={{ height: '38px', width: '38px' }}>
                        <strong>+</strong>
                      </Button> :
                      null
                    }
                  </Container>
                ))
                }
              </Container>
              <Container className="mt-2" style={{ display: 'flex' }}>
                <Container className="d-flex flex-row-reverse">
                  <Button className="m-2" color='primary' onClick={this.onSaveWord}>Save</Button>
                  <Button className="m-2" color='danger' onClick={this.onCloseClicked}>Close</Button>
                </Container>
              </Container>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  words: state.userWords.words,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  addWord: word => dispatch(addWord(word)),
  getWords: () => dispatch(getWords()),
  modifyWord: (wordId, updatedWord) => dispatch(modifyWord(wordId, updatedWord))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddWordModal);