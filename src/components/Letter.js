import React from 'react'

class Letter extends React.Component {

  render(){
    return (
      <span className={this.props.classname}>{this.props.letter}</span>
    )
  }
}


export default Letter
