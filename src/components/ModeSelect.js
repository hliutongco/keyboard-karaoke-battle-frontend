import React from 'react'
import { Redirect } from 'react-router-dom';

class Ready extends React.Component {
  state = {
    mode: 0
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (event) => {
    if(event.key === "1"){
      window.removeEventListener('keydown', this.handleKeydown)
      this.setState({mode: 1})
    }
    else if (event.key === "2") {
      window.removeEventListener('keydown', this.handleKeydown)
      this.setState({mode: 2})
    }
  }

  render(){
    if(this.state.mode === 1){
      return <Redirect to='/oneplayermenu'/>
    }
    else if (this.state.mode === 2) {
      return <Redirect to='/twoplayermenu'/>
    }

    return (
      <div id="modeselect">
        <h2>Select A Mode:</h2>
        <p>Press 1 For One-Player</p>
        <p>Press 2 For Two-Player</p>
      </div>
    )
  }
}

export default Ready
