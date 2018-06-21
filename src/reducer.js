const defaultState = {
  roarHighScore: {name: 'n/a', score: 0},
  lookAtMeNowHighScore: {name: 'n/a', score: 0},
  player: "",
  opponentName: "",
  opponentScore: 0,
  opponentLetters: "",
  opponentWins: 0,
  opponentLosses: 0,
  opponentroar: 0,
  opponentlookAtMeNow: 0,
  opponentId: '',
  userId: '',
  userWins: 0,
  userLosses: 0,
  roar: 0,
  lookAtMeNow: 0,
  songId: '',
  realSongId: '',
  score: 0,
  letter: "",
  correctLetters: "",
  nextLetter: "",
  lyrics: [],
  video: '',
  mp3: '',
  duration: 0
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "SAVE_USERNAME":
      return {...state, player: action.payload}
    case "SAVE_SONG_ID":
      return {...state, songId: action.payload}
    case "SAVE_OPPONENT_NAME":
      return {...state, opponentName: action.payload}
    case "UPDATE_OPPONENT_SCORE":
      return {...state, opponentScore: action.payload}
    case "SAVE_WINS_LOSSES":
      return {...state, userWins: action.payload.wins, userLosses: action.payload.losses}
    case "SAVE_OPPONENT_WINS_LOSSES":
      return {...state, opponentWins: action.payload.wins, opponentLosses: action.payload.losses}
    case "UPDATE_OPPONENT_LETTERS":
      return {...state, opponentLetters: action.payload}
    case "GET_SONG_ID":
      return {...state, realSongId: action.payload._id}
    case "GET_USER":
      return {...state, userId: action.payload._id, userWins: action.payload.wins, userLosses: action.payload.losses, roar: action.payload.roar, lookAtMeNow: action.payload.lookAtMeNow}
    case "GET_OPPONENT":
      return {...state, opponentId: action.payload._id, opponentWins: action.payload.wins, opponentLosses: action.payload.losses, opponentroar: action.payload.roar, opponentlookAtMeNow: action.payload.lookAtMeNow}
    case "SAVE_LETTER":
      return {...state, letter: action.payload}
    case "CHOOSE_VIDEO":
      return {...state, video: action.payload}
    case "CHOOSE_SONG":
      return {...state, mp3: action.payload}
    case "CHOOSE_DURATION":
      return {...state, duration: action.payload}
    case "UPDATE_SCORE":
      return {...state, score: state.score + action.payload}
    case "UPDATE_HIGH_SCORE":
      return {...state, [action.payload.title]: {name: action.payload.player, score: action.payload.highscore}}
    case "CLEAR_SCORE":
      return {...state, score: action.payload, opponentScore: action.payload}
    case "SAVE_CORRECT_LETTERS":
      return {...state, correctLetters: action.payload}
    case "CLEAR_LETTERS":
      return {...state, correctLetters: "", opponentLetters: ""}
    case "CLEAR_LETTER":
      return {...state, letter: ""}
    case "GET_NEXT_LETTER":
      return {...state, nextLetter: action.payload}
    case "GET_LYRICS":
      return {...state, lyrics: action.payload}
    default:
      return state
  }
}

export default reducer
