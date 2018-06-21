import React from 'react'
import { Redirect } from 'react-router-dom';

class Ready extends React.Component {
  state = {
    enter: false
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (event) => {
    if(event.key === 'Enter'){
      window.removeEventListener('keydown', this.handleKeydown)
      this.setState({enter: true})
    }
  }

  render(){
    if(this.state.enter){
      return <Redirect to='/oneplayerplay'/>
    };

    return (
      <p>
        Press Enter to Begin the Game
      </p>
    )
  }
}

export default Ready
