import React from 'react'
import { connect } from 'react-redux'

const Letter = ({letter, index, playerLetter, highlightLetter}) => {
  const condition = letter.toLowerCase() === playerLetter.toLowerCase()
  // const condition2 = !index
  return (
    <span className={condition ? "highlight" : ""}>{letter}</span>
  )
}

function mapStateToProps(state){
  return {
    playerLetter: state.letter,
    highlightLetter: state.letter
  }
}
//
// function mapDispatchToProps(dispatch){
//   return {
//     saveHighlightLetter: () => {
//       dispatch
//     }
//   }
// }

export default connect(mapStateToProps)(Letter)
