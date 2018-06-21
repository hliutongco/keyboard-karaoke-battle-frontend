import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUsername } from './actions';
import { checkUser } from './actions';

class App extends Component {
  state = {
    username: '',
    submission: false
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.saveUsername(this.state.username);
    this.props.checkUser(this.state.username);
    this.setState({submission: true});
  }

  render() {
    if(this.state.submission){
      return <Redirect to='/modeselect'/>
    };

    return (
      <div>
        <div id="terminal" preload="preload" >Keyboard...Karaoke!!</div>
        <form onSubmit={this.handleSubmit}>
          Enter your username:
          <input id="nametext" autoFocus type="text" onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    checkUser: (username) => {
      dispatch(checkUser(username))
    },
    saveUsername: (username) => {
      dispatch(saveUsername(username))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
