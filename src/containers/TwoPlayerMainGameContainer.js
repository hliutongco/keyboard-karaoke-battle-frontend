import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import OpponentGameContainer from './OpponentGameContainer';
import { saveKeydown } from '../actions'

class TwoPlayerMainGameContainer extends Component {

  componentDidMount = () => {
    window.addEventListener("keydown", this.props.handleKeydown)
  }

  render() {
    return (
      <div id="two-player-container">
          <div className="add-border"><GameContainer /></div>
          <div className="add-border"><OpponentGameContainer /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TwoPlayerMainGameContainer)
