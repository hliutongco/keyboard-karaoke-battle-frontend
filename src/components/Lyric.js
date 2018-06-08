import React from 'react'
import Letter from './Letter'

const Lyric = (props) => {
  const letters = props.content.split("")
  return (
    <div>
      {letters.map((letter, index) => {
        return <Letter letter={letter} key={index} index={index} />
      })}
    </div>
  )
}

export default Lyric
