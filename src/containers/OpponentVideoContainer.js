import React from 'react'
import OpponentLyricContainer from './OpponentLyricContainer'
import { connect } from 'react-redux';
import { saveOpponentWinsLosses } from '../actions';
import io from 'socket.io-client';

class VideoContainer extends React.Component {
  state = {
    ended: false,
    enter: false
  }

  constructor(props){
      super(props);
      this.socket = io('localhost:3000')
      this.socket = io('localhost:3000', { transports: ['websocket']})
  }

  handleEnding = () => {

    if(this.props.opponentScore > this.props.score){
      this.props.saveOpponentWinsLosses({wins: this.props.opponentWins + 1, losses: this.props.opponentLosses})
    }
    else if(this.props.opponentScore < this.props.score) {
      this.props.saveOpponentWinsLosses({wins: this.props.opponentWins, losses: this.props.opponentLosses + 1})
    }

    this.socket.emit('leaveroom', { song: this.props.songId })
    this.setState({ ended: true })
  }

  render() {
    const instructions = <h1>Press Enter to Return to the Menu</h1>
    const highScores = (
      <div id="scores">
        <div>
          <h3>{this.props.opponentName}'s Wins & Losses</h3>
          <p>Wins: {this.props.opponentWins}</p>
          <p>Losses: {this.props.opponentLosses}</p>
        </div>
        <div>
          <h3>{this.props.opponentName}'s High Scores</h3>
          <p>Roar: {this.props.songId === 'roar' && this.props.opponentScore > this.props.opponentroar ? this.props.opponentScore : this.props.opponentroar}</p>
          <p>Look At Me Now: {this.props.songId === 'lookAtMeNow' && this.props.opponentScore > this.props.opponentlookAtMeNow ? this.props.opponentScore : this.props.opponentlookAtMeNow}</p>
        </div>
        <div>
          <h3>All-Time High Scores</h3>
          <p>Roar: {this.props.songId === 'roar' && this.props.opponentScore > this.props.roarHighScore ? `${this.props.opponentName} - ${this.props.opponentScore}` : `${this.props.roarHighScorePlayer} - ${this.props.roarHighScore}`}</p>
          <p>Look At Me Now: {this.props.songId === 'lookAtMeNow' && this.props.opponentScore > this.props.lookAtMeNowHighScore ? `${this.props.opponentName} - ${this.props.opponentScore}` : `${this.props.lookAtMeNowHighScorePlayer} - ${this.props.lookAtMeNowHighScore}`}</p>
        </div>
      </div>)

    return (
      <div>
        <div className="video-container">
          <audio autoPlay onEnded={this.handleEnding} src={this.props.mp3} />
          {this.state.ended ? instructions : ''}
          <video autoPlay src={this.props.video}></video>
          {this.state.ended ? '' : <OpponentLyricContainer />}
        </div>
        {this.state.ended ? highScores : ''}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    score: state.score,
    opponentName: state.opponentName,
    video: state.video,
    mp3: state.mp3,
    opponentScore: state.opponentScore,
    opponentId: state.opponentId,
    userId: state.userId,
    userWins: state.userWins,
    userLosses: state.userLosses,
    opponentWins: state.opponentWins,
    opponentLosses: state.opponentLosses,
    opponentroar: state.opponentroar,
    opponentlookAtMeNow: state.opponentlookAtMeNow,
    songId: state.songId,
    realSongId: state.realSongId,
    roarHighScore: state.roarHighScore.score,
    roarHighScorePlayer: state.roarHighScore.name,
    lookAtMeNowHighScore: state.lookAtMeNowHighScore.score,
    lookAtMeNowHighScorePlayer: state.lookAtMeNowHighScore.name
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveOpponentWinsLosses: (data) => {
      dispatch(saveOpponentWinsLosses(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)
