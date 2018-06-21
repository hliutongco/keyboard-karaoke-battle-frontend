import React from 'react'
import Letter from './Letter'
import { connect } from 'react-redux'
import { updateOpponentScore } from '../actions'
import { updateOpponentLetters } from '../actions'
import io from 'socket.io-client';

class Lyric extends React.Component {

  constructor(props){
      super(props);
      this.socket = io('localhost:3000')
      this.socket = io('localhost:3000', { transports: ['websocket']})
  }

  render(){
    let letters = this.props.content
    let incorrectLetters = letters.slice(this.props.opponentLetters.length)

    this.socket.on('receivescore', (data) => {
      if(data.player !== this.props.player){
        this.props.updateOpponentScore(data.score)
      }
    })

    this.socket.on('receiveletters', (data) => {
      if(data.player !== this.props.player){
        this.props.updateOpponentLetters(data.letters)
      }
    })

    return (
      <div>
        {this.props.opponentLetters.split("").map((letter, index) => {
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
    player: state.player,
    letter: state.letter,
    score: state.score,
    opponentLetters: state.opponentLetters
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateOpponentScore: (score) => {
      dispatch(updateOpponentScore(score))
    },
    updateOpponentLetters: (letters) => {
      dispatch(updateOpponentLetters(letters))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lyric)
