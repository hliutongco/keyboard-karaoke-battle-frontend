import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import TwoPlayerMainGameContainer from './TwoPlayerMainGameContainer'
import { saveOpponentName } from '../actions'
import { saveOpponentID } from '../actions'

class Room extends React.Component {
  state = {
    play: false,
    enter: false
  }

  constructor(props){
      super(props);
      this.socket = io('localhost:3000')
      this.socket = io('localhost:3000', { transports: ['websocket']})
  }

  handleEnterKeydown = (event) => {
    if(event.key === "Enter"){
      document.removeEventListener('keydown', this.handleEnterKeydown)
      this.socket.emit('leaveroom', { song: this.props.songId })
      this.socket.emit('pressenter', {enter: true})
    }
  }

  componentDidMount = () => {
    this.socket.emit('joinroom', {song: this.props.songId})

    this.socket.on('countusers', (data) => {
      if(data){
        this.socket.emit('sendusername', this.props.player)
        this.socket.emit('senduserID', this.props.userId)
        document.addEventListener('keydown', this.handleEnterKeydown)
        this.setState({play: true})
      } else {
        this.setState({play: false})
      }
    })

    this.socket.on('receiveusername', (name) => {
      this.props.saveOpponentName(name)
    })

    this.socket.on('receiveuserID', (userID) => {
      this.props.saveOpponentID(userID)
    })

    this.socket.on('pressenter', (data) => {
      document.removeEventListener('keydown', this.handleEnterKeydown)
      this.setState({enter:true})
    })
  }

  componentWillUnmount = () => {
    this.socket.emit('leaveroom', { song: this.props.songId })
  }

  render(){
    const readyMessage = <p>{this.state.play ? 'Press Enter to Play' : 'Waiting for a second player'}</p>;
    return (
      <div>
      { this.state.enter ? <TwoPlayerMainGameContainer /> : readyMessage }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    userId: state.userId,
    songId: state.songId
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveOpponentName: (name) => {
      dispatch(saveOpponentName(name))
    },
    saveOpponentID: (userID) => {
      dispatch(saveOpponentID(userID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
