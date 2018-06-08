import React from 'react'
import Lyric from '../components/Lyric'
import lyrics from '../lyrics'
import { connect } from 'react-redux'

class LyricContainer extends React.Component {
  state = {
    lyric: "",
    n: 0
  }

  componentDidMount = () => {
    setTimeout(this.displayLyrics, 8500)
  }

  displayLyrics = () => {
    if(lyrics[this.state.n]){
      const currentLyric = <Lyric content={lyrics[this.state.n].content}/>
      this.setState({lyric: currentLyric, n: this.state.n + 1}, () => setTimeout(this.displayLyrics, lyrics[this.state.n - 1].duration * 1000))
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

export default LyricContainer
