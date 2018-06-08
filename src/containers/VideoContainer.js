import React from 'react'
import busta from '../video/busta.mp4'
import LyricContainer from './LyricContainer'

class VideoContainer extends React.Component {
  render() {
    return (
      <div id="video-container">
        <video autoPlay src={busta}></video>
        <LyricContainer/>
      </div>
    )
  }
}

export default VideoContainer
