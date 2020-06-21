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

import {
  setIsCorrect,
  setIsAnsweredToTrue,
  getTodaysWords
} from '../actions/todaysWords';

class TodayWords extends Component {
  state = {
    input: React.createRef(),
    answer: "",
    isAnswered: false,
    isCorrect: false,
    isDisabled: false,
    wordIndex: 0,
  }

  componentDidMount() {
    this.props.getTodaysWords();
  }

  checkSolution = (e) => {
    e.preventDefault();
    const { words } = this.props;
    const { wordIndex } = this.state;
    if (this.state.wordIndex < words.length) {
      words[wordIndex].wordsNative.forEach(solution => {
        if (this.state.answer === solution) {
          this.setState({ isCorrect: true });
        }
      });
      setTimeout(() => this.onSolutionSubmitted(), 2000);
      this.setState({
        isAnswered: true,
        isDisabled: true
      })
    }
  }

  onSolutionSubmitted = () => {
    const { wordIndex, isCorrect } = this.state;

    this.props.setIsCorrect(isCorrect, wordIndex);
    this.props.setIsAnsweredToTrue(wordIndex);

    this.setState({
      wordIndex: wordIndex + 1,
      answer: "",
      isCorrect: false,
      isAnswered: false,
      isDisabled: wordIndex === this.props.words.length - 1 ? true : false
    });
  }

  onAnswerChange = (event) => {
    this.setState({
      answer: event.target.value,
      isAnswered: false
    });
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
  setIsCorrect: (isCorrect, index) => dispatch(setIsCorrect(isCorrect, index)),
  setIsAnswered: index => dispatch(setIsAnsweredToTrue(index)),
  getTodaysWords: () => dispatch(getTodaysWords())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayWords);