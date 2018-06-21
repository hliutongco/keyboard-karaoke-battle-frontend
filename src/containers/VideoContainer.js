import React from 'react'
import LyricContainer from './LyricContainer'
import { connect } from 'react-redux';
import { postScore } from '../actions';
import { postHighScore } from '../actions';
import { saveUserWinsLosses } from '../actions';
import { postUserWinsLosses } from '../actions';
import { clearScore } from '../actions';
import { Redirect } from 'react-router-dom';
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
    this.setState({ ended: true })

    const songScore = this.props.songId === 'roar' ? this.props.roar : this.props.lookAtMeNow;
    const highScore = this.props.songId === 'roar' ? this.props.roarHighScore : this.props.lookAtMeNowHighScore;

    if(this.props.score > songScore){
      this.props.postScore(this.props.userId, this.props.songId, this.props.score)
    }

    if(this.props.score > highScore){
      this.props.postHighScore(this.props.songId, this.props.realSongId, this.props.player, this.props.score)
    }

    if(this.props.score > this.props.opponentScore && this.props.opponentName !== ""){
      this.props.saveUserWinsLosses({wins: this.props.userWins + 1, losses: this.props.userLosses})
      this.props.postUserWinsLosses(this.props.userId, this.props.userWins + 1, this.props.userLosses)
    } else if(this.props.score < this.props.opponentScore && this.props.opponentName !== "") {
      this.props.saveUserWinsLosses({wins: this.props.userWins, losses: this.props.userLosses + 1})
      this.props.postUserWinsLosses(this.props.userId, this.props.userWins, this.props.userLosses + 1)
    }
    this.props.clearScore();
    this.socket.emit('leaveroom', { song: this.props.songId })

  }

  handleKeydown = (event) => {
    if(event.key === "Enter"){
      this.setState({enter: true});
    }
  }
  // window.addEventListener('keydown', this.handleKeydown)
  // const instructions = <h1>Press Enter to Return to the Menu</h1>
  // {this.state.ended ? instructions : ''}

  render() {
    if(this.state.enter){
      window.removeEventListener('keydown', this.handleKeydown)
      return <Redirect to='/'/>
    }

    const highScores = (
      <div id="scores">
        <div>
          <h3>{this.props.player}'s Wins & Losses</h3>
          <p>Wins: {this.props.userWins}</p>
          <p>Losses: {this.props.userLosses}</p>
        </div>
        <div>
          <h3>{this.props.player}'s High Scores</h3>
          <p>Roar: {this.props.songId === 'roar' && this.props.score > this.props.roar ? this.props.score : this.props.roar}</p>
          <p>Look At Me Now: {this.props.songId === 'lookAtMeNow' && this.props.score > this.props.lookAtMeNow ? this.props.score : this.props.lookAtMeNow}</p>
        </div>
        <div>
          <h3>All-Time High Scores</h3>
          <p>Roar: {this.props.songId === 'roar' && this.props.score > this.props.roarHighScore ? `${this.props.player} - ${this.props.score}` : `${this.props.roarHighScorePlayer} - ${this.props.roarHighScore}`}</p>
          <p>Look At Me Now: {this.props.songId === 'lookAtMeNow' && this.props.score > this.props.lookAtMeNowHighScore ? `${this.props.player} - ${this.props.score}` : `${this.props.lookAtMeNowHighScorePlayer} - ${this.props.lookAtMeNowHighScore}`}</p>
        </div>
      </div>)

    return (
      <div>
        <div className="video-container">
          <audio autoPlay onEnded={this.handleEnding} src={this.props.mp3} />
          <video autoPlay src={this.props.video}></video>
          {this.state.ended ? '' : <LyricContainer />}
        </div>
        {this.state.ended ? highScores : ''}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    opponentName: state.opponentName,
    video: state.video,
    mp3: state.mp3,
    score: state.score,
    opponentScore: state.opponentScore,
    userId: state.userId,
    userWins: state.userWins,
    userLosses: state.userLosses,
    roar: state.roar,
    lookAtMeNow: state.lookAtMeNow,
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
    postScore: (userId, songId, score) => {
      dispatch(postScore(userId, songId, score))
    },
    postHighScore: (title, realSongId, player, score) => {
      dispatch(postHighScore(title, realSongId, player, score))
    },
    clearScore: () => {
      dispatch(clearScore())
    },
    saveUserWinsLosses: (data) => {
      dispatch(saveUserWinsLosses(data))
    },
    postUserWinsLosses: (userId, wins, losses) => {
      dispatch(postUserWinsLosses(userId, wins, losses))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)
