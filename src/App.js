import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import GameContainer from './containers/GameContainer'
import { saveKeydown } from './actions'

class App extends Component {

  componentDidMount = () => {
    window.addEventListener("keydown", this.props.handleKeydown)
  }

  render() {
    return (
      <div id="app">
        <div id="player-one">
          <GameContainer player={this.props.player} score={this.props.score}/>
        </div>
        <div id="player-two">
          <GameContainer player={this.props.player} score={this.props.score}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    score: state.score,
    letter: state.letter
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleKeydown: (event) => {
      dispatch(saveKeydown(event.key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
