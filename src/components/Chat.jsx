import React from 'react'
import style from './Chat.module.css'

const Chat = ({msg, role}) => {
  return (
    <div className={role==='user' ? style.rightAligned : ''}>
      <div className={`${style.msg} ${style.formattedLine}`}>
        {msg}
      </div>
    </div>
  )
}

export default Chat