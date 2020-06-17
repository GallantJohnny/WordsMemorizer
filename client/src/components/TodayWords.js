import React, { Component } from 'react';
import { v1 as uuid } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container
} from 'reactstrap';

import ScoreIndicator from "./ScoreIndicator";
import Word from "./Word";

import { modifyTodaysWords, getTodaysWords } from '../actions/todaysWords';

class TodayWords extends Component {
  state = {
    input: React.createRef(),
    answer: "",
    isAnswered: false,
    isCorrect: false,
    isDisabled: false,
    wordIndex: 0,
  }

  checkSolution = (e) => {
    e.preventDefault();
    if (this.state.wordIndex < this.props.words.length) {
      if (this.state.answer === this.props.words[this.state.wordIndex].solution) {
        setTimeout(() => this.onSolutionSubmitted(true), 2000);
        this.setState({ isCorrect: true });
      } else {
        setTimeout(() => this.onSolutionSubmitted(false), 2000);
      }
      this.setState({
        isAnswered: true,
        isDisabled: true
      })
    }
  }

  onSolutionSubmitted = (isCorrect) => {
    const newWords = [...this.props.words];
    newWords[this.state.wordIndex].isAsked = true;
    newWords[this.state.wordIndex].isCorrect = isCorrect;

    this.props.modifyTodaysWords(newWords);

    this.setState({
      wordIndex: this.state.wordIndex + 1,
      answer: "",
      isCorrect: false,
      isAnswered: false,
      isDisabled: this.state.wordIndex === this.props.words.length - 1 ? true : false
    });
  }

  onAnswerChange = (event) => {
    this.setState({
      answer: event.target.value,
      isAnswered: false
    });
  }

  componentDidMount() {
    this.state.input.current.focus();
  }

  render() {
    console.log(this.props.words);
    let index = this.props.words - 1;
    let word = "No more Words for Today!";

    const scoreIndicators = this.props.words.map((word) => {
      return <ScoreIndicator key={uuid()} isCorrect={word.isCorrect} isAsked={word.isAsked} />
    });

    if (this.state.wordIndex < this.props.words.length) {
      index = this.state.wordIndex;
      word = this.props.words[index].word;
    }

    return (
      <Container className="y-4 rounded-lg" style={{ width: '350px', marginTop: '100px' }}>
        <Word
          word={word}
          isAnswered={this.state.isAnswered}
          isCorrect={this.state.isCorrect}
        />
        <Container className='d-flex my-3'>
          {scoreIndicators}
        </Container>
        <Form onSubmit={(e) => this.checkSolution(e)}>
          <FormGroup>
            <Label for="answer" hidden></Label>
            <Input
              disabled={this.state.isDisabled}
              type="text"
              name="answer"
              placeholder="Your Answer"
              autoComplete="off"
              value={this.state.answer}
              onChange={this.onAnswerChange}
              ref={this.state.input}
            ></Input>
          </FormGroup>
          <Button
            disabled={this.state.isDisabled}
            className="w-100"
            onClick={(e) => this.checkSolution(e)}>
            Check Answer
          </Button>
        </Form>
      </Container>
    );
  }
}

TodayWords.propTypes = {
  words: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  words: state.words.todaysWords
})

const mapDispatchToProps = dispatch => ({
  modifyTodaysWords: (modifiedWords) => dispatch(modifyTodaysWords(modifiedWords)),
  getTodaysWords: () => dispatch(getTodaysWords())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayWords);