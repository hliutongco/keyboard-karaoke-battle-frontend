import axios from 'axios';

export function saveUsername(username){
  return {
    type: "SAVE_USERNAME",
    payload: username
  }
}

export function saveKeydown(letter){
  return {
    type: "SAVE_LETTER",
    payload: letter
  }
}

export function updateScore(){
  return {
    type: "UPDATE_SCORE",
    payload: 1
  }
}

export function updateOpponentScore(score){
  return {
    type: "UPDATE_OPPONENT_SCORE",
    payload: score
  }
}

export function updateOpponentLetters(letters){
  return {
    type: "UPDATE_OPPONENT_LETTERS",
    payload: letters
  }
}

export function clearScore(){
  return {
    type: "CLEAR_SCORE",
    payload: 0
  }
}

export function saveUserWinsLosses(data){
  return {
    type: "SAVE_WINS_LOSSES",
    payload: data
  }
}

export function saveOpponentWinsLosses(data){
  return {
    type: "SAVE_OPPONENT_WINS_LOSSES",
    payload: data
  }
}

export function saveCorrectLetters(letters){
  return {
    type: "SAVE_CORRECT_LETTERS",
    payload: letters
  }
}

export function getNextLetter(letter){
  return {
    type: "GET_NEXT_LETTER",
    payload: letter
  }
}

export function clearLetters(){
  return {
    type: "CLEAR_LETTERS",
    payload: ""
  }
}

export function clearLetter(){
  return {
    type: "CLEAR_LETTER",
    payload: ""
  }
}

export function chooseVideo(video){
  return {
    type: "CHOOSE_VIDEO",
    payload: video
  }
}

export function chooseSong(song){
  return {
    type: "CHOOSE_SONG",
    payload: song
  }
}

export function chooseDuration(duration){
  return {
    type: "CHOOSE_DURATION",
    payload: duration
  }
}

export function getLyrics(songId){
  return dispatch => {
    axios.get('http://localhost:3000/lyrics/')
    .then(res => {

      const compare = (a, b) => {
        let comparison = 0;
        if (a.lyric_order > b.lyric_order) {
          comparison = 1;
        }
        else if (a.lyric_order  < b.lyric_order) {
          comparison = -1;
        }
        return comparison;
      }

      const sortedLyrics = res.data.sort(compare);
      const lyrics = sortedLyrics.filter((lyric) => lyric.song === songId)
      dispatch(getLyricsAsync(lyrics))
    });
  }
}

export function checkUser(username){
  return dispatch => {
    axios.get(`http://localhost:3000/users/`)
    .then(res => {
      const foundUser = res.data.find((user) => user.name.toLowerCase() === username.toLowerCase())
      if(foundUser){
        dispatch(getUserIdAsync(foundUser))
      }
      else {
        dispatch(postUser(username))
      }
    })
  }
}

export function saveOpponentID(userID){
  return dispatch => {
    axios.get(`http://localhost:3000/users/`)
    .then(res => {
      const foundUser = res.data.find((user) => user._id === userID)
      dispatch(getOpponentIdAsync(foundUser))
    })
  }
}

export function saveActualSongId(title){
  return dispatch => {
    axios.get(`http://localhost:3000/songs/`)
    .then(res => {
      const foundSong = res.data.find((song) => song.title === title)
      dispatch(getSongIdAsync(foundSong));

      res.data.forEach((song) => dispatch(updateHighScore({title: song.title + 'HighScore', player: song.player, highscore: song.highscore})))
    })
  }
}

export function saveSongId(songId){
  return {
    type: "SAVE_SONG_ID",
    payload: songId
  }
}

export function saveOpponentName(name){
  return {
    type: "SAVE_OPPONENT_NAME",
    payload: name
  }
}

function postUser(username){
  return dispatch => {
    axios.post(`http://localhost:3000/users/`, {
        name: username
      }
    )
    .then(res => {
      dispatch(getUserIdAsync(res.data))
    })
  }
}

export function postScore(userId, songId, score){
  return dispatch => {
    axios.put(`http://localhost:3000/users/${userId}`, {
        [songId]: score
      }
    )
  }
}

export function postUserWinsLosses(userId, wins, losses){
  return dispatch => {
    axios.put(`http://localhost:3000/users/${userId}`, {
        wins: wins,
        losses: losses
      }
    )
  }
}

export function postHighScore(title, realSongId, player, score){
  return dispatch => {
    axios.put(`http://localhost:3000/songs/${realSongId}`, {
        player: player,
        highscore: score
      }
    )
    .then(res => {
      dispatch(updateHighScore({title: title + 'HighScore', player: res.data.player, highscore: res.data.highscore}))
    })
  }
}

function updateHighScore(song){
  return {
    type: "UPDATE_HIGH_SCORE",
    payload: song
  }
}

function getUserIdAsync(user){
  return {
    type: "GET_USER",
    payload: user
  }
}

function getOpponentIdAsync(opponent){
  return {
    type: "GET_OPPONENT",
    payload: opponent
  }
}

function getLyricsAsync(lyrics){
  return {
    type: "GET_LYRICS",
    payload: lyrics
  }
}

function getSongIdAsync(song){
  return {
    type: "GET_SONG_ID",
    payload: song
  }
}
