import React from 'react'
import OpponentLyric from '../components/OpponentLyric'
import { connect } from 'react-redux'
import { clearLetters } from '../actions'
import { clearLetter } from '../actions'

class LyricContainer extends React.Component {
  state = {
    lyric: "",
    n: 0
  }

  componentDidMount = () => {
    setTimeout(this.displayLyrics, this.props.duration)
  }

  displayLyrics = () => {
    this.props.handleClearLetter();
    this.props.handleClearLetters();

    if(this.props.lyrics[this.state.n]){
      const currentLyric = <OpponentLyric content={this.props.lyrics[this.state.n].content}/>
      this.setState({lyric: currentLyric, n: this.state.n + 1}, () => setTimeout(this.displayLyrics, this.props.lyrics[this.state.n - 1].duration * 1000))
    }
  }

  render() {
    return (
      <div id="lyric-container">
        {this.state.lyric}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    lyrics: state.lyrics,
    duration: state.duration
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleClearLetters: () => {
      dispatch(clearLetters())
    },
    handleClearLetter: () => {
      dispatch(clearLetter())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LyricContainer)
