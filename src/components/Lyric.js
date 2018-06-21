import React from 'react'
import Letter from './Letter'
import { connect } from 'react-redux'
import { getNextLetter } from '../actions'
import { saveCorrectLetters } from '../actions'
import { updateScore } from '../actions'
import { updateOpponentScore } from '../actions'
import io from 'socket.io-client';

class Lyric extends React.Component {

  constructor(props){
      super(props);
      this.socket = io('localhost:3000')
      this.socket = io('localhost:3000', { transports: ['websocket']})
  }

  render(){
    let letters = this.props.content
    let correctLetters = this.props.correctLetters
    let nextLetter = letters.length === correctLetters.length ? "" : letters.slice(correctLetters.length)[0]

    this.socket.emit('updatescore', {player: this.props.player, score: this.props.score})
    this.socket.emit('updateletters', {player: this.props.player, letters: this.props.correctLetters})

    if(nextLetter){
      nextLetter = nextLetter.toLowerCase();
    }

    if(this.props.letter.toLowerCase() === nextLetter){
      correctLetters = correctLetters + letters.slice(correctLetters.length)[0]
      this.props.saveCorrectLetters(correctLetters);
      this.props.updateScore();
    }

    let incorrectLetters = letters.slice(correctLetters.length)
    this.props.getNextLetter(incorrectLetters[0])

    return (
      <div>
        {correctLetters.split("").map((letter,index) => {
          return <Letter classname="highlight" letter={letter} key={index} />
        })}
        {incorrectLetters.split("").map((letter, index) => {
          return <Letter letter={letter} key={index} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    correctLetters: state.correctLetters,
    letter: state.letter,
    score: state.score,
    player: state.player
  }
}

function mapDispatchToProps(dispatch){
  return {
    getNextLetter: (letter) => {
      dispatch(getNextLetter(letter))
    },
    saveCorrectLetters: (letters) => {
      dispatch(saveCorrectLetters(letters))
    },
    updateScore: () => {
      dispatch(updateScore())
    },
    updateOpponentScore: (score) => {
      dispatch(updateOpponentScore(score))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lyric)
