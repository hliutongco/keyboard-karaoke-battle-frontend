const defaultState = {
  player: "anonymous",
  score: 0,
  letter: ""
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "SAVE_LETTER":
      return {...state, letter: action.payload}
    default:
      return state
  }
}

export default reducer
