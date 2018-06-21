import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import { saveKeydown } from '../actions'

class MainGameContainer extends Component {

  componentDidMount = () => {
    window.addEventListener("keydown", this.props.handleKeydown)
  }

  render() {
    return (
      <div>
          <GameContainer />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    correctLetters: state.correctLetters,
    letter: state.letter,
    nextLetter: state.nextLetter
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleKeydown: (event) => {
      dispatch(saveKeydown(event.key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGameContainer)
