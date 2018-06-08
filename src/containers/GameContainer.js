import React from 'react'
import VideoContainer from './VideoContainer'

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

export default GameContainer
