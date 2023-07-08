import React from 'react'
import waitImage from "../../typeFirst.png"

function ChatWait() {
  return (
    <div className='flex-[3] flex flex-col justify-center items-center'>
      <img width={500} src={waitImage} alt="waitImg" />
    </div>
  )
}

export default ChatWait
