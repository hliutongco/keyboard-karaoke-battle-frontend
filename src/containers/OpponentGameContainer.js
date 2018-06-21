import React from 'react'
import OpponentVideoContainer from './OpponentVideoContainer'
import { connect } from 'react-redux'

class OpponentGameContainer extends React.Component {
  render(){

    return (
      <div>
        <h1>Player: {this.props.opponentName}</h1>
        <OpponentVideoContainer />
        <h1>Score: {this.props.opponentScore}</h1>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    opponentName: state.opponentName,
    opponentScore: state.opponentScore
  }
}

export default connect(mapStateToProps)(OpponentGameContainer)
