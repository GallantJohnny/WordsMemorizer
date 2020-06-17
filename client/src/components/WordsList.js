import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Spinner
} from 'reactstrap';
import SearchIcon from '../search.png';

import AddWordModal from './AddWordModal';
import WordListItem from './WordListItem';

import { getWords, deleteWord } from '../actions/userWords';

class WordsList extends Component {
  state = {
    isModal: false,
    modifyWordId: null,
  }

  componentDidMount() {
    this.props.getWords();
  }

  onEdit = wordId => {
    console.log(wordId);
    this.setState({ modifyWordId: wordId });
    this.toggle();
  }

  toggle = () => { this.setState({ isModal: !this.state.isModal }); }
  render() {
    return (
      <Container
        className="text-center container-sm"
        style={{ maxWidth: "400px", marginTop: '100px' }}>
        <Container className="">
          <InputGroup>
            <Input placeholder='Search in your vocabulary...' />
            <InputGroupAddon addonType="append">
              <Button
                className='py-0'
                style={{ backgroundColor: '#b9b9b9', border: 'none', width: '45px' }}>
                <img src={SearchIcon} alt='_search_icon_' />
              </Button>
              <Button
                onClick={this.toggle}
                color='primary'
                className='font-weight-bold py-0'
                style={{ width: '45px', fontSize: '1.5em' }}>+</Button>
            </InputGroupAddon>
          </InputGroup>
        </Container>
        {this.props.isLoading ? <Spinner className='mt-5' color='secondary' /> :
          this.props.words.map(word => (
            <WordListItem
              key={word._id}
              word={word.wordEng}
              solutions={word.wordsNative}
              onDelete={() => this.props.deleteWord(word._id)}
              onEdit={() => this.onEdit(word._id)}
            />
          ))
        }
        <AddWordModal
          isOpen={this.state.isModal}
          isModify={this.state.isModify}
          modifyWordId={this.state.modifyWordId}
          clicked={this.toggle} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  words: state.userWords.words,
  isLoading: state.userWords.isLoading
});

const mapDispatchToProps = dispatch => ({
  getWords: () => dispatch(getWords()),
  deleteWord: (wordId) => dispatch(deleteWord(wordId))
})

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);