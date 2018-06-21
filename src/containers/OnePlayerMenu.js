import React from 'react'
import { connect } from 'react-redux'
import { chooseVideo } from '../actions'
import { chooseSong } from '../actions'
import { chooseDuration } from '../actions'
import { getLyrics } from '../actions'
import { saveSongId } from '../actions'
import { saveActualSongId } from '../actions'
import '../App.css';
import { Redirect } from 'react-router-dom';
import busta from '../video/busta.mp4'
import roar from '../video/Roar.mp4'
import bustamp3 from '../mp3s/busta.wav'
import roarmp3 from '../mp3s/Roar.mp3'

class OnePlayerMenu extends React.Component {
  state = {
    display: "",
    submission: false,
    video: '',
    mp3: ''
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydown)
  }

  handleKeydown = (event) => {
    const titleArr = ["Katy Perry - Roar","Busta Rhymes - Look At Me Now"];
    const videoArr = [roar, busta];
    const mp3Arr = [roarmp3, bustamp3];
    const lyricsArr = ['roar', 'lookAtMeNow'];
    const durationArr = [19500, 8500];
    const index = titleArr.indexOf(this.state.display);

    if(event.key === "Enter" && this.state.display){
      window.removeEventListener("keydown", this.handleKeydown);
      this.props.getLyrics(lyricsArr[index]);
      this.props.saveSongId(lyricsArr[index]);
      this.props.saveActualSongId(lyricsArr[index]);
      this.setState({submission: true});
    }
    else if (event.key === "ArrowUp") {
      this.props.chooseVideo(videoArr[index + 1]);
      this.props.chooseSong(mp3Arr[index + 1]);
      this.props.chooseDuration(durationArr[index + 1]);
      this.setState({display: titleArr[index + 1], video: videoArr[index + 1], mp3: mp3Arr[index + 1]});
    }

  }

  render() {
    if(this.state.submission){
      return <Redirect to='/oneplayerready'/>
    };

    return (
      <div>
        {this.state.mp3 ? <audio autoPlay src={this.state.mp3} /> : ""}
        <h1>Press ↑ to Scroll and Enter to Select a Song</h1>
        <div className="video-container">
          {this.state.video ? <video autoPlay src={this.state.video}></video> : ""}
        </div>
        <h2>{this.state.display}</h2>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    chooseVideo: (video) => {
      dispatch(chooseVideo(video))
    },
    chooseSong: (song) => {
      dispatch(chooseSong(song))
    },
    chooseDuration: (duration) => {
      dispatch(chooseDuration(duration))
    },
    getLyrics: (songId) => {
      dispatch(getLyrics(songId))
    },
    saveSongId: (songId) => {
      dispatch(saveSongId(songId))
    },
    saveActualSongId: (songTitle) => {
      dispatch(saveActualSongId(songTitle))
    }
  }
}

export default connect(null, mapDispatchToProps)(OnePlayerMenu)
