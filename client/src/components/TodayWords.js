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
  getTodaysWords,
  updateTodaysWordsInDb
} from '../actions/todaysWords';

class TodayWords extends Component {
  state = {
    input: React.createRef(),
    answer: "",
    isAnswered: false,
    isCorrect: false,
    isDisabled: false,
    wordIndex: this.props.wordIndex
  }

  componentDidMount() {
    this.props.getTodaysWords();
    console.log(this.props.words);
    this.props.words.forEach((word, index) => console.log(index));
  }

  checkSolution = (e) => {
    e.preventDefault();
    const { words, wordIndex } = this.props;
    //const { wordIndex } = this.state;
    if (wordIndex < words.length) {
      words[wordIndex].wordsNative.forEach(solution => {
        if (this.state.answer === solution.value) {
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
    const { isCorrect } = this.state;
    const { wordIndex } = this.props;

    this.props.setIsCorrect(isCorrect, wordIndex);
    this.props.setIsAnsweredToTrue(wordIndex);
    this.props.updateTodaysWordsInDb();

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
    const { words, wordIndex } = this.props;
    const { isAnswered, isCorrect, isDisabled, input, answer } = this.state;

    console.log(words);
    let index = words.length - 1;
    let word = "No more Words for Today!";

    const scoreIndicators = words.map(word => {
      return <ScoreIndicator key={word._id} isCorrect={word.isCorrect} isAsked={word.isAnswered} />
    });

    if (wordIndex < words.length) {
      index = wordIndex;
      word = words[index].wordEng;
    }

    return (
      <Container className="y-4 rounded-lg" style={{ width: '350px', marginTop: '100px' }}>
        <Word
          word={word}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
        />
        <Container className='d-flex my-3'>
          {scoreIndicators}
        </Container>
        <Form onSubmit={(e) => this.checkSolution(e)}>
          <FormGroup>
            <Label for="answer" hidden></Label>
            <Input
              disabled={isDisabled}
              type="text"
              name="answer"
              placeholder="Your Answer"
              autoComplete="off"
              value={answer}
              onChange={this.onAnswerChange}
              ref={input}
            ></Input>
          </FormGroup>
          <Button
            disabled={isDisabled}
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
  words: state.words.todaysWords,
  wordIndex: state.words.wordIndex
})

const mapDispatchToProps = dispatch => ({
  setIsCorrect: (isCorrect, index) => dispatch(setIsCorrect(isCorrect, index)),
  setIsAnsweredToTrue: index => dispatch(setIsAnsweredToTrue(index)),
  getTodaysWords: () => dispatch(getTodaysWords()),
  updateTodaysWordsInDb: () => dispatch(updateTodaysWordsInDb())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayWords);