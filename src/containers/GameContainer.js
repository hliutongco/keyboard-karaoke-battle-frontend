import React from 'react'
import VideoContainer from './VideoContainer'
import { connect } from 'react-redux'

class GameContainer extends React.Component {
  render(){

    return (
      <div>
        <h1>Player: {this.props.player}</h1>
        <VideoContainer />
        <h1>Score: {this.props.score}</h1>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    score: state.score
  }
}

export default connect(mapStateToProps)(GameContainer)
